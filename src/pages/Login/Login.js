import React from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../api";
import men from "../../img/men.png";
import "./Login.css";

export function Login() {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const submit = async (event) => {
    event.preventDefault();
    const response = await userApi.login(email, password);

    if (!response.success) {
      setErrorMessage(response.message);
      setIsError(true);
      return;
    }

    history.push("/rooms");
  };

  return (
    <div className="page">
      <form className="login-form" onSubmit={submit}>
        <h1>Авторизация</h1>

        {isError && (
          <span className="typography typography-error">{errorMessage}</span>
        )}

        <div className="inputs">
          <input
            type="email"
            name="email"
            placeholder="Почта"
            className="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="controls">
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
          <Link className="btn btn-empty btn-secondary" to={`./registration`}>
            Регистрация
          </Link>
        </div>
      </form>
      <img className="men" src={men} alt="men4ik" />
    </div>
  );
}
