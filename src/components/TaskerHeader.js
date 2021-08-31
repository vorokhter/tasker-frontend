import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ExitIcon } from "../icons";

export function TaskerHeader({ location, currentUser, deleteCookie }) {
  //const music = new Audio("/hype.mp3");

  return (
    <Navbar sticky="top">
      <Container className="fw-bold">
        <Link
          className="fs-1 text-white text-decoration-none"
          // onClick={() => music.play()}
        >
          Tasker
        </Link>

        {!["/login", "/registration"].includes(
          location.pathname.toLowerCase()
        ) && (
          <Nav className="justify-content-end align-items-center row g-2">
            <Link to="/" className="text-white text-decoration-none col">
              Комнаты
            </Link>
            <Navbar.Text className="text-white col">
              {currentUser.name}
            </Navbar.Text>
            <Link href="/" className="text-white col">
              <ExitIcon
                className="nav"
                fontSize="large"
                onClick={deleteCookie}
                cursor="pointer"
              />
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
