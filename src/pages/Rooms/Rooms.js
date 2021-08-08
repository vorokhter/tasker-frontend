import React from "react";
import { roomApi, userApi, boardApi } from "../../api";
import {
  UsersManageModal,
  BoardCreationModal,
  RoomCreationModal,
  RoomEditModal,
  RoomsList,
  Room,
} from "../../components";
import "./Rooms.css";

export function Rooms({ currentUser }) {
  const [users, setUsers] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [room, setRoom] = React.useState(null);
  const [roomCreationModalOpen, setRoomCreationModalOpen] =
    React.useState(false);
  const [roomEditModalOpen, setRoomEditModalOpen] = React.useState(false);
  const [boardCreationModalOpen, setBoardCreationModalOpen] =
    React.useState(false);
  const [usersManageModalOpen, setUsersManageModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const canEdit = room
    ? currentUser.id === room.creator_id || currentUser.id === "1"
    : false;

  const fetchRooms = async () => {
    setIsLoading(true);
    const response = await roomApi.getRooms();
    if (response.success) {
      setRooms(response.data);
    }
    setIsLoading(false);
  };

  const fetchRoom = async (roomId) => {
    const roomResponse = await roomApi.getRoom(roomId);
    if (roomResponse.success) {
      setRoom(roomResponse.data);
    }
  };

  const fetchUsers = async () => {
    const response = await userApi.getAllUsers();
    if (response.success) {
      setUsers(
        response.data.map((user) => ({
          ...user,
          roomIds: user.roomIds ? user.roomIds.split(",") : [],
        }))
      );
    }
  };

  React.useEffect(() => {
    Promise.all([fetchRooms(), fetchUsers()]);
  }, []);

  const onRoomDelete = async () => {
    if (!room) return;
    const response = await roomApi.deleteRoom(room.id);
    if (!response.success) {
      return;
    }
    setRoom(null);
    await fetchRooms();
  };

  const onBoardDelete = async (board) => {
    const response = await boardApi.deleteBoard(board.id);
    if (response.success) fetchRoom(room.id);
  };

  return (
    <>
      <div className="page">
        <RoomsList
          rooms={rooms}
          selectedRoomId={room ? room.id : "-1"}
          onRoomClick={fetchRoom}
          onCreateNew={() => {
            setRoomCreationModalOpen(true);
          }}
        />

        {isLoading ? (
          <div className="fill_space">загрузка...</div>
        ) : (
          room && (
            <Room
              canEdit={canEdit}
              room={room}
              onUsersManage={() => {
                setUsersManageModalOpen(true);
              }}
              onAddBoard={() => {
                setBoardCreationModalOpen(true);
              }}
              onEdit={() => {
                setRoomEditModalOpen(true);
              }}
              onDelete={onRoomDelete}
              onBoardDelete={onBoardDelete}
            />
          )
        )}
      </div>

      <RoomCreationModal
        open={roomCreationModalOpen}
        setOpen={setRoomCreationModalOpen}
        onSuccess={async () => {
          setRoomCreationModalOpen(false);
          await fetchRooms();
        }}
      />

      {room && roomEditModalOpen && (
        <RoomEditModal
          open={roomEditModalOpen}
          setOpen={setRoomEditModalOpen}
          onSuccess={async () => {
            setRoomEditModalOpen(false);
            await Promise.all([fetchRooms(), fetchRoom(room.id)]);
          }}
          room={room}
        />
      )}

      {room && boardCreationModalOpen && (
        <BoardCreationModal
          open={boardCreationModalOpen}
          setOpen={setBoardCreationModalOpen}
          room={room}
          onSuccess={async () => {
            setBoardCreationModalOpen(false);
            await fetchRoom(room.id);
          }}
        />
      )}

      {room && usersManageModalOpen && (
        <UsersManageModal
          users={users}
          room={room}
          open={usersManageModalOpen}
          setOpen={setUsersManageModalOpen}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
}
