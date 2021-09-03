import React from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { boardApi } from "../api";

export function BoardEditModal(props) {
  const [title, setTitle] = React.useState(props.board.title);
  const [error, setError] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await boardApi.editBoard({
      ...props.board,
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
          <Modal.Title>Редактирование доски</Modal.Title>
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
            Редактировать
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
