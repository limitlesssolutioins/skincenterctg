import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import { useSpaServices } from '../firebase/useSpaServices';
import './spa.css';

function SpaLaser() {
  const { openModal } = useOutletContext();
  const { services: laserExperiences, loading } = useSpaServices('laser');

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Laser");
  };

  if (loading) {
     return <div className="spa-section"><div className="container"><p>Cargando experiencias...</p></div></div>;
  }

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Laser</p>
          <h2>Tecnologia de precision para transformar la piel</h2>
          <p className="spa-section__description">
            Nuestra plataforma de Spa Láser ofrece soluciones avanzadas y seguras para el cuidado de la piel, supervisadas por dermatólogos expertos. Nos especializamos en tres áreas clave: la depilación láser permanente para una piel suave y sin vello, el tratamiento de rejuvenecimiento facial para mejorar la textura y unificar el tono, y la despigmentación de zonas nigricans (como axilas e ingles) para corregir la hiperpigmentación. Utilizamos tecnología de precisión para garantizar resultados visibles, duraderos y adaptados a las necesidades de cada tipo de piel.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={laserExperiences}
          categoryLabel="Spa Laser"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>
    </section>
  );
}

export default SpaLaser;
