import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ImageUpload from '../../components/admin/ImageUpload';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import '../../components/admin/imageUpload.css';

const TeamManager = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    credentials: []
  });
  const [credentialInput, setCredentialInput] = useState('');

  const teamCollectionRef = collection(db, "team");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getDocs(teamCollectionRef);
      setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, image: url });
  };

  const handleAddCredential = () => {
    if (credentialInput.trim()) {
      setFormData({
        ...formData,
        credentials: [...formData.credentials, credentialInput.trim()]
      });
      setCredentialInput('');
    }
  };

  const handleRemoveCredential = (index) => {
    const newCredentials = formData.credentials.filter((_, i) => i !== index);
    setFormData({ ...formData, credentials: newCredentials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const memberDoc = doc(db, "team", editingId);
        await updateDoc(memberDoc, formData);
      } else {
        await addDoc(teamCollectionRef, formData);
      }
      resetForm();
      fetchMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      credentials: member.credentials || []
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        const memberDoc = doc(db, "team", id);
        await deleteDoc(memberDoc);
        fetchMembers();
      } catch (error) {
        console.error("Error deleting team member:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      credentials: []
    });
    setCredentialInput('');
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Gestión de Equipo Médico</h1>
      </div>

      <div className="admin-content-wrapper">
        {/* Form Section */}
        <div className="admin-form-card">
          <h2>{editingId ? 'Editar Miembro' : 'Nuevo Miembro'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Rol / Especialidad</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Biografía</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Credenciales y Membresías</label>
              <div className="highlight-input-group" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={credentialInput}
                  onChange={(e) => setCredentialInput(e.target.value)}
                  placeholder="Agregar credencial..."
                />
                <button type="button" onClick={handleAddCredential} className="add-btn" style={{ padding: '0.5rem', cursor: 'pointer' }}>
                  <FaPlus />
                </button>
              </div>
              <ul className="highlights-list" style={{ listStyle: 'none', padding: 0 }}>
                {formData.credentials.map((cred, index) => (
                  <li key={index} style={{ background: '#f8f9fa', padding: '0.5rem', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{cred}</span>
                    <button type="button" onClick={() => handleRemoveCredential(index)} style={{ border: 'none', background: 'none', color: '#dc3545', cursor: 'pointer' }}>
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label>Foto de Perfil</label>
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
          <h2>Equipo Actual</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <img 
                        src={member.image || '/img/placeholder.png'} 
                        alt={member.name} 
                        className="table-img" 
                      />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(member)} className="icon-btn edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="icon-btn delete">
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

export default TeamManager;
