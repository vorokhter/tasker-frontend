import React from "react";
import { Button, Nav, Card } from "react-bootstrap";

export function RoomsList({ rooms, selectedRoomId, onRoomClick, onCreateNew }) {
  return (
    <Card>
      <Card.Body className="bg-light">
        <Nav variant="pills" className="flex-column row g-2">
          {rooms.map((room) => (
            <Nav.Item>
              <Nav.Link
                active={selectedRoomId === room.id}
                eventKey={"room" + room.id}
                onClick={() => onRoomClick(room.id)}
              >
                {room.title}
              </Nav.Link>
            </Nav.Item>
          ))}
          <Button variant="outline-primary" onClick={onCreateNew}>
            Создать
          </Button>
        </Nav>
      </Card.Body>
    </Card>
  );
}
