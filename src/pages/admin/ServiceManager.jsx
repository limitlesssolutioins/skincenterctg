import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import ImageUpload from '../../components/admin/ImageUpload';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../components/admin/imageUpload.css';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all'); // all, clinical, aesthetic

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'clinical', // clinical, aesthetic
    image: '',
    image2: '',
    highlights: []
  });
  const [highlightInput, setHighlightInput] = useState('');

  const servicesCollectionRef = collection(db, "services");

  const fetchServices = async () => {
    setLoading(true);
    try {
      let q = servicesCollectionRef;
      if (filter !== 'all') {
        q = query(servicesCollectionRef, where("category", "==", filter));
      }
      const data = await getDocs(q);
      setServices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, [filter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url, field) => {
    setFormData({ ...formData, [field]: url });
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()]
      });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const serviceDoc = doc(db, "services", editingId);
        await updateDoc(serviceDoc, formData);
      } else {
        await addDoc(servicesCollectionRef, formData);
      }
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      longDescription: service.longDescription || '',
      category: service.category,
      image: service.image,
      image2: service.image2 || '',
      highlights: service.highlights || []
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const serviceDoc = doc(db, "services", id);
        await deleteDoc(serviceDoc);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      category: 'clinical',
      image: '',
      image2: '',
      highlights: []
    });
    setHighlightInput('');
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Gestión de Servicios Dermatológicos</h1>
        <div className="filter-controls" style={{ marginTop: '1rem' }}>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'clinical' ? 'active' : ''}`}
            onClick={() => setFilter('clinical')}
          >
            Clínica
          </button>
          <button 
            className={`filter-btn ${filter === 'aesthetic' ? 'active' : ''}`}
            onClick={() => setFilter('aesthetic')}
          >
            Estética
          </button>
        </div>
      </div>

      <div className="admin-content-wrapper">
        {/* Form Section */}
        <div className="admin-form-card">
          <h2>{editingId ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="clinical">Dermatología Clínica</option>
                <option value="aesthetic">Dermatología Estética</option>
              </select>
            </div>

            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción Corta</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción Larga</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Puntos Destacados (Highlights)</label>
              <div className="highlight-input-group" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  placeholder="Agregar punto..."
                />
                <button type="button" onClick={handleAddHighlight} className="add-btn" style={{ padding: '0.5rem', cursor: 'pointer' }}>
                  <FaPlus />
                </button>
              </div>
              <ul className="highlights-list" style={{ listStyle: 'none', padding: 0 }}>
                {formData.highlights.map((highlight, index) => (
                  <li key={index} style={{ background: '#f8f9fa', padding: '0.5rem', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{highlight}</span>
                    <button type="button" onClick={() => handleRemoveHighlight(index)} style={{ border: 'none', background: 'none', color: '#dc3545', cursor: 'pointer' }}>
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label>Imagen Principal</label>
              <ImageUpload 
                onImageUpload={(url) => handleImageUpload(url, 'image')} 
                currentImage={formData.image} 
              />
            </div>

            <div className="form-group">
              <label>Imagen Secundaria</label>
              <ImageUpload 
                onImageUpload={(url) => handleImageUpload(url, 'image2')} 
                currentImage={formData.image2} 
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
          <h2>Listado de Servicios</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <img 
                        src={service.image || '/img/placeholder.png'} 
                        alt={service.title} 
                        className="table-img" 
                      />
                    </td>
                    <td>{service.title}</td>
                    <td>
                      <span className={`badge ${service.category}`}>
                        {service.category === 'clinical' ? 'Clínica' : 'Estética'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(service)} className="icon-btn edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="icon-btn delete">
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

// Add some styles for filter buttons
const style = document.createElement('style');
style.textContent = `
  .filter-btn {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px;
  }
  .filter-btn.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  .badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: white;
  }
  .badge.clinical {
    background-color: #17a2b8;
  }
  .badge.aesthetic {
    background-color: #e83e8c;
  }
`;
document.head.appendChild(style);

// Need to import FaTimes for the remove highlight button
import { FaTimes } from 'react-icons/fa';

export default ServiceManager;
