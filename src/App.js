import React from "react";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { Rooms } from "./pages/Rooms/Rooms";
import { Board } from "./pages/Board/Board";
import { userApi } from "./api/userApi";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ExitIcon } from "./icons";
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
    <>
      <header className="header">
        <span className="tasker-title">Tasker</span>

        {!["/login", "/registration"].includes(
          location.pathname.toLowerCase()
        ) && (
          <nav className="tasker-nav">
            <Link className="nav" to={"/rooms"}>
              Комнаты
            </Link>

            <span className="nav">{currentUser.name}</span>

            <ExitIcon
              className="nav"
              fontSize="large"
              onClick={deleteCookie}
              cursor="pointer"
            />
          </nav>
        )}
      </header>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/rooms">
          <Rooms currentUser={currentUser} />
        </Route>
        <Route path="/board/:boardId">
          <Board />
        </Route>
        <Redirect exact from="/" to="rooms" />
      </Switch>
    </>
  );
}
