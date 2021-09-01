import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { roomApi, userApi, boardApi } from "../api";
import {
  UsersManageModal,
  BoardCreationModal,
  RoomCreationModal,
  RoomEditModal,
  RoomsList,
  Room,
} from "../components";

export function Rooms({ currentUser }) {
  const [users, setUsers] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [room, setRoom] = React.useState(null);

  const [roomCreationModalShow, setRoomCreationModalShow] =
    React.useState(false);
  const [roomEditModalShow, setRoomEditModalShow] = React.useState(false);
  const [boardCreationModalShow, setBoardCreationModalShow] =
    React.useState(false);
  const [usersManageModalShow, setUsersManageModalShow] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const canEdit = room
    ? currentUser.id === room.creator_id || currentUser.id === "1"
    : false;

  const fetchRooms = async () => {
    setIsLoading(true);
    const response = await roomApi.getRooms();

    let result = [];
    if (response.success) {
      result = response.data;
    }

    setRooms(result);
    setIsLoading(false);
    return result;
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

  const init = async () => {
    const [roomsResponse] = await Promise.all([fetchRooms(), fetchUsers()]);
    if (roomsResponse.length > 0) {
      await fetchRoom(roomsResponse[0].id);
    }
  };

  React.useEffect(() => {
    init();
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
      <Container className="p-0">
        <Row>
          <Col md="3">
            <RoomsList
              rooms={rooms}
              selectedRoomId={room ? room.id : "-1"}
              onRoomClick={fetchRoom}
              onCreateNew={() => {
                setRoomCreationModalShow(true);
              }}
            />
          </Col>
          <Col md="9">
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              room && (
                <Room
                  canEdit={canEdit}
                  room={room}
                  onUsersManage={() => {
                    setUsersManageModalShow(true);
                  }}
                  onAddBoard={() => {
                    setBoardCreationModalShow(true);
                  }}
                  onEdit={() => {
                    setRoomEditModalShow(true);
                  }}
                  onDelete={onRoomDelete}
                  onBoardDelete={onBoardDelete}
                />
              )
            )}
          </Col>
        </Row>
      </Container>

      <RoomCreationModal
        show={roomCreationModalShow}
        onHide={async () => {
          setRoomCreationModalShow(false);
          await fetchRooms();
        }}
      />

      {room && roomEditModalShow && (
        <RoomEditModal
          show={roomEditModalShow}
          onHide={async () => {
            setRoomEditModalShow(false);
            await Promise.all([fetchRooms(), fetchRoom(room.id)]);
          }}
          room={room}
        />
      )}

      {room && boardCreationModalShow && (
        <BoardCreationModal
          show={boardCreationModalShow}
          onHide={async () => {
            setBoardCreationModalShow(false);
            await fetchRoom(room.id);
          }}
          room={room}
        />
      )}

      {room && usersManageModalShow && (
        <UsersManageModal
          users={users}
          room={room}
          show={usersManageModalShow}
          onHide={() => setUsersManageModalShow(false)}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
}
