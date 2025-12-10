import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import { useSpaServices } from '../firebase/useSpaServices';
import './spa.css';

function SpaFacial() {
  const { openModal } = useOutletContext();
  const { services: facialExperiences, loading } = useSpaServices('facial');

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Facial");
  };

  if (loading) {
     return <div className="spa-section"><div className="container"><p>Cargando experiencias...</p></div></div>;
  }

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Facial</p>
          <h2>Rituales sensoriales para un rostro radiante</h2>
          <p className="spa-section__description">
            En Skincenter creemos que el cuidado facial va más allá de un procedimiento: es una experiencia inmersiva, diseñada para renovar tu piel, relajar tus sentidos y brindarte resultados visibles desde la primera sesión.

            Nuestros tratamientos faciales combinan dermatología avanzada, tecnologías especializadas y protocolos sensoriales que permiten tratar las necesidades específicas de cada tipo de piel de forma segura y personalizada.

            Cada sesión está diseñada para que el paciente viva un momento de salud y bienestar.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={facialExperiences}
          categoryLabel="Spa Facial"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>
    </section>
  );
}

export default SpaFacial;
