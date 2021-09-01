import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { boardApi, taskApi } from "../api";
import {
  DropdownMenu,
  BoardStage,
  TaskCreationModal,
  TaskEditModal,
  BoardEditModal,
  TaskViewModal,
} from "../components";

export function Board() {
  const { boardId } = useParams();
  const history = useHistory();

  const [board, setBoard] = React.useState(null);
  const [taskForModal, setTaskForModal] = React.useState(null);

  const [taskCreationModalShow, setTaskCreationModalShow] =
    React.useState(false);
  const [taskEditModalShow, setTaskEditModalShow] = React.useState(false);
  const [boardEditModalShow, setBoardEditModalShow] = React.useState(false);
  const [taskViewModalShow, setTaskViewModalShow] = React.useState(false);

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
    if (!taskViewModalShow) setTaskForModal(null);
  }, [taskViewModalShow]);

  const onTaskView = (task) => {
    setTaskForModal(task);
    setTaskViewModalShow(true);
  };

  const onTaskTake = async (task) => {
    const response = await taskApi.takeTask(task.id);
    if (response.success) await fetchBoard();
  };

  const onTaskEdit = (task) => {
    setTaskForModal(task);
    setTaskEditModalShow(true);
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
        setBoardEditModalShow(true);
        break;
      case "addTask":
        setTaskCreationModalShow(true);
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
      <Container className="p-0">
        <Row className="flex-nowrap justify-content-between">
          <Col md="11">
            <span>{board.title}</span>
          </Col>
          <Col md="1">
            <DropdownMenu
              items={dropdownMenuItems}
              onItemClick={onDropdownMenuItemClick}
            />
          </Col>
        </Row>
        <Row>
          {board.stages.map((stage) => (
            <Col md="3">
              <BoardStage
                stage={stage}
                onTaskEdit={onTaskEdit}
                onTaskDelete={onTaskDelete}
                onTaskView={onTaskView}
                onTaskTake={onTaskTake}
                dragStartHandler={dragStartHandler}
                dropHandler={dropHandler}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <BoardEditModal
        show={boardEditModalShow}
        board={board}
        onHide={async () => {
          setBoardEditModalShow(false);
          await fetchBoard();
        }}
      />

      <TaskCreationModal
        boardId={board.id}
        show={taskCreationModalShow}
        onHide={async () => {
          setTaskCreationModalShow(false);
          await fetchBoard();
        }}
      />

      {taskForModal && (
        <TaskEditModal
          show={taskEditModalShow}
          task={taskForModal}
          onHide={async () => {
            setTaskEditModalShow(false);
            setTaskForModal(null);
            await fetchBoard();
          }}
        />
      )}

      {taskForModal && (
        <TaskViewModal
          show={taskViewModalShow}
          task={taskForModal}
          onHide={() => setTaskViewModalShow(false)}
        />
      )}
    </>
  );
}
