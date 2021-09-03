import React from "react";
import { Dropdown } from "react-bootstrap";
import { BurgerIcon, DotsIcon } from "../icons";

export function DropdownMenu({ icon, items, onItemClick }) {
  const renderIcon = () => {
    switch (icon) {
      case "dots":
        return <DotsIcon />;
      case "burger":
      default:
        return <BurgerIcon />;
    }
  };

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {renderIcon()}
    </a>
  ));

  return (
    <Dropdown align="end" className="d-flex justify-content-end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

      <Dropdown.Menu renderOnMount="true">
        {items.map((item) => (
          <Dropdown.Item onClick={() => onItemClick(item.value)}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
