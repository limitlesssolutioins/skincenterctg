import React, { useState } from 'react';
import QuickAssessmentModal from '../components/QuickAssessmentModal';
import './dermatologia.css';

const servicesData = [
  {
    id: 1,
    title: 'Toxina Botulinica Avanzada',
    description: 'Tratamiento para arrugas dinamicas en frente, entrecejo y contorno ocular con resultados naturales.',
    image: '/img/toxina.png',
  },
  {
    id: 2,
    title: 'Rellenos con Acido Hialuronico',
    description: 'Reposicion de volumen y definicion de contornos en labios, surcos, menton y pomezones.',
    image: '/img/acidohialuronico.png',
  },
  {
    id: 3,
    title: 'Radiesse',
    description: 'Bioestimulador que promueve la produccion de colageno para un efecto lifting progresivo.',
    image: '/img/radiesse.png',
  },
  {
    id: 4,
    title: 'Harmonyca',
    description: 'Tratamiento hibrido que combina relleno inmediato con estimulacion de colageno a largo plazo.',
    image: '/img/harmonyca.png',
  },
  {
    id: 5,
    title: 'Skinbooster Facial',
    description: 'Hidratacion profunda que mejora elasticidad, textura y luminosidad de la piel.',
    image: '/img/skinbooster.png',
  },
  {
    id: 6,
    title: 'Hilos PDO',
    description: 'Redensificacion y efecto tensor inmediato mediante hilos reabsorbibles lisos y espiculados.',
    image: '/img/hilos.png',
  },
  {
    id: 7,
    title: 'Tratamientos con Microagujas',
    description: 'Tecnologias como Radiofixer, Nanopore, Dermashine y Morpheus 8 para mejorar textura, arrugas y cicatrices.',
    image: '/img/microagujas.png',
  },
];

const tecnologiaEstetica = [
  {
    id: 1,
    name: 'Morpheus 8',
    description: 'Sistema de radiofrecuencia fraccionada con microagujas para tensado y renovacion profunda.',
  },
  {
    id: 2,
    name: 'Nanopore y Dermashine',
    description: 'Dispositivos de microcanales que permiten vehiculizar activos de forma uniforme y controlada.',
  },
  {
    id: 3,
    name: 'Luz Pulsada Intensa',
    description: 'Tecnologia que mejora manchas, enrojecimiento y textura con minimos tiempos de recuperacion.',
  },
];

const ServiceBlock = ({ service, isReversed, onLearnMore }) => (
  <div className={'service-block' + (isReversed ? ' service-block--reverse' : '')}>
    <div className="service-image-container">
      <img src={service.image} alt={service.title} className="service-image" />
    </div>
    <div className="service-text-container">
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <button type="button" className="learn-more-button" onClick={() => onLearnMore(service.title)}>
        Saber mas
      </button>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenModal = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  return (
    <div className="servicios-page">
      <div className="container">
        <h1 className="page-title">Dermatologia Estetica</h1>
        <p className="page-subtitle">
          Protocolos personalizados para realzar rasgos, recuperar volumen y revitalizar la piel con resultados naturales.
        </p>
      </div>

      <section className="service-page-container section-padding">
        <div className="container">
          {servicesData.map((service, index) => (
            <ServiceBlock
              key={service.id}
              service={service}
              isReversed={index % 2 !== 0}
              onLearnMore={handleOpenModal}
            />
          ))}
        </div>
      </section>

      <section className="technology-highlight section-padding">
        <div className="container">
          <h2>Equipamiento exclusivo</h2>
          <div className="technology-grid">
            {tecnologiaEstetica.map((item) => (
              <TechnologyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <QuickAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedService}
        category="Dermatologia Estetica"
      />
    </div>
  );
}

export default DermatologiaEstetica;
