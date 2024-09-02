import React from 'react';
import { Table } from 'react-bootstrap';

export default function ListaDeEntradas({ items = [] }) { // Establece un valor predeterminado de un arreglo vacío
  return (
    <div className="container mt-4">
      <h3>Lista de Entradas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N° Orden</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.numeroOrden}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.stock}</td>
              <td>{item.categoria}</td>
              <td>{item.subcategoria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
