import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DropdownMenu } from "./DropdownMenu";

export function BoardStage({
  stage,
  onTaskView,
  onTaskTake,
  onTaskEdit,
  onTaskDelete,
  dragStartHandler,
  dropHandler,
}) {
  const [draggedOver, setDraggedOver] = React.useState(false);

  const dropdownMenuItems = [
    { label: "Просмотр", value: "view" },
    { label: "Взять задачу", value: "take" },
    { label: "Редактировать", value: "edit" },
    { label: "Удалить", value: "delete" },
  ];

  return (
    <Card
      body
      style={
        draggedOver
          ? { background: "rgba(251, 251, 255, 0.5)" }
          : { background: "rgba(251, 251, 255, 0.25)" }
      }
      onDragOver={(event) => {
        event.preventDefault();
        setDraggedOver(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDraggedOver(false);
      }}
      onDrop={(event) => {
        setDraggedOver(false);
        dropHandler(event, stage);
      }}
    >
      <Card.Title>{stage.title}</Card.Title>

      {stage.tasks.map((task) => {
        const onDropdownMenuItemClick = (value) => {
          switch (value) {
            case "edit":
              onTaskEdit(task);
              break;
            case "take":
              onTaskTake(task);
              break;
            case "delete":
              onTaskDelete(task);
              break;
            case "view":
              onTaskView(task);
              break;
            default:
              return;
          }
        };

        return (
          <Card
            body
            key={"task" + task.id}
            style={{ cursor: "grab" }}
            draggable={true}
            onDragStart={(event) => dragStartHandler(event, task)}
          >
            <Card.Text>{task.title}</Card.Text>

            <DropdownMenu
              icon="dots"
              items={dropdownMenuItems}
              onItemClick={onDropdownMenuItemClick}
            />

            <Card.Text>{task.description}</Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              Назначен: {task.executor}
            </Card.Subtitle>
          </Card>
        );
      })}
    </Card>
  );
}
