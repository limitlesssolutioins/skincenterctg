import React, { useState } from 'react';
import './resenas.css';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaGoogle } from 'react-icons/fa';

function Resenas() {
  const testimonialsData = [
    {
      id: 1,
      quote: 'Desde que comencé mi tratamiento, mi piel ha <strong>mejorado drásticamente</strong>. ¡Encantada con los resultados y la atención!',
      author: 'María G.',
      rating: 5,
    },
    {
      id: 2,
      quote: 'El equipo médico es <strong>excepcional</strong>. Me explicaron cada paso y me sentí muy segura. ¡Altamente recomendado!',
      author: 'Ana P.',
      rating: 5,
    },
    {
      id: 3,
      quote: 'Aquí encontraron la solución perfecta para mi acné. Mi <strong>confianza ha vuelto</strong>.',
      author: 'Carlos R.',
      rating: 5,
    },
    {
      id: 4,
      quote: 'Las instalaciones son de <strong>primera</strong> y el personal es increíblemente amable. Cada visita es una experiencia positiva.',
      author: 'Laura M.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonialsData[currentIndex];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
      );
    }
    return stars;
  };

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Lo que Dicen Nuestros Pacientes</h2>
          <div className="google-rating">
            <FaGoogle className="google-icon" />
            <span><strong>5.0</strong> en Google</span>
          </div>
        </div>

        <div className="testimonial-carousel">
          <button onClick={goToPrevious} className="carousel-button prev-button">
            <FaChevronLeft />
          </button>

          <div className="testimonial-card">
            <FaQuoteLeft size={24} className="quote-icon" />
            <div className="testimonial-rating">
              {renderStars(currentTestimonial.rating)}
            </div>
            <p className="quote-text" dangerouslySetInnerHTML={{ __html: currentTestimonial.quote }}></p>
            <p className="author-name">- {currentTestimonial.author}</p>
          </div>

          <button onClick={goToNext} className="carousel-button next-button">
            <FaChevronRight />
          </button>
        </div>


      </div>
    </section>
  );
}

export default Resenas;