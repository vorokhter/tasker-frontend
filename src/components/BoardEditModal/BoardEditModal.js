import React from "react";
import { boardApi } from "../../api";
import { Modal } from "../Modal/Modal";
import "./BoardEditModal.css";

export function BoardEditModal({ board, setOpen, open, onSuccess }) {
  const [title, setTitle] = React.useState(board.title);
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await boardApi.editBoard({
      ...board,
      title: title.trim(),
    });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="board-edit" onSubmit={onSubmit}>
        <h1>Редактирование доски</h1>

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
          Редактировать
        </button>
      </form>
    </Modal>
  );
}
