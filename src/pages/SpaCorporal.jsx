import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import { useSpaServices } from '../firebase/useSpaServices';
import './spa.css';

function SpaCorporal() {
  const { openModal } = useOutletContext();
  const { services: corporalExperiences, loading } = useSpaServices('corporal');

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Corporal");
  };

  if (loading) {
     return <div className="spa-section"><div className="container"><p>Cargando experiencias...</p></div></div>;
  }

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Corporal</p>
          <h2>Moldeamos, tonificamos y equilibramos tu cuerpo</h2>
          <p className="spa-section__description">
            En SkinCenter combinamos tecnología corporal de última generación con técnicas manuales especializadas, para ofrecer tratamientos efectivos, seguros y personalizados, enfocados en mejorar tu figura, la salud de tu piel y tu bienestar integral.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={corporalExperiences}
          categoryLabel="Spa Corporal"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>
    </section>
  );
}

export default SpaCorporal;
