//app.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/Navbar.jsx';
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home.jsx';
import Footer from './Components/Footer/Footer.jsx';
import { Route, Routes } from 'react-router-dom';
import Item from './Components/Item/Item.jsx';
import Entrada from './Components/Entrada/Entrada.jsx';
import ListaEntradas from './Components/Entrada/ListaEntradas.jsx';
import ListaOrdenes from './Components/OrdenCompra/ListaOrdenes.jsx';
import OrdenCompra from './Components/OrdenCompra/OrdenCompra.jsx';
import { handleAddItem, handleDelete, handleModifyItem, filterItems } from '../src/Utils/Utils.js';
import axios from 'axios';

export default function App() {
  const [items, setItems] = useState([]); // Estado inicial vacío para items
  const [searchTerm, setSearchTerm] = useState('');
  const [entradas, setEntradas] = useState(() => {
    const savedEntradas = localStorage.getItem('entradas');
    return savedEntradas ? JSON.parse(savedEntradas) : [];
  });

  // Cargar items desde la base de datos al montar el componente
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://10.0.0.17/stock-api/public/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error al cargar los items:', error);
      }
    };    
    fetchItems();
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  // Guardar entradas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('entradas', JSON.stringify(entradas));
  }, [entradas]);

  const onAddItem = async (newItem) => {
    await handleAddItem(items, setItems, newItem);
    setEntradas((prevEntradas) => [...prevEntradas, newItem]);
  };

  const onDelete = async (id) => {
    await handleDelete(items, setItems, id);
  };

  const onModifyItem = async (updatedItem) => {
    await handleModifyItem(items, setItems, updatedItem);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredItems = filterItems(items, searchTerm); // Aplicar filtro basado en el searchTerm

  return (
    <div className="App">
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route
          exact
          path='/'
          element={<Home items={filteredItems} setItems={setItems} onModify={onModifyItem} onDelete={onDelete} searchTerm={searchTerm} />}
        />
        <Route exact path='/items' element={<Item />} />
        <Route exact path='/entrada' element={<Entrada onAddItem={onAddItem} />} />
        <Route exact path='/listaentradas' element={<ListaEntradas items={entradas} />} />
        <Route path='/ordencompra' element={<OrdenCompra />} />
        <Route path='/listaordenes' element={<ListaOrdenes />} />
      </Routes>
      <Footer />
    </div>
  );
}
