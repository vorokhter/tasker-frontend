import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { boardApi } from "../api";

export function TaskCreationModal(props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await boardApi.addTask(props.boardId, {
      title,
      description,
    });
    if (response.success) {
      props.onHide();
      setError("");
      setTitle("");
      setDescription("");
    } else {
      setError(response.message);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Создание задачи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <Form.Label className="text-danger">{error}</Form.Label>}
          <FloatingLabel
            controlId="floatingInput"
            label="Название задачи"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Название задачи"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Описание задачи"
            className="mb-3"
          >
            <Form.Control
              type="text"
              as="textarea"
              name="description"
              placeholder="Описание задачи"
              style={{ height: "200px", resize: "none" }}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Создать
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
/*

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
    */
