import React from "react";
import { Container, Row } from "react-bootstrap";
import { Login } from "./pages/Login";
import { Rooms } from "./pages/Rooms";
import { Board } from "./pages/Board";
import { userApi } from "./api/userApi";
import { TaskerHeader } from "./components/TaskerHeader.js";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import "./App.css";

export function App() {
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    id: "-1",
    name: "username",
  });

  const getCurrentUser = async () => {
    const response = await userApi.getCurrentUser();
    if (response.success) {
      setCurrentUser(response.data.user);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
  }, [location]);

  const deleteCookie = function () {
    window.document.cookie =
      "PHPSESSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
    history.push("/login");
  };

  return (
    <Container>
      <Row>
        <TaskerHeader
          location={location}
          currentUser={currentUser}
          deleteCookie={deleteCookie}
        />
      </Row>
      <Row>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/rooms">
            <Rooms currentUser={currentUser} />
          </Route>
          <Route path="/board/:boardId">
            <Board />
          </Route>
          <Redirect exact from="/" to="rooms" />
        </Switch>
      </Row>
    </Container>
  );
}
