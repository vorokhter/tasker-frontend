import React from "react";
import { LoginForm } from "../components/LoginForm.js";
import { RegistrationForm } from "../components/RegistrationForm.js";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import banner from "../img/banner.png";

export function Login() {
  const [isLogon, setIsLogon] = React.useState(true);

  return (
    <Container>
      <Row className="justify-content-between">
        <Col md="4" className="d-flex align-items-center">
          <Card body className="bg-light w-100">
            {isLogon ? (
              <LoginForm setIsLogon={setIsLogon} />
            ) : (
              <RegistrationForm setIsLogon={setIsLogon} />
            )}
          </Card>
        </Col>
        <Col md="6" className="d-flex align-items-center">
          <Image src={banner} fluid alt="people" />
        </Col>
      </Row>
    </Container>
  );
}
