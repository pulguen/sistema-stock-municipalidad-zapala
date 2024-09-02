//utils.js
import axios from 'axios';
// URL base para la API
const API_BASE_URL = 'http://10.0.0.17/stock-api/public/api/items';

// Función para agregar un nuevo item
export const handleAddItem = async (items, setItems, newItem) => {
  try {
    // Realiza una solicitud POST al servidor para agregar el nuevo item
    const response = await axios.post(API_BASE_URL, newItem);

    // Agrega el item con el ID asignado por la base de datos al estado local
    const addedItem = response.data; 
    setItems([...items, addedItem]);

    console.log('Item agregado exitosamente:', addedItem);
  } catch (error) {
    console.error('Error al agregar el item:', error);
    alert('Hubo un error al agregar el item. Por favor, intenta de nuevo.');
  }
};

// Función para eliminar un item
export const handleDelete = async (items, setItems, id) => {
  try {
    // Realiza una solicitud DELETE al servidor para eliminar el item
    await axios.delete(`${API_BASE_URL}/${id}`);

    // Si la solicitud fue exitosa, elimina el item del estado local
    setItems(items.filter(item => item.id !== id));

    console.log('Item eliminado exitosamente.');
  } catch (error) {
    console.error('Error al eliminar el item:', error);
    alert('Hubo un error al eliminar el item. Por favor, intenta de nuevo.');
  }
};

// Función para filtrar items por término de búsqueda
export function filterItems(items, searchTerm) {
  if (!searchTerm) return items; // Si no hay término de búsqueda, devolver todos los items
  return items.filter(item => {
    // Verifica que item.name exista y sea una cadena
    const name = item.name || ''; // Si name es undefined, usa una cadena vacía
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

// Función para modificar un item existente y sincronizarlo con la base de datos
export const handleModifyItem = async (items, setItems, updatedItem) => {
  try {
    // Prepara el objeto que se enviará en la solicitud PUT
    const updatePayload = {
      nombre: updatedItem.nombre,
      descripcion: updatedItem.descripcion
    };

    // Realiza la solicitud PUT al servidor para actualizar el item
    const response = await axios.put(`${API_BASE_URL}/${updatedItem.id}`, updatePayload);

    // Si la solicitud fue exitosa, actualiza el estado local con la respuesta del servidor
    const updatedItems = items.map(item =>
      item.id === updatedItem.id ? { ...item, ...response.data } : item
    );
    setItems(updatedItems);

    console.log('Item modificado exitosamente:', response.data);
  } catch (error) {
    console.error('Error al modificar el item:', error);
    alert('Hubo un error al modificar el item. Por favor, intenta de nuevo.');
  }
};
