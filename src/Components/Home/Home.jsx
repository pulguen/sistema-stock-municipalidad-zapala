//home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { FaBox, FaBuilding, FaArrowDown, FaArrowUp, FaClipboardList, FaFileAlt, FaPlus, FaUserCheck } from 'react-icons/fa';
import ListadoDisponibilidad from '../ListadoDisponibilidad/ListadoDisponibilidad.jsx';
import EditItemModal from '../ModificarItem/ModificarItemModal.jsx';
import { Link } from 'react-router-dom';
import './Home.css';
import Loading from '../Loading/Loading.jsx';
import { handleModifyItem } from '../../Utils/Utils.js'; // Importa la función handleModifyItem
import axios from 'axios';

export default function Home({ items, setItems, onDelete, searchTerm }) {
  const [cargando, setCargando] = useState(true); // Estado para el loading
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categorias, SetCategorias] = useState([]);
  const [subcategorias, SetSubcategorias] = useState([]);

  useEffect(()=> {
    const fetchCategoriesAndSubcategories = async () => {
      try{
        const [catResponse, subcatResponse] = await Promise.all([
          axios.get('http://10.0.0.17/stock-api/public/api/categorias'),
          axios.get('http://10.0.0.17/stock-api/public/api/subcategorias'),
        ]);
        SetCategorias(catResponse.data);
        SetSubcategorias(subcatResponse.data);
      } catch(error){
        console.error('Error al cargar categorías y subcategorías', error);
      }
    };
    fetchCategoriesAndSubcategories();
  },[]);

  useEffect(() => {
    // Simulación de carga de datos
    setCargando(true);
    // Suponiendo que 'items' viene de una solicitud API en otro lado o props
    setTimeout(() => {
      setCargando(false); // Cambia el estado cuando los datos están listos
    }, 1500); // Simulación de 1 segundos de carga, ajusta según la carga real
  }, [items]);

  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };  

  const handleClose = () => {
    setShowModal(false);
  };

  // Manejar la acción de guardar después de modificar un item
  const handleSave = async (updatedItem) => {
    await handleModifyItem(items, setItems, updatedItem); // Actualiza tanto el estado local como la base de datos
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <Container fluid className="grid-container">
      <aside className="sidebar">
        <h2 className='titulo-slidebar'>Accesos rápidos</h2>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/items">
            <FaBox className="me-2" />
            Items
          </Nav.Link>
          <Nav.Link href="#entidades">
            <FaBuilding className="me-2" />
            Entidades
          </Nav.Link>
          <Nav.Link href="#personas">
            <FaUserCheck className="me-2" />
            Personas
          </Nav.Link>
        </Nav>
        <Nav className="flex-column mt-3">
          <Nav.Link as={Link} to="/entrada">
            <FaArrowDown className="me-2" />
            Entradas
          </Nav.Link>
          <Nav.Link href="#salida">
            <FaArrowUp className="me-2" />
            Salidas
          </Nav.Link>
          <Nav.Link as={Link} to="/listaordenes">
            <FaClipboardList className="me-2" />
            Ordenes
          </Nav.Link>
        </Nav>
        <Nav className="flex-column mt-3">
          <Nav.Link href="#reportes">
            <FaFileAlt className="me-2" />
            Reportes
          </Nav.Link>
        </Nav>
      </aside>

      <main className="main-content">
        <h1>Sistema de Stock General</h1>
        <div className='bottons-home'>
          <Link to="/entrada">
            <Button variant="primary" className='m-1'>
              <FaPlus className='me-2' />
              Nueva Entrada
            </Button>
          </Link>
          <Button variant="primary" className='m-1'>
            <FaPlus className='me-2' />
            Nueva Salida
          </Button>
          <Link to="/ordencompra">
            <Button variant="primary" className='m-1'>
              <FaPlus className='me-2' />
              Nueva orden
            </Button>
          </Link>
        </div>

        {/* Mostrar Loading mientras se cargan los datos */}
        {cargando ? (
          <Loading />
        ) : (
          <ListadoDisponibilidad
            items={items}
            onModify={handleShow}
            onDelete={onDelete}
            searchTerm={searchTerm}
          />
        )}
      </main>

      {selectedItem && (
        <EditItemModal
          show={showModal}
          handleClose={handleClose}
          item={selectedItem}
          onSave={handleSave}
          categorias={categorias}
          subcategorias={subcategorias}
        />
      )}
    </Container>
  );
}
