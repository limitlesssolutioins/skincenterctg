import React, { useState } from 'react';
import './dermatologia.css';
import TreatmentDetailModal from '../components/TreatmentDetailModal';
import { useServices } from '../firebase/useServices';

const tecnologiaEstetica = [
  {
    id: 1,
    name: 'Morpheus 8',
    description: 'Sistema de radiofrecuencia fraccionada con microagujas para un tensado y renovación profunda.',
  },
  {
    id: 2,
    name: 'Nanopore y Dermashine',
    description: 'Dispositivos de microcanales que permiten vehiculizar activos de forma uniforme y controlada.',
  },
  {
    id: 3,
    name: 'Luz pulsada intensa',
    description: 'Tecnología que mejora manchas, enrojecimiento y textura, con mínimos tiempos de recuperación.',
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

const TechnologyCard = ({ item }) => (
  <div className="technology-card">
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </div>
);

function DermatologiaEstetica() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const { services: servicesData, loading } = useServices('aesthetic');

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
        <h1 className="page-title">Dermatología estética</h1>
        <p className="page-subtitle">
          En SkinCenter, combinamos ciencia y arte para realzar tu belleza natural. Ofrecemos tratamientos de dermatología estética personalizados, desde rejuvenecimiento facial hasta manejo de manchas y acné, con tecnologías avanzadas y un enfoque en resultados seguros y armoniosos. Nuestra prioridad es tu bienestar y la salud de tu piel.
        </p>
      </div>

      <section className="service-page-container section-padding">
        <div className="container">
          {servicesData.map((service) => (
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
          category="Dermatología Estética"
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default DermatologiaEstetica;
