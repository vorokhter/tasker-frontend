import React from "react";
import { Modal } from "..";
import { taskApi } from "../../api";
import "./TaskEditModal.css";

export function TaskEditModal({ task, open, setOpen, onSuccess }) {
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await taskApi.editTask({ ...task, title, description });
    if (response.success) onSuccess();
    else setError(response.message);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="task-edit" onSubmit={onSubmit}>
        <h1>Редактирование задачи</h1>

        {!!error && (
          <span className="typography typography-error">{error}</span>
        )}

        <div className="task-edit__inputs">
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
          Редактировать
        </button>
      </form>
    </Modal>
  );
}
