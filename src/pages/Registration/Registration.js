import React from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../api";
import "./Registration.css";
import men from "../../img/men.png";

export function Registration() {
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const submit = async (event) => {
    event.preventDefault();
    const response = await userApi.registration(
      name,
      email,
      password,
      passwordConfirm
    );

    if (!response.success) {
      setErrorMessage(response.message);
      setIsError(true);
      return;
    }

    //userState.currentUser = response.data;
    history.push("/login");
  };

  return (
    <div className="page">
      <form className="registration-form" onSubmit={submit}>
        <h1>Регистрация</h1>

        {isError && (
          <span className="typography typography-error">{errorMessage}</span>
        )}

        <div className="inputs">
          <input
            type="text"
            name="name"
            placeholder="Имя пользователя"
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Подтверждение пароля"
            className="input"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>
        <div className="controls">
          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
          <Link className="btn btn-empty btn-secondary" to={`./login`}>
            Авторизация
          </Link>
        </div>
      </form>
      <img className="men" src={men} alt="men4ik" />
    </div>
  );
}
