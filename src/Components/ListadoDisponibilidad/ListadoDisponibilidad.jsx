import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./ListadoDisponibilidad.css";

export default function ListadoDisponibilidad({ onModify, searchTerm }) {
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    // Función para obtener los datos desde la API
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://10.0.0.17/stock-api/public/api/items"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Función para eliminar un item
  const onDelete = async (id) => {
    try {
      // Realiza la solicitud DELETE a la ruta correspondiente
      await axios.delete(`http://10.0.0.17/stock-api/public/api/items/${id}`);
      // Filtra los items eliminando el que fue borrado
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      alert("Item eliminado exitosamente.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error al eliminar el item.");
    }
  };

  // Función para filtrar items basados en el searchTerm
  const filterItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredItems = filterItems(items, searchTerm); // Filtra los items

  // Usa filteredItems para la ordenación
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];

        if (typeof aKey === "number" && typeof bKey === "number") {
          return sortConfig.direction === "asc" ? aKey - bKey : bKey - aKey;
        } else {
          aKey = aKey.toString().toLowerCase();
          bKey = bKey.toString().toLowerCase();
          return sortConfig.direction === "asc"
            ? aKey.localeCompare(bKey)
            : bKey.localeCompare(aKey);
        }
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]); // Usa filteredItems aquí

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    } else {
      return <FaSort />;
    }
  };

  return (
    <div className="table-responsive mt-2">
      <h3>Listado Disponibilidad</h3>
      <Table striped bordered hover className="table-adaptable">
        <thead>
          <tr>
            <th onClick={() => requestSort("id")}>
              ID {getSortIcon("id")}
            </th>
            <th onClick={() => requestSort("nombre")}>
              Nombre Item {getSortIcon("nombre")}
            </th>
            <th onClick={() => requestSort("descripcion")}>
              Descripción {getSortIcon("descripcion")}
            </th>
            <th onClick={() => requestSort("stock")}>
              Stock {getSortIcon("stock")}
            </th>
            <th onClick={() => requestSort("categoria")}>
              Categoría {getSortIcon("categoria")}
            </th>
            <th onClick={() => requestSort("subcategoria")}>
              Sub Categoría {getSortIcon("subcategoria")}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>{item.categoria?.nombre || "Sin categoría"}</td>
              <td>{item.subcategoria?.nombre || "Sin subcategoría"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => onModify(item)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}