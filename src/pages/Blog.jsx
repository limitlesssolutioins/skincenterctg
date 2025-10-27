import React from 'react';
import { NavLink } from 'react-router-dom';
import './blog.css';

// Blog data array
const blogPosts = [
  { id: 1, title: 'Los Beneficios del Ácido Hialurónico', date: '15 de Julio, 2025', image: '/img/blog_post1.webp', excerpt: 'El ácido hialurónico es una sustancia natural que se encuentra en nuestro cuerpo, especialmente en la piel, articulaciones y ojos. Su principal función es retener agua, lo que lo convierte en un hidratante excepcional. En dermatología, se utiliza ampliamente para mejorar la elasticidad de la piel, reducir arrugas y líneas de expresión, y proporcionar un aspecto más joven y saludable. Descubre cómo este poderoso ingrediente puede transformar la hidratación y elasticidad de tu piel, aportando volumen y disminuyendo los signos del envejecimiento de manera natural y efectiva.' },
  { id: 2, title: 'Protección Solar: Más Allá del Verano', date: '10 de Julio, 2025', image: '/img/blog_post2.webp', excerpt: 'La protección solar es fundamental durante todo el año, no solo en verano. Los rayos UV están presentes incluso en días nublados y pueden causar daño acumulativo en la piel, llevando a envejecimiento prematuro, manchas y un mayor riesgo de cáncer de piel. Es crucial incorporar un protector solar de amplio espectro con un SPF de 30 o más en tu rutina diaria, aplicándolo generosamente y reaplicándolo cada pocas horas, especialmente si estás al aire libre. Aprende la importancia de usar protector solar todos los días, sin importar la estación del año, para mantener tu piel sana y protegida.' },
  { id: 3, title: 'Mitos y Verdades sobre el Acné Adulto', date: '05 de Julio, 2025', image: '/img/blog_post3.webp', excerpt: 'El acné no es solo un problema adolescente; muchas personas experimentan brotes en la edad adulta, a menudo debido a factores hormonales, estrés o productos inadecuados. Desmentimos creencias populares como que el chocolate causa acné o que solo afecta a pieles grasas. Exploramos las verdaderas causas del acné adulto y te ofrecemos soluciones efectivas, desde tratamientos tópicos y orales hasta cambios en el estilo de vida y rutinas de cuidado de la piel personalizadas. Descubre cómo manejar y prevenir el acné para lograr una piel clara y saludable.' },
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
