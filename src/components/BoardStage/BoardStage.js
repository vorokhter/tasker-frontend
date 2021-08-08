import React from "react";
import { DropdownMenu } from "..";
import "./BoardStage.css";

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
    <div
      className={draggedOver ? "stage dragged-over" : "stage"}
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
      <span className="stage__title">{stage.title}</span>

      <div className="stage__tasks">
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
            <div
              className="task"
              key={"task" + task.id}
              draggable={true}
              onDragStart={(event) => dragStartHandler(event, task)}
            >
              <div className="task__header">
                <span className="task__title">{task.title}</span>

                <DropdownMenu
                  icon="dots"
                  items={dropdownMenuItems}
                  onItemClick={onDropdownMenuItemClick}
                />
              </div>

              <div className="task__description">{task.description}</div>

              <span className="task__footer">Назначен: {task.executor}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
