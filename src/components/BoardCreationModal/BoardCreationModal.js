import React from "react";
import { roomApi } from "../../api";
import { Modal } from "../Modal/Modal";
import "./BoardCreationModal.css";

export function BoardCreationModal({ room, setOpen, open, onSuccess }) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await roomApi.addBoard(room.id, { title: title.trim() });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="board-creation" onSubmit={onSubmit}>
        <h1>Создание доски в комнате "{room.title}"</h1>

        {!!error && (
          <span className="typography typography-error">{error}</span>
        )}

        <input
          type="text"
          name="title"
          placeholder="Название доски"
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
