import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { userApi } from "../api";

export function RegistrationForm({ setIsLogon }) {
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

    history.push("/login");
  };

  return (
    <Form onSubmit={submit}>
      <Form.Label className="fs-5">Регистрация</Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="Имя пользователя"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="name"
          placeholder="Имя пользователя"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Почта" className="mb-3">
        <Form.Control
          type="email"
          name="email"
          placeholder="Почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Пароль" className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Подтверждение пароля"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="passwordConfirm"
          placeholder="Подтверждение пароля"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
      <Button variant="link" onClick={() => setIsLogon(true)}>
        Авторизация
      </Button>
    </Form>
  );
}
