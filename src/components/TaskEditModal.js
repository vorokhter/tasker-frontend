import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { taskApi } from "../api";

export function TaskEditModal(props) {
  const [title, setTitle] = React.useState(props.task.title);
  const [description, setDescription] = React.useState(props.task.description);
  const [error, setError] = React.useState("");

  const onTitleChange = (event) => setTitle(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await taskApi.editTask({
      ...props.task,
      title,
      description,
    });
    if (response.success) {
      props.onHide();
      setError("");
    } else {
      setError(response.message);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование задачи</Modal.Title>
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
            controlId="floatingTextarea"
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
            Редактировать
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
