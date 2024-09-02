import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la función de autenticación
    // authenticateUser(username, password);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Inicio de Sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recordarme" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Button variant="link" onClick={() => alert('Obtener ayuda')} className="p-0">¿Olvidaste tus datos? Obtener ayuda</Button>
            <Button variant="link" onClick={() => alert('Recuperar contraseña')} className="p-0">¿No recuerdas tu contraseña? Recuperar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
