import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { roomApi } from "../api";

export function RoomCreationModal(props) {
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await roomApi.createRoom({ title });
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
          <Modal.Title>Создание комнаты</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!error && <Form.Label className="text-danger">{error}</Form.Label>}
          <FloatingLabel
            controlId="floatingInput"
            label="Название комнаты"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Название комнаты"
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
