import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ImageUpload from '../../components/admin/ImageUpload';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../components/admin/imageUpload.css';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: '',
    excerpt: '',
    content: ''
  });

  const postsCollectionRef = collection(db, "blog_posts");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
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
        const postDoc = doc(db, "blog_posts", editingId);
        await updateDoc(postDoc, formData);
      } else {
        await addDoc(postsCollectionRef, formData);
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      date: post.date,
      image: post.image,
      excerpt: post.excerpt,
      content: post.content || '' // Handle cases where content might be missing in migration
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const postDoc = doc(db, "blog_posts", id);
        await deleteDoc(postDoc);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      image: '',
      excerpt: '',
      content: ''
    });
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Gestión de Blog</h1>
      </div>

      <div className="admin-content-wrapper">
        {/* Form Section */}
        <div className="admin-form-card">
          <h2>{editingId ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
          <form onSubmit={handleSubmit}>
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
              <label>Fecha</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Ej: 15 de Julio, 2025"
                required
              />
            </div>

            <div className="form-group">
              <label>Extracto (Resumen)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Contenido Completo</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
              />
            </div>

            <div className="form-group">
              <label>Imagen Destacada</label>
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
          <h2>Artículos Publicados</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <img 
                        src={post.image || '/img/placeholder.png'} 
                        alt={post.title} 
                        className="table-img" 
                      />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.date}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(post)} className="icon-btn edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="icon-btn delete">
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

export default BlogManager;
