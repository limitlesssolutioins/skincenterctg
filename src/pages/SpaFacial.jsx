import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SpaExperienceShowcase from '../components/SpaExperienceShowcase';
import './spa.css';

const facialExperiences = [
  {
    id: 'glow-express',
    title: 'Glow Express 45',
    shortDescription: 'Reset luminoso en 45 minutos con hidrodermoabrasion y LED.',
    description:
      'Un ritual acelerado para devolver vitalidad a la piel antes de un evento o como mantenimiento. Combinamos exfoliacion controlada, infusion de activos concentrados y luz LED para sellar el resplandor.',
    media: {
      type: 'image',
      src: '/img/skinbooster.png',
      alt: 'Tratamiento glow express',
    },
    metrics: [
      { label: 'Duracion', value: '45 min' },
      { label: 'Recuperacion', value: 'Sin downtime' },
    ],
    highlights: [
      'Diagnostico express con mapping digital',
      'Hidrodermoabrasion dual con infusion de activos',
      'Mascarilla crioterapia y LED relax',
    ],
    technology: [
      'Oxygeneo hidrodermoabrasion',
      'Luz LED 590 nm',
      'Mascarilla hialuron booster',
    ],
    steps: [
      'Analisis rapido de piel con sensor de hidratacion',
      'Limpieza en dos fases y exfoliacion con punta de diamante',
      'Infusion pressurizada de vitaminas antioxidantes',
      'Mascarilla criogena y luz LED para sellar resultados',
    ],
    addOns: ['Masaje lifting con gua sha', 'Booster de acido hialuronico', 'Protector solar mineral personalizado'],
  },
  {
    id: 'clarity-antimanchas',
    title: 'Clarity Antimanchas',
    shortDescription: 'Protocolo intensivo para homogenizar tono y reducir pigmentaciones.',
    description:
      'Secuencia profesional que combina despigmentantes avanzados con energia controlada para suavizar melanina y unificar la piel sin irritacion.',
    media: {
      type: 'image',
      src: '/img/radiesse.png',
      alt: 'Ritual facial antimanchas',
    },
    metrics: [
      { label: 'Duracion', value: '70 min' },
      { label: 'Recuperacion', value: '24 h de cuidado' },
    ],
    highlights: [
      'Peeling quimico segmentado',
      'Microcorrientes para vehiculizar activos',
      'Luz pulsada suave para sellar',
    ],
    technology: [
      'Peeling dual con acido tranexamico',
      'Nanopore para vehiculizacion dirigida',
      'Luz pulsada modulada para manchas difusas',
    ],
    steps: [
      'Limpieza antioxidante y preparacion de la barrera',
      'Aplicacion de peeling progresivo en zonas objetivo',
      'Microperforacion controlada para infusion de activos',
      'Luz pulsada modulada y mascarilla calmante',
    ],
    addOns: ['Serum despigmentante domiciliario', 'Control medico en 15 dias', 'Refuerzo LED anti inflamatorio'],
  },
  {
    id: 'hydra-reset',
    title: 'Hydra Reset Premium',
    shortDescription: 'Hidratacion intensiva con bioestimulacion y masaje sensorial.',
    description:
      'Experiencia inmersiva que recarga agua, fortalece barrera y mejora elasticidad mediante infusion de acido hialuronico y masaje neurorelajante.',
    media: {
      type: 'image',
      src: '/img/toxina.png',
      alt: 'Hidratacion intensiva facial',
    },
    metrics: [
      { label: 'Duracion', value: '60 min' },
      { label: 'Sensacion', value: 'Efecto nube' },
    ],
    highlights: [
      'Limpieza en espuma enzimatica',
      'Infusion de skinboosters con dermapen',
      'Masaje neurorelajante y bruma termal',
    ],
    technology: [
      'Dermashine para microinyeccion indolora',
      'Skinbooster con acido hialuronico reticulado ligero',
      'Masaje sensorial con piedra fria',
    ],
    steps: [
      'Preparacion sensorial con aromaterapia y vapores suaves',
      'Microexfoliacion y activacion circulatoria',
      'Infusion de skinbooster hidratante en capas',
      'Mascarilla oclusionada y masaje craneofacial',
    ],
    addOns: ['Ampolla antioxidante', 'Radiofrecuencia tripolar', 'Sesion LED calmante 48h despues'],
  },
];

function SpaFacial() {
  const { openModal } = useOutletContext();

  const handleOpenAssessment = (experienceTitle) => {
    openModal(experienceTitle, "Spa Facial");
  };

  return (
    <section className="spa-section">
      <div className="container">
        <header className="spa-section__intro">
          <p className="spa-section__eyebrow">Spa Facial</p>
          <h2>Rituales sensoriales para un rostro radiante</h2>
          <p className="spa-section__description">
            Disenamos protocolos modulares segun el estado de tu piel, combinando tecnologias especializadas, dermocosmetica de alto desempeno y tecnicas manuales que activan los sentidos.
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
