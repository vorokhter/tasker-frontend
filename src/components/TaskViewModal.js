import React from "react";
import { Modal } from "react-bootstrap";

export function TaskViewModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.task.description}</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <span>Назначен: {props.task.executor}</span>
      </Modal.Footer>
    </Modal>
  );
}
