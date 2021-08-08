import React from "react";
import "./Modal.css";

export const Modal = ({ open, setOpen, children }) => {
  return (
    <div
      className={open ? "modal active" : "modal"}
      onClick={() => setOpen(false)}
    >
      <div
        className={open ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
