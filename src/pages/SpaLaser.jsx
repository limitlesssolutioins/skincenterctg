import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import './spa.css';

const laserExperiences = [
  {
    id: 'smooth-hair-free',
    title: 'Smooth Hair Free',
    shortDescription: 'Depilacion laser combinada con diagnostico dermatoscopico y enfriamiento inteligente.',
    description:
      'Experiencia premium de depilacion con evaluacion cromatica, tecnologia de diodo refrigerado y guia de cuidados para mantener la piel suave y protegida.',
    media: {
      type: 'image',
      src: '/img/laser.jpg',
      alt: 'Depilacion laser profesional',
    },
    metrics: [
      { label: 'Duracion', value: 'Segun zona' },
      { label: 'Downtime', value: 'Minimo' },
    ],
    highlights: [
      'Mapa dermatoscopico previo',
      'Laser diodo con enfriamiento',
      'Tratamiento calmante final',
    ],
    technology: [
      'Laser diodo refrigerado',
      'Dermatoscopia digital para evaluacion de lunares',
      'Serum calmante con niacinamida',
    ],
    steps: [
      'Valoracion de foto tipo y analisis de densidad de vello',
      'Sesion de laser con parametros personalizados',
      'Aplicacion de mascarilla calmante y protector mineral',
      'Plan domiciliario con guia de cuidados',
    ],
    addOns: ['Refuerzo LED anti irritacion', 'Kit post laser', 'Control medico para zonas sensibles'],
  },
  {
    id: 'clear-skin-laser',
    title: 'Clear Skin Laser',
    shortDescription: 'Resurfacing fraccionado suave para manchas, poros y cicatrices.',
    description:
      'Combinamos energia fraccionada, peelings ligeros y regeneradores celulares para renovar la textura de la piel sin tiempos prolongados de recuperacion.',
    media: {
      type: 'image',
      src: '/img/microagujas.png',
      alt: 'Resurfacing laser facial',
    },
    metrics: [
      { label: 'Duracion', value: '75 min' },
      { label: 'Recuperacion', value: '3 dias' },
    ],
    highlights: [
      'Peeling preparatorio de baja intensidad',
      'Laser fraccionado CO2 soft',
      'Serum regenerador con factores de crecimiento',
    ],
    technology: [
      'CO2 fraccionado de alta precision',
      'Black peel carbo para preparar la piel',
      'LED reparador 830 nm',
    ],
    steps: [
      'Analisis de textura y fotografia UV',
      'Peeling preparatorio para uniformar la superficie',
      'Pases de laser fraccionado en zonas objetivo',
      'Aplicacion de serum regenerador y LED calmante',
    ],
    addOns: ['Ampolla de factores de crecimiento', 'Crema barrera reparadora', 'Consulta de control en 10 dias'],
  },
  {
    id: 'lift-lux-therapies',
    title: 'Lift Lux Therapies',
    shortDescription: 'Sinergia HIFU, Indiba y oxigeno hiperbarico para efecto lifting no invasivo.',
    description:
      'Secuencia premium que redefine el ovalo facial y mejora flacidez con energia focalizada, radiofrecuencia y oxigeno presurizado.',
    media: {
      type: 'image',
      src: '/img/skinbooster.png',
      alt: 'Terapia laser lifting facial',
    },
    metrics: [
      { label: 'Duracion', value: '90 min' },
      { label: 'Resultado', value: 'Efecto tensor progresivo' },
    ],
    highlights: [
      'Mapeo ecografico previo',
      'HIFU de precision en capas musculares',
      'Indiba y oxigeno hiperbarico para recuperar',
    ],
    technology: [
      'HIFU multi profundidad',
      'Indiba proionic',
      'Oxigeno hiperbarico con sueros personalizados',
    ],
    steps: [
      'Marcacion ecografica y determinacion de vectores',
      'Aplicacion de HIFU en planos controlados',
      'Radiofrecuencia Indiba para estimular colageno',
      'Oxigeno hiperbarico para oxigenar y calmar',
    ],
    addOns: ['Mesoterapia de sosten', 'Terapia LED regeneradora', 'Control medico a 45 dias'],
  },
];

function SpaLaser() {
  const { openModal } = useOutletContext();

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Laser");
  };

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Laser</p>
          <h2>Tecnologia de precision para transformar la piel</h2>
          <p className="spa-section__description">
            Especialistas en energia lumica y termica que actuan por capas para depilacion definitiva, correccion de pigmento, textura y efecto lifting sin quirurgicos.
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
