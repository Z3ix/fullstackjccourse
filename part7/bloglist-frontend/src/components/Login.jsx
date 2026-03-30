import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler(e) {
    e.preventDefault();
    if (await login({ username, password })) {
      setUsername("");
    }
    setPassword("");
  }

  return (
    <Form onSubmit={loginHandler} className="p-3">
      <h2>Log in</h2>
      <Form.Group as={Row} controlId="usernameInput" className="mb-2">
        <Form.Label column sm={1}>
          Username
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="passwordInput" className="mb-2">
        <Form.Label column sm={1}>
          Password
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          ></Form.Control>
        </Col>
      </Form.Group>
      <Button type="submit" name="login">
        login
      </Button>
    </Form>
  );
};

export default LoginForm;
