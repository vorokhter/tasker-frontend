import React from "react";
import { Modal } from "../Modal/Modal";

export function TaskViewModal({ task, open, setOpen }) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <span>{task.title}</span>
      <p>{task.description}</p>
      <span>Назначен: {task.executor}</span>
    </Modal>
  );
}
