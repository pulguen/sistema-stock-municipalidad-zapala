import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Entrada({ onAddItem }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    categoria: '',
    subcategoria: '',
    numeroOrden: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.descripcion && formData.stock && formData.categoria && formData.subcategoria && formData.numeroOrden) {
      const newItem = {
        // El ID será asignado en App.jsx
        ...formData,
        stock: parseInt(formData.stock, 10)
      };
      onAddItem(newItem); // Registrar el nuevo ítem
      navigate('/listaentradas'); // Redirigir a la lista de entradas
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Agregar Nuevo Item</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formNumeroOrden">
              <Form.Label>N° Orden</Form.Label>
              <Form.Control
                type="text"
                placeholder="Número de orden"
                name="numeroOrden"
                value={formData.numeroOrden}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del item"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del item"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad en stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSubcategoria">
              <Form.Label>Subcategoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subcategoría"
                name="subcategoria"
                value={formData.subcategoria}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Agregar Nuevo Item
        </Button>
      </Form>
    </div>
  );
}
