import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './antesdespues.css';
import ImageModal from './ImageModal'; // Import the modal component
import ayd1 from '../assets/img/ayd1.png';
import ayd2 from '../assets/img/ayd2.png';
import ayd3 from '../assets/img/ayd3.png';
import ayd4 from '../assets/img/ayd4.png';
import ayd5 from '../assets/img/ayd5.png';

const successCases = [
  { id: 1, image: ayd1, alt: 'Resultado de tratamiento de acné', overlayText: 'Ver Más', modalDescription: 'Tratamiento intensivo para acné con resultados visibles tras varias sesiones.' },
  { id: 2, image: ayd2, alt: 'Resultado de rejuvenecimiento facial', overlayText: 'Ver Más', modalDescription: 'Rejuvenecimiento facial con láser para una piel más tersa y joven.' },
  { id: 3, image: ayd3, alt: 'Resultado de eliminación de manchas', overlayText: 'Ver Más', modalDescription: 'Eliminación completa de manchas solares (léntigos) con tecnología láser.' },
  { id: 4, image: ayd4, alt: 'Resultado de tratamiento con láser', overlayText: 'Ver Más', modalDescription: 'Tratamiento de lesiones vasculares faciales para un tono de piel uniforme.' },
  { id: 5, image: ayd5, alt: 'Resultado de tonificación de la piel', overlayText: 'Ver Más', modalDescription: 'Sesiones de radiofrecuencia para mejorar la tonificación y firmeza de la piel.' },
];

function AntesDespues() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenModal = (caseItem) => {
    setSelectedCase(caseItem);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCase(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <section className="antes-despues-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">Transformaciones Reales, Resultados Visibles</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Creemos en resultados que no solo se ven, sino que se sienten. Nuestra mayor satisfacción es la confianza que los pacientes depositan en nosotros. Aquí, la evidencia de nuestro compromiso y excelencia habla por sí misma.</p>
          </div>
          {!isMobile ? (
            <div className="grid-container">
              {successCases.map((item) => (
                <div key={item.id} className="before-after-card" onClick={() => handleOpenModal(item)}>
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.alt} className="result-image" />
                    <div className="overlay">
                      <p className="overlay-text">{item.overlayText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="carousel-container-slick">
              <Slider {...sliderSettings}>
                {successCases.map((item) => (
                  <div key={item.id} className="before-after-card" onClick={() => handleOpenModal(item)}>
                    <div className="image-wrapper">
                      <img src={item.image} alt={item.alt} className="result-image" />
                      <div className="overlay">
                        <p className="overlay-text">{item.overlayText}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>

      {selectedCase && (
        <ImageModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          imageSrc={selectedCase.image}
          description={selectedCase.modalDescription}
        />
      )}
    </>
  );
}

export default AntesDespues;