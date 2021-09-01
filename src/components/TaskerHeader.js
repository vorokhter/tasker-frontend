import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { ExitIcon } from "../icons";

export function TaskerHeader({ location, currentUser, deleteCookie }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioRef = React.useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Navbar sticky="top" className="p-0">
      <Container className="fw-bold p-0 mb-5">
        <Link
          className="fs-1 text-white text-decoration-none"
          onClick={() => togglePlay()}
        >
          Tasker
          {isPlaying && <Spinner animation="border" variant="light" />}
          <audio ref={audioRef}>
            <source src="/hype.mp3" type="audio/mpeg" />
          </audio>
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
