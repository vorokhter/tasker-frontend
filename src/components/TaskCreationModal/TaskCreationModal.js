import React from "react";
import { Modal } from "..";
import { boardApi } from "../../api";
import "./TaskCreationModal.css";

export function TaskCreationModal({ boardId, open, setOpen, onSuccess }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await boardApi.addTask(boardId, { title, description });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="task-creation" onSubmit={onSubmit}>
        <h1>Создание задачи</h1>

        {!!error && (
          <span className="typography typography-error">{error}</span>
        )}

        <div className="task-creation__inputs">
          <input
            type="text"
            name="title"
            placeholder="Название задачи"
            className="input"
            value={title}
            onChange={onTitleChange}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Описание задачи"
            className="input textarea"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </form>
    </Modal>
  );
}
