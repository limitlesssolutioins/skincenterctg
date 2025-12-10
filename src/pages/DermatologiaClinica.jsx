import React, { useState } from 'react';
import './dermatologia.css';
import TreatmentDetailModal from '../components/TreatmentDetailModal';
import { useServices } from '../firebase/useServices';

const tecnologiaClinica = [
  {
    id: 1,
    name: 'Dermatoscopia digital',
    description: 'Análisis de lesiones pigmentadas con imágenes de alta resolución para un diagnóstico temprano y preciso.',
  },
  {
    id: 2,
    name: 'Laboratorio de patología',
    description: 'Interpretación histológica especializada que respalda decisiones terapéuticas seguras.',
  },
  {
    id: 3,
    name: 'Láser de colorante pulsado',
    description: 'Tecnología específica para lesiones vasculares y marcas postinflamatorias con tiempos cortos de recuperación.',
  },
];

const ServiceBlock = ({ service, onLearnMore }) => (
  <div className="service-block">
    <div className="service-image-container">
      <img src={service.image} alt={service.title} className="service-image" />
    </div>
    <div className="service-text-container">
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <button type="button" className="learn-more-button" onClick={() => onLearnMore(service)}>
        Saber más
      </button>
    </div>
    <div className="service-image-container">
      <img src={service.image2} alt={service.title} className="service-image" />
    </div>
  </div>
);

function DermatologiaClinica() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const { services: tratamientosMedicosData, loading } = useServices('clinical');

  const handleOpenModal = (service) => {
    setSelectedTreatment(service);
  };

  const handleCloseDetail = () => {
    setSelectedTreatment(null);
  };

  if (loading) {
     return <div className="servicios-page"><div className="container"><p>Cargando servicios...</p></div></div>;
  }

  return (
    <div className="servicios-page">
      <div className="container">
        <h1 className="page-title">Dermatología clínica</h1>
        <p className="page-subtitle">
          Diagnóstico especializado y tratamientos avanzados respaldados por tecnología de última generación.
        </p>
      </div>

      <section className="service-page-container section-padding">
        <div className="container">
          {tratamientosMedicosData.map((service) => (
            <ServiceBlock
              key={service.id}
              service={service}
              onLearnMore={handleOpenModal}
            />
          ))}
        </div>
      </section>

      {selectedTreatment && (
        <TreatmentDetailModal
          treatment={selectedTreatment}
          category="Dermatología Clínica"
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default DermatologiaClinica;
