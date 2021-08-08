import React from "react";
import { roomApi } from "../../api";
import { Modal } from "../Modal/Modal";
import "./RoomEditModal.css";

export function RoomEditModal({ room, open, setOpen, onSuccess }) {
  const [title, setTitle] = React.useState(room.title);
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await roomApi.editRoom({ id: room.id, title });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="room-edit" onSubmit={onSubmit}>
        <h1>Редактирование комнаты</h1>

        {!!error && (
          <span className="typography typography-error">{error}</span>
        )}

        <input
          type="text"
          name="title"
          placeholder="Название комнаты"
          className="input"
          value={title}
          onChange={onTitleChange}
        />
        <button type="submit" className="btn btn-primary">
          Редактировать
        </button>
      </form>
    </Modal>
  );
}
