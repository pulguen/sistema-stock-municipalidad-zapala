import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import logo from './Logonav.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

function NavBar({ searchTerm, onSearchChange }) {
  return (
    <Navbar expand="lg" className='navbar'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image
            src={logo} // Utiliza la ruta relativa del logo importado
            alt="Logo"
            width={100} // Ajusta el ancho del logo
            className="d-inline-block align-top"
          />{'  '}
          <span className="brand-text">Sistema de Inventario Municipal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll">
          <span className="navbar-toggler-icon">
            <div></div>
            <div></div>
            <div></div>
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Items" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/Items">Lista Items</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Categorías</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Entidades</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Personas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Entrada" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="listaentradas">Lista Entradas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/entrada">Nueva Entrada</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Salida" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Orden" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/ordencompra">Nueva Orden</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/listaordenes">Listado Ordenes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Nombre Item"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
