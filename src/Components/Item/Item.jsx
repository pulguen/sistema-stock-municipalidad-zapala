import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListadoDisponibilidad from "../ListadoDisponibilidad/ListadoDisponibilidad";
import itemsData from '../../Utils/itemsData';

export default function Item() {
  const [items, setItems] = useState(itemsData);

  const handleModify = (article) => {
    // Lógica para modificar el artículo
    console.log("Modificar artículo:", article);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el artículo
    setItems(items.filter(item => item.id !== id));
    console.log("Eliminar artículo con id:", id);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col> 
          <ListadoDisponibilidad
            ItemsDisponibles={items}
            onModify={handleModify}
            onDelete={handleDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}