import React, { useState } from 'react';
import QuickAssessmentModal from '../components/QuickAssessmentModal';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import './spa.css';

const corporalExperiences = [
  {
    id: 'contour-sculpt',
    title: 'Contour Sculpt 360',
    shortDescription: 'Moldeamiento combinado con criolipolisis selectiva y radiofrecuencia.',
    description:
      'Ideal para quienes buscan redefinir contornos sin cirugia. Integra criolipolisis selectiva, lipolaser y radiofrecuencia tripolar para reducir grasa localizada y tonificar.',
    media: {
      type: 'image',
      src: '/img/laser.jpg',
      alt: 'Moldeamiento corporal no invasivo',
    },
    metrics: [
      { label: 'Duracion', value: '90 min' },
      { label: 'Downtime', value: '48 h de cuidado' },
    ],
    highlights: [
      'Criolipolisis dual en zonas clave',
      'Radiofrecuencia tripolar para tensado',
      'Drenaje linfatico asistido',
    ],
    technology: [
      'Criolipolisis controlada a -5 C',
      'Radiofrecuencia tripolar 1 MHz',
      'Drenaje linfatico con presoterapia secuencial',
    ],
    steps: [
      'Medicion digital y marcacion de zonas objetivo',
      'Aplicacion de criolipolisis con monitoreo termico',
      'Radiofrecuencia y masaje modelador',
      'Drenaje y pauta domiciliaria especifica',
    ],
    addOns: ['Plataforma vibratoria post sesion', 'Suplemento drenante', 'Chequeo medico en 30 dias'],
  },
  {
    id: 'firm-body-up',
    title: 'Firm Body Up',
    shortDescription: 'Plan reafirmante con Emszero, colageno y corrientes rusas.',
    description:
      'Tratamiento progresivo para recuperar tonicidad tras cambios de peso o post parto. Trabaja musculo y piel con energia electromagnetica focalizada y colageno.',
    media: {
      type: 'image',
      src: '/img/lesionescutaneas.png',
      alt: 'Reafirmacion corporal integral',
    },
    metrics: [
      { label: 'Duracion', value: '75 min' },
      { label: 'Frecuencia', value: '1 vez por semana' },
    ],
    highlights: [
      'Sesion con Emszero para contracciones profundas',
      'Radiofrecuencia con colageno topico',
      'Masaje redensificante con bambu',
    ],
    technology: [
      'Emszero HI-EMT',
      'Radiofrecuencia con colageno hidrolizado',
      'Corrientes rusas para tonificacion',
    ],
    steps: [
      'Diagnostico volumetrico y fotografia 3D',
      'Sesion HI-EMT en grupos musculares clave',
      'Radiofrecuencia con principios activos reafirmantes',
      'Masaje remodelante y plan de ejercicios guiado',
    ],
    addOns: ['Body wrap termoactivo', 'Ampolla de colageno bebible', 'Seguimiento virtual quincenal'],
  },
  {
    id: 'detox-balance',
    title: 'Detox Balance',
    shortDescription: 'Ritual desintoxicante con maderoterapia, infrarrojo y relajacion sensorial.',
    description:
      'Experiencia holistica que libera tensiones, mejora circulacion y favorece la eliminacion de toxinas mediante maderoterapia y envolturas termales.',
    media: {
      type: 'image',
      src: '/img/consultorio2.png',
      alt: 'Ritual detox corporal',
    },
    metrics: [
      { label: 'Duracion', value: '80 min' },
      { label: 'Sensacion', value: 'Spa inmersivo' },
    ],
    highlights: [
      'Masaje con maderoterapia drenante',
      'Envoltura termal con barros ricos en minerales',
      'Sonido inmersivo y aromaterapia calmante',
    ],
    technology: [
      'Infrarrojo lejano para detox',
      'Maderoterapia profesional',
      'Experiencia sonora binaural',
    ],
    steps: [
      'Respiracion guiada y descompresion sensorial',
      'Exfoliacion seca y maderoterapia drenante',
      'Envoltura termal con barros y sales del Himalaya',
      'Infusion herbal y recomendacion de autocuidado',
    ],
    addOns: ['Flotarium de magnesio', 'Masaje craneofacial relajante', 'Kit detox para casa'],
  },
];

function SpaCorporal() {
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
          <p className="spa-section__eyebrow">Spa Corporal</p>
          <h2>Moldeamos, tonificamos y equilibramos tu cuerpo</h2>
          <p className="spa-section__description">
            Programas integrales que sincronizan aparatologia de ultima generacion con rituales sensoriales para esculpir, reafirmar y liberar tensiones.
          </p>
        </header>

        <SpaExperienceShowcase
          experiences={corporalExperiences}
          categoryLabel="Spa Corporal"
          onOpenAssessment={handleOpenAssessment}
        />
      </div>

      <QuickAssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedExperience}
        category="Spa Corporal"
      />
    </section>
  );
}

export default SpaCorporal;
