import React from 'react';
import { NavLink } from 'react-router-dom';
import './spa.css';


// Data for Spa Categories
const spaCategories = [
  {
    id: 'facial',
    title: 'Spa Facial',
    description: 'Revitaliza tu rostro con tratamientos personalizados para una piel radiante y saludable.',
    image: '/img/facial_rejuvenation.webp',
    link: '/spa/facial',
  },
  {
    id: 'capilar',
    title: 'Spa Capilar',
    description: 'Soluciones avanzadas para la salud y belleza de tu cabello, combatiendo la caída y fortaleciéndolo.',
    image: '/img/prp_therapy.webp',
    link: '/spa/capilar',
  },
  {
    id: 'corporal',
    title: 'Spa Corporal',
    description: 'Moldea tu figura y reafirma tu piel con tratamientos corporales innovadores y efectivos.',
    image: '/img/body_sculpting.webp',
    link: '/spa/corporal',
  },
  {
    id: 'laser',
    title: 'Spa Láser',
    description: 'Tecnología láser de vanguardia para depilación, rejuvenecimiento y eliminación de imperfecciones.',
    image: '/img/laser.jpg',
    link: '/spa/laser',
  },
];

// Data for Spa Benefits
const spaBenefits = [
  {
    icon: '✨',
    title: 'Piel Radiante',
    description: 'Logra una tez luminosa y uniforme con nuestros tratamientos faciales.',
  },
  {
    icon: '💇‍♀️',
    title: 'Cabello Fuerte',
    description: 'Fortalece tu cabello desde la raíz, reduciendo la caída y promoviendo su crecimiento.',
  },
  {
    icon: '💪',
    title: 'Cuerpo Tonificado',
    description: 'Define y reafirma tu silueta con nuestras terapias corporales especializadas.',
  },
  {
    icon: '🧘‍♀️',
    title: 'Mente Relajada',
    description: 'Disfruta de un oasis de calma y bienestar que renueva cuerpo y espíritu.',
  },
];

// Reusable Spa Category Card Component
const SpaCategoryCard = ({ category }) => (
  <div className="spa-category-card">
    <img src={category.image} alt={category.title} className="spa-category-image" />
    <div className="spa-category-content">
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <NavLink to={category.link} className="btn btn-secondary">Explorar Tratamientos</NavLink>
    </div>
  </div>
);

// Reusable Spa Benefit Card Component
const SpaBenefitCard = ({ benefit }) => (
  <div className="spa-benefit-card">
    <span className="benefit-icon">{benefit.icon}</span>
    <h4>{benefit.title}</h4>
    <p>{benefit.description}</p>
  </div>
);

function Spa() {
  return (
    <div className="servicios-page">
      {/* Hero Section */}
      <section className="spa-hero-section">
        <div className="container">
          <h1 className="hero-title">Tu Viaje de Bienestar Comienza Aquí</h1>
          <p className="hero-subtitle">Descubre un mundo de relajación y transformación para tu piel, cabello y cuerpo.</p>
        </div>
      </section>

      {/* Spa Categories Section */}
      <section className="spa-categories-section section-padding">
        <div className="container">
          <h2 className="text-center section-title">Espacios de Bienestar</h2>
          <div className="spa-categories-grid">
            {spaCategories.map(category => (
              <SpaCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Transformative Benefits Section */}
      <section className="spa-benefits-section section-padding bg-light">
        <div className="container">
          <h2 className="text-center section-title">Beneficios que Transforman</h2>
          <div className="spa-benefits-grid">
            {spaBenefits.map((benefit, index) => (
              <SpaBenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Spa;