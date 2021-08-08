import React from "react";
import { Modal } from "..";
import { roomApi } from "../../api";
import "./RoomCreationModal.css";

export function RoomCreationModal({ open, setOpen, onSuccess }) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await roomApi.createRoom({ title });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="room-creation" onSubmit={onSubmit}>
        <h1>Создание комнаты</h1>

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
          Создать
        </button>
      </form>
    </Modal>
  );
}
