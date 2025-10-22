import React from 'react';
import { NavLink } from 'react-router-dom';
import './blog.css';

// Blog data array
const blogPosts = [
  { id: 1, title: 'Los Beneficios del Ácido Hialurónico', date: '15 de Julio, 2025', image: '/img/blog_post1.webp', excerpt: 'Descubre cómo este poderoso ingrediente puede transformar la hidratación y elasticidad de tu piel...' },
  { id: 2, title: 'Protección Solar: Más Allá del Verano', date: '10 de Julio, 2025', image: '/img/blog_post2.webp', excerpt: 'La importancia de usar protector solar todos los días, sin importar la estación del año...' },
  { id: 3, title: 'Mitos y Verdades sobre el Acné Adulto', date: '05 de Julio, 2025', image: '/img/blog_post3.webp', excerpt: 'Desmentimos creencias populares y te ofrecemos soluciones efectivas para el acné en adultos...' },
  { id: 4, title: 'Rutina de Skincare para Pieles Sensibles', date: '01 de Julio, 2025', image: '/img/blog_post4.webp', excerpt: 'Consejos y productos recomendados para cuidar tu piel delicada sin causar irritaciones...' },
  { id: 5, title: 'Tratamientos Láser: ¿Cuál es el Ideal para Ti?', date: '28 de Junio, 2025', image: '/img/blog_post5.webp', excerpt: 'Una guía completa sobre los diferentes tipos de tratamientos láser y sus aplicaciones específicas...' },
  { id: 6, title: 'Alimentación y Salud de la Piel', date: '20 de Junio, 2025', image: '/img/blog_post6.webp', excerpt: 'Explora la conexión directa que existe entre tu dieta y la apariencia de tu piel...' },
];

// Reusable Blog Post Card Component
const BlogPostCard = ({ post }) => (
  <div className="blog-post-card">
    <img src={post.image} alt={post.title} className="blog-post-card-image" />
    <div className="blog-post-card-content">
      <p className="blog-post-date">{post.date}</p>
      <h3>{post.title}</h3>
      <p className="blog-post-excerpt">{post.excerpt}</p>
      <NavLink to={`/blog/${post.id}`} className="learn-more-link">Leer más &rarr;</NavLink>
    </div>
  </div>
);

function Blog() {
  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">Nuestro Blog</h1>
      </div>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section section-padding">
        <div className="container">
          <div className="blog-posts-grid">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
