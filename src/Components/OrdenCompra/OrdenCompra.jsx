import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrdenCompra({ onAddOrden }) {
  const [formData, setFormData] = useState({
    item_id: '',
    cantidad: '',
    estado_id: '',
    user_id: 5 // Este es un valor fijo; deberías ajustarlo según el contexto de usuario
  });

  const [items, setItems] = useState([]);
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener lista de ítems
    axios.get('http://10.0.0.17/stock-api/public/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error al obtener ítems:', error));

    // Obtener lista de estados
    axios.get('http://10.0.0.17/stock-api/public/api/ordenes-estado')
      .then(response => setEstados(response.data))
      .catch(error => console.error('Error al obtener estados:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.item_id && formData.cantidad && formData.estado_id) {
      try {
        await axios.post('http://10.0.0.17/stock-api/public/api/ordenes', formData);
        onAddOrden(formData); // Registrar la nueva orden
        navigate('/listaordenes'); // Redirigir a la lista de órdenes
      } catch (error) {
        console.error('Error al crear la orden:', error.response ? error.response.data : error.message);
        alert('Hubo un error al crear la orden. Por favor, intenta de nuevo.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Orden de Compra</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formItemId">
              <Form.Label>Ítem</Form.Label>
              <Form.Control
                as="select"
                name="item_id"
                value={formData.item_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un ítem</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEstadoId">
              <Form.Label>Estado de la Orden</Form.Label>
              <Form.Control
                as="select"
                name="estado_id"
                value={formData.estado_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un estado</option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Crear Orden de Compra
        </Button>
      </Form>
    </div>
  );
}
