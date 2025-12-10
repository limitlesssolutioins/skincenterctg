import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import { useSpaServices } from '../firebase/useSpaServices';
import './spa.css';

function SpaCapilar() {
  const { openModal } = useOutletContext();
  const { services: capilarExperiences, loading } = useSpaServices('capilar');

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Capilar");
  };

  if (loading) {
     return <div className="spa-section"><div className="container"><p>Cargando experiencias...</p></div></div>;
  }

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Capilar</p>
          <h2>Fortalecemos tu cabello desde el foliculo</h2>
          <p className="spa-section__description">
            Nuestros protocolos están diseñados para detener la caída, estimular el crecimiento, fortalecer la fibra capilar y mejorar la salud del folículo, devolviendo al cabello su vitalidad y densidad natural.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={capilarExperiences}
          categoryLabel="Spa Capilar"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>
    </section>
  );
}

export default SpaCapilar;
