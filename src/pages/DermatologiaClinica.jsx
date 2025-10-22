import React, { useState } from 'react';
import QuickAssessmentModal from '../components/QuickAssessmentModal';
import './dermatologia.css';

const tratamientosMedicosData = [
  {
    id: 1,
    title: 'Consulta Dermatologica',
    description: 'Evaluacion medica integral para el diagnostico y tratamiento de enfermedades de la piel, pelo y unas con un plan de manejo personalizado.',
    image: '/img/oficinadra.png',
  },
  {
    id: 2,
    title: 'Control Dermatologico',
    description: 'Seguimiento riguroso de los tratamientos prescritos para asegurar su eficacia, ajustar dosis y monitorear la evolucion de las condiciones cutaneas.',
    image: '/img/equipo2.png',
  },
  {
    id: 3,
    title: 'Reseccion de Lesiones Cutaneas',
    description: 'Extirpacion quirurgica de lesiones benignas o malignas con tecnicas precisas para resultados funcionales y esteticos.',
    image: '/img/lesionescutaneas.png',
  },
  {
    id: 4,
    title: 'Infiltracion Medica',
    description: 'Aplicacion directa de medicamentos en la piel para tratar condiciones como alopecia areata, cicatrices queloides o procesos inflamatorios.',
    image: '/img/infiltraciones.png',
  },
  {
    id: 5,
    title: 'Biopsia de Piel',
    description: 'Procedimiento diagnostico que permite confirmar condiciones complejas mediante analisis histopatologico.',
    image: '/img/biopsia.png',
  },
];

const tecnologiaClinica = [
  {
    id: 1,
    name: 'Dermatoscopia Digital',
    description: 'Analisis de lesiones pigmentadas con imagenes de alta resolucion para un diagnostico temprano y preciso.',
  },
  {
    id: 2,
    name: 'Laboratorio de Patologia',
    description: 'Interpretacion histologica especializada que respalda decisiones terapeuticas seguras.',
  },
  {
    id: 3,
    name: 'Laser de Colorante Pulsado',
    description: 'Tecnologia especifica para lesiones vasculares y marcas post inflamatorias con tiempos cortos de recuperacion.',
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

function DermatologiaClinica() {
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
        <h1 className="page-title">Dermatologia Clinica</h1>
        <p className="page-subtitle">
          Diagnostico especializado y tratamientos avanzados respaldados por tecnologia de ultima generacion.
        </p>
      </div>

      <section className="service-page-container section-padding">
        <div className="container">
          {tratamientosMedicosData.map((service, index) => (
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
          <h2>Tecnologia al servicio de la piel</h2>
          <div className="technology-grid">
            {tecnologiaClinica.map((item) => (
              <TechnologyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <QuickAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedService}
        category="Dermatologia Clinica"
      />
    </div>
  );
}

export default DermatologiaClinica;
