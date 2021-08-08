import React from "react";
import { useHistory } from "react-router";
import { DropdownMenu } from "..";
import { ClearIcon } from "../../icons";
import "./Room.css";

export function Room({
  room,
  onEdit,
  onAddBoard,
  onDelete,
  onUsersManage,
  onBoardDelete,
  canEdit,
}) {
  const history = useHistory();

  const onDropdownMenuItemClick = (value) => {
    switch (value) {
      case "edit":
        onEdit();
        break;
      case "addBoard":
        onAddBoard();
        break;
      case "delete":
        onDelete();
        break;
      case "users":
        onUsersManage();
        break;
      default:
        return;
    }
  };

  const dropdownMenuItems = [
    { label: "Управление пользователями", value: "users" },
    { label: "Добавить доску", value: "addBoard" },
    { label: "Редактировать комнату", value: "edit" },
    { label: "Удалить комнату", value: "delete" },
  ];

  return (
    <div className="room">
      <div className="room__header">
        <span className="room__header__title">{room.title}</span>
        {canEdit && (
          <DropdownMenu
            items={dropdownMenuItems}
            onItemClick={onDropdownMenuItemClick}
          />
        )}
      </div>

      {room.boards.length > 0 ? (
        <div className="room__boards">
          {room.boards.map((board) => (
            <div className="room__board" key={"board" + board.id}>
              <div
                className="room__board__title"
                onClick={() => {
                  history.push(`/board/${board.id}`);
                }}
              >
                {board.title}
              </div>

              {canEdit && (
                <div
                  className="room__board__control"
                  onClick={() => onBoardDelete(board)}
                >
                  <ClearIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="fill_space">пусто</div>
      )}
    </div>
  );
}
