import React from 'react';
import { Table } from 'react-bootstrap';

export default function ListaOrdenes({ items = [] }) {
  return (
    <div className="container mt-4">
      <h3>Lista de Órdenes de Compra</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N° Orden (Mesa de entrada)</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {items.map((orden, index) => (
            <tr key={index}>
              <td>{orden.numeroOrden}</td>
              <td>{orden.proveedor}</td>
              <td>{orden.fecha}</td>
              <td>
                <ul>
                  {orden.items.map((item, idx) => (
                    <li key={idx}>{item.nombre} - Cantidad: {item.cantidad} - Precio: {item.precio}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
