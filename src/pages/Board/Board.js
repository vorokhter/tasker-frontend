import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { boardApi, taskApi } from "../../api";
import {
  DropdownMenu,
  BoardStage,
  TaskCreationModal,
  TaskEditModal,
  BoardEditModal,
  TaskViewModal,
} from "../../components";
import "./Board.css";

export function Board() {
  const { boardId } = useParams();
  const history = useHistory();

  const [board, setBoard] = React.useState(null);
  const [taskCreationModalOpen, setTaskCreationModalOpen] =
    React.useState(false);
  const [taskForModal, setTaskForModal] = React.useState(null);
  const [taskEditModalOpen, setTaskEditModalOpen] = React.useState(false);
  const [boardEditModalOpen, setBoardEditModalOpen] = React.useState(false);
  const [taskViewModalOpen, setTaskViewModalOpen] = React.useState(false);

  const fetchBoard = async () => {
    const response = await boardApi.getBoard(boardId);
    if (response.success) {
      setBoard(response.data);
    }
  };

  React.useEffect(() => {
    fetchBoard();
  }, []);

  React.useEffect(() => {
    if (!taskViewModalOpen) setTaskForModal(null);
  }, [taskViewModalOpen]);

  const onTaskView = (task) => {
    setTaskForModal(task);
    setTaskViewModalOpen(true);
  };

  const onTaskTake = async (task) => {
    const response = await taskApi.takeTask(task.id);
    if (response.success) await fetchBoard();
  };

  const onTaskEdit = (task) => {
    setTaskForModal(task);
    setTaskEditModalOpen(true);
  };

  const onTaskDelete = async (task) => {
    const response = await taskApi.deleteTask(task.id);
    if (response.success) await fetchBoard();
  };

  const [draggableTask, setDraggableTask] = React.useState(null);

  const dragStartHandler = async (event, task) => {
    setDraggableTask(task);
  };

  const dropHandler = async (event, newStage) => {
    event.preventDefault();
    if (newStage !== draggableTask.stage) {
      const response = await taskApi.editTask({
        ...draggableTask,
        stage: newStage.stage,
      });
      if (response.success) await fetchBoard();
    }
    setDraggableTask(null);
  };

  const onDropdownMenuItemClick = (value) => {
    switch (value) {
      case "edit":
        setBoardEditModalOpen(true);
        break;
      case "addTask":
        setTaskCreationModalOpen(true);
        break;
      default:
        return;
    }
  };

  const dropdownMenuItems = [
    { label: "Редактировать доску", value: "edit" },
    { label: "Создать задачу", value: "addTask" },
  ];

  if (!board) return null;

  return (
    <>
      <div className="page">
        <div className="board">
          <div className="board__header">
            <span className="board__title">{board.title}</span>
            <DropdownMenu
              items={dropdownMenuItems}
              onItemClick={onDropdownMenuItemClick}
            />
          </div>

          <div className="board__tasks">
            {board.stages.map((stage) => (
              <BoardStage
                stage={stage}
                onTaskEdit={onTaskEdit}
                onTaskDelete={onTaskDelete}
                onTaskView={onTaskView}
                onTaskTake={onTaskTake}
                dragStartHandler={dragStartHandler}
                dropHandler={dropHandler}
              />
            ))}
          </div>
        </div>
      </div>

      <BoardEditModal
        open={boardEditModalOpen}
        setOpen={setBoardEditModalOpen}
        board={board}
        onSuccess={async () => {
          setBoardEditModalOpen(false);
          await fetchBoard();
        }}
      />

      <TaskCreationModal
        boardId={board.id}
        open={taskCreationModalOpen}
        setOpen={setTaskCreationModalOpen}
        onSuccess={async () => {
          setTaskCreationModalOpen(false);
          await fetchBoard();
        }}
      />

      {taskForModal && (
        <TaskEditModal
          open={taskEditModalOpen}
          setOpen={setTaskEditModalOpen}
          task={taskForModal}
          onSuccess={async () => {
            setTaskEditModalOpen(false);
            setTaskForModal(null);
            await fetchBoard();
          }}
        />
      )}

      {taskForModal && (
        <TaskViewModal
          open={taskViewModalOpen}
          setOpen={setTaskViewModalOpen}
          task={taskForModal}
        />
      )}
    </>
  );
}
