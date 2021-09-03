import React from "react";
import { Modal, ListGroup, Container, Row, Col } from "react-bootstrap";
import { userApi } from "../api";
import { ArrowIcon } from "../icons";

export function UsersManageModal(props) {
  const usersOfThisRoom = props.users.filter((user) =>
    user.roomIds.includes(props.room.id)
  );
  const restUsers = props.users.filter(
    (user) => !user.roomIds.includes(props.room.id)
  );

  const addUser = async (userId) => {
    const userResponse = await userApi.addUser(props.room.id, userId);
    if (userResponse.success) {
      await props.fetchUsers();
    }
  };

  const kickUser = async (userId) => {
    const userResponse = await userApi.kickUser(props.room.id, userId);
    if (userResponse.success) {
      await props.fetchUsers();
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Управление пользователями</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          style={{
            minHeight: "250px",
          }}
        >
          <Row>
            <Col>
              <span>Свободные пользователи</span>
              <ListGroup>
                {restUsers.map((user) => (
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>{user.name}</span>
                    <ArrowIcon
                      onClick={() => addUser(user.id)}
                      direction={true}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <span>Участники комнаты</span>
              <ListGroup>
                {usersOfThisRoom.map((user) => (
                  <ListGroup.Item className="d-flex justify-content-between">
                    <ArrowIcon
                      onClick={() => kickUser(user.id)}
                      direction={false}
                    />
                    <span>{user.name}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
