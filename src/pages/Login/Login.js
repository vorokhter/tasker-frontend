import React from "react";
import { Link, useHistory } from "react-router-dom";
import { userApi } from "../../api";
import {
  Form,
  Button,
  FloatingLabel,
  Card,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import banner from "../../img/banner.png";

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
    <Container>
      <Row className="justify-content-between">
        <Col md="4" className="d-flex align-items-center">
          <Card body className="bg-light w-100">
            <Form onSubmit={submit}>
              <Form.Label className="fs-5">Авторизация</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Почта"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Почта"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Пароль"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FloatingLabel>
              <Button variant="primary" type="submit">
                Войти
              </Button>
              <Link to={`/registration`}>
                <Button variant="link">Регистрация</Button>
              </Link>
            </Form>
          </Card>
        </Col>
        <Col md="6" className="d-flex align-items-center">
          <Image src={banner} fluid alt="people" />
        </Col>
      </Row>
    </Container>
  );
}
