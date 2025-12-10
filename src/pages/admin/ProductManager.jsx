import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ImageUpload from '../../components/admin/ImageUpload';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../components/admin/imageUpload.css'; // Reuse CSS

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    line: '',
    category: '',
    image: ''
  });

  const productsCollectionRef = collection(db, "products");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const productDoc = doc(db, "products", editingId);
        await updateDoc(productDoc, formData);
      } else {
        await addDoc(productsCollectionRef, formData);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      brand: product.brand,
      line: product.line,
      category: product.category,
      image: product.image
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const productDoc = doc(db, "products", id);
        await deleteDoc(productDoc);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      brand: '',
      line: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Gestión de Productos</h1>
      </div>

      <div className="admin-content-wrapper">
        {/* Form Section */}
        <div className="admin-form-card">
          <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Línea</label>
                <input
                  type="text"
                  name="line"
                  value={formData.line}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Manchas">Manchas</option>
                  <option value="Anti-acné">Anti-acné</option>
                  <option value="Protección Solar">Protección Solar</option>
                  <option value="Capilar">Capilar</option>
                  <option value="Rejuvenecimiento">Rejuvenecimiento</option>
                  <option value="Hidratación">Hidratación</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Imagen</label>
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                currentImage={formData.image} 
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="admin-list-card">
          <h2>Listado de Productos</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={product.image || '/img/placeholder.png'} 
                        alt={product.name} 
                        className="table-img" 
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(product)} className="icon-btn edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="icon-btn delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
