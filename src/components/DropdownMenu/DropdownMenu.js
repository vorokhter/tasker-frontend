import React from "react";
import { BurgerIcon, DotsIcon } from "../../icons";
import { Dropdown } from "react-bootstrap";
import "./DropdownMenu.css";

export function DropdownMenu({ icon, items, onItemClick }) {
  const [open, setOpen] = React.useState(false);

  React.useState(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    });
  }, []);

  const onWrapperClick = (event) => {
    event.stopPropagation();
  };

  const renderIcon = () => {
    switch (icon) {
      case "dots":
        return <DotsIcon onClick={() => setOpen(!open)} />;
      case "burger":
      default:
        return <BurgerIcon onClick={() => setOpen(!open)} />;
    }
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {renderIcon()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item onClick={() => onItemClick(item.value)}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
