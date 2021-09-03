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
          ? { background: "rgba(251, 251, 255, 0.3)" }
          : { background: "rgba(251, 251, 255, 0.15)" }
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
      <Container>
        <Row>
          <Card.Title className="fs-5 text-white">{stage.title}</Card.Title>
        </Row>
        <Row className="gy-2">
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
                <Container className="p-0">
                  <Row>
                    <Col md="10">
                      <Card.Text className="mb-2 text-muted">
                        {task.title}
                      </Card.Text>
                    </Col>
                    <Col md="2">
                      <DropdownMenu
                        icon="dots"
                        items={dropdownMenuItems}
                        onItemClick={onDropdownMenuItemClick}
                      />
                    </Col>
                  </Row>
                </Container>

                <Card.Text
                  className="h-5 overflow-hidden"
                  style={{
                    "max-height": "250px",
                  }}
                >
                  {task.description}
                </Card.Text>

                <Card.Subtitle className="mb-2 text-muted">
                  назначен: {task.executor}
                </Card.Subtitle>
              </Card>
            );
          })}
        </Row>
      </Container>
    </Card>
  );
}
