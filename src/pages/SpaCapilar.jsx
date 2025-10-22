import React, { useState } from 'react';
import QuickAssessmentModal from '../components/QuickAssessmentModal';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import './spa.css';

const capilarExperiences = [
  {
    id: 'follicle-reactivation',
    title: 'Follicle Reactivation',
    shortDescription: 'Mesoterapia estimulante con nanopore y luz roja para activar el foliculo.',
    description:
      'Programa intensivo para frenar la caida, reforzar el tallo y reactivar el foliculo mediante microinyecciones de activos, nanopore y fototerapia.',
    media: {
      type: 'image',
      src: '/img/laser.jpg',
      alt: 'Mesoterapia capilar en cabina',
    },
    metrics: [
      { label: 'Duracion', value: '60 min' },
      { label: 'Frecuencia', value: 'Cada 15 dias' },
    ],
    highlights: [
      'Diagnostico capilar con microcamara',
      'Mesoterapia biotina y aminoacidos',
      'Luz LED roja para sellar',
    ],
    technology: [
      'Nanopore para vehiculizacion profunda',
      'Mesoterapia con vitaminas y factores de crecimiento',
      'LED roja 660 nm para bioestimulo',
    ],
    steps: [
      'Tricoscopia digital y mapeo de densidad',
      'Exfoliacion detox con acido salicilico',
      'Mesoterapia con microinyecciones indoloras',
      'LED roja y masaje relajante con aceites de menta',
    ],
    addOns: ['Ampolla domiciliaria anti caida', 'Plan nutricional capilar', 'Seguimiento medico bimestral'],
  },
  {
    id: 'oxygen-boost',
    title: 'Oxygen Boost Capilar',
    shortDescription: 'Carboxiterapia y infusiones oxigenantes para cuero cabelludo fatigado.',
    description:
      'Ideal para cueros cabelludos asfixiados o con caspa seca. Reoxigena tejidos, mejora la microcirculacion y equilibra la produccion de sebo.',
    media: {
      type: 'image',
      src: '/img/equipo2.png',
      alt: 'Carboxiterapia capilar',
    },
    metrics: [
      { label: 'Duracion', value: '50 min' },
      { label: 'Sensacion', value: 'Efecto fresco' },
    ],
    highlights: [
      'Carboxiterapia fraccionada',
      'Mascarilla carbon detox',
      'Masaje shiatsu capilar',
    ],
    technology: [
      'Carbohair con CO2 medico',
      'Infusion de minerales y niacinamida',
      'Masaje shiatsu con vibroterapia',
    ],
    steps: [
      'Limpieza micelar antibacterial',
      'Aplicacion de CO2 fraccionado en zonas clave',
      'Mascarilla espumosa detox y masaje con piedras frias',
      'Tonico equilibrante y sellado LED azul',
    ],
    addOns: ['Peeling enzimatico capilar', 'Suero calmante post tratamiento', 'Kit domiciliario detox'],
  },
  {
    id: 'home-tech-plan',
    title: 'Home Tech Plan',
    shortDescription: 'Asesoramiento para uso domiciliario de dispositivos laser combinados con cabina.',
    description:
      'Integramos sesiones en cabina con protocolos guiados para dispositivos domiciliarios como iGrow, logrando continuidad terapeutica y resultados visibles.',
    media: {
      type: 'image',
      src: '/img/equipo1.png',
      alt: 'Plan capilar con tecnologia en casa',
    },
    metrics: [
      { label: 'Duracion', value: '40 min' },
      { label: 'Seguimiento', value: '30 dias' },
    ],
    highlights: [
      'Sesion demostrativa con dispositivo laser',
      'Aplicacion de activos estimulantes',
      'Plan domiciliario personalizado',
    ],
    technology: [
      'Laser de baja frecuencia LLLT',
      'Ampollas con peptidos y factores de crecimiento',
      'App de seguimiento con recordatorios',
    ],
    steps: [
      'Evaluacion del patron de caida y objetivos',
      'Sesion en cabina con laser y infusion de activos',
      'Entrenamiento para uso domiciliario seguro',
      'Chequeo virtual a los 30 dias para ajustes',
    ],
    addOns: ['Tiempo adicional de coaching', 'Suplementacion especifica', 'Bloqueador termico protector'],
  },
];

function SpaCapilar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('');

  const handleOpenAssessment = (experienceTitle) => {
    setSelectedExperience(experienceTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience('');
  };

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Capilar</p>
          <h2>Fortalecemos tu cabello desde el foliculo</h2>
          <p className="spa-section__description">
            Protocolos que combinan ciencia tricologica, aparatologia y bienestar sensorial para recuperar densidad, brillo y salud capilar a largo plazo.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={capilarExperiences}
          categoryLabel="Spa Capilar"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>

      <QuickAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedExperience}
        category="Spa Capilar"
      />
    </section>
  );
}

export default SpaCapilar;
