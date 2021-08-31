import React from "react";
import { useHistory } from "react-router";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

export function RoomBoard({ board, onBoardDelete, canEdit }) {
  const history = useHistory();

  return (
    <Card body className="bg-light" eventKey={"board" + board.id}>
      <Container>
        <Row>
          <Card.Title>{board.title}</Card.Title>
        </Row>
        <Row>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                history.push(`/board/${board.id}`);
              }}
            >
              Подробнее
            </Button>
          </Col>
          <Col>
            {canEdit && (
              <Button
                variant="link"
                size="sm"
                onClick={() => onBoardDelete(board)}
              >
                Удалить
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
