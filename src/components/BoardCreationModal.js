import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { roomApi } from "../api";

export function BoardCreationModal(props) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await roomApi.addBoard(props.room.id, {
      title: title.trim(),
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
          <Modal.Title>Создание доски в {props.room.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <Form.Label className="text-danger">{error}</Form.Label>}
          <FloatingLabel
            controlId="floatingInput"
            label="Название доски"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Название доски"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
