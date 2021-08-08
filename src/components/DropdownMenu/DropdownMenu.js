import React from "react";
import { BurgerIcon, DotsIcon } from "../../icons";
import "./DropdownMenu.css";

// item = { label, value }
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
    <div className="burger-menu__wrapper" onClick={onWrapperClick}>
      {renderIcon()}
      {open && (
        <div className="burger-menu__content">
          {items.map((item) => (
            <div
              className="burger-line"
              onClick={() => onItemClick(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
