import React from "react";
import "./RoomsList.css";

export function RoomsList({ rooms, selectedRoomId, onRoomClick, onCreateNew }) {
  return (
    <div className="rooms-list">
      {rooms.map((room) => (
        <div
          className={
            room.id === selectedRoomId
              ? "rooms-list__item active"
              : "rooms-list__item"
          }
          key={"room" + room.id}
          onClick={() => onRoomClick(room.id)}
        >
          {room.title}
        </div>
      ))}

      <div className="rooms-list__item" onClick={onCreateNew}>
        {/* <AddIcon /> */}
        Создать
      </div>
    </div>
  );
}
