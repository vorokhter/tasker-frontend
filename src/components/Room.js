import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RoomBoard } from "./RoomBoard";
import { DropdownMenu } from "./DropdownMenu";

export function Room({
  room,
  onEdit,
  onAddBoard,
  onDelete,
  onUsersManage,
  onBoardDelete,
  canEdit,
}) {
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
    <Container className="p-0">
      <Row className="flex-nowrap justify-content-between">
        <Col md="11">
          <span className="fs-5 text-white">{room.title}</span>
        </Col>
        <Col md="1">
          {canEdit && (
            <DropdownMenu
              items={dropdownMenuItems}
              onItemClick={onDropdownMenuItemClick}
            />
          )}
        </Col>
      </Row>
      <Row className="g-2">
        {room.boards.length > 0 ? (
          room.boards.map((board) => (
            <Col md="4">
              <RoomBoard
                board={board}
                onBoardDelete={onBoardDelete}
                canEdit={canEdit}
              />
            </Col>
          ))
        ) : (
          <span className="fs-3 text-white">пусто</span>
        )}
      </Row>
    </Container>
  );
}
