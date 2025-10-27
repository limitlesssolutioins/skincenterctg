import React, { useState } from 'react';
import './tratamientosinteractivos.css';
import facePng from '../assets/img/facepng.png';
import bodyPng from '../assets/img/cuerpo.png';
import TreatmentModal from './TreatmentModal';

// Data for the treatments linked to hotspot IDs
const treatmentsDataFacial = {
  forehead: {
    title: 'Toxina Botulínica',
    description: 'Toxina Botulínica: el secreto de una piel fresca y natural.\n\nLa toxina botulínica es uno de los tratamientos más efectivos para suavizar arrugas y prevenir su aparición, logrando un aspecto más descansado, joven y natural.\n\nSe aplica mediante microinyecciones en puntos estratégicos del rostro, relajando de forma temporal los músculos responsables de las arrugas sin alterar la expresión.\nEl procedimiento es rápido, seguro y prácticamente indoloro, ideal para quienes buscan resultados visibles sin cirugía ni tiempo de recuperación.\n\nBeneficios:\n\nSuaviza líneas de expresión y arrugas dinámicas (frente, entrecejo y patas de gallo).\n\nPreviene la formación de nuevas arrugas.\n\nResultados naturales y equilibrados.\n\nEfectos visibles desde los primeros días, con una duración de 4 a 6 meses.\n\n\nRecupera tu confianza y luce una piel más joven y relajada con un tratamiento personalizado y profesional.',
    link: '/servicios/toxina-botulinica'
  },
  eyes: {
    title: 'Contorno de Ojos Láser',
    description: 'El contorno de ojos es una de las zonas más delicadas y expresivas del rostro. Con el paso del tiempo, la piel pierde firmeza y aparecen ojeras, bolsas y líneas de expresión, dando una apariencia de cansancio.\nEn dermatología estética, contamos con tratamientos especializados para rejuvenecer la mirada y mejorar la calidad de la piel en esta área tan sensible.\n\nTratamientos más recomendados:\n\n1. Toxina botulínica: suaviza las líneas de expresión o “patas de gallo” y levanta sutilmente la mirada.\n\n2. Rellenos con ácido hialurónico: corrigen hundimientos y ojeras profundas, devolviendo volumen y frescura.\n\n3. Peelings químicos suaves o despigmentantes: mejoran el color oscuro de las ojeras y la textura de la piel.\n\n4. Luz pulsada o láser fraccionado: estimulan el colágeno, reducen pigmentaciones y tensan la piel del contorno.\n\nTratamientos tópicos dermatológicos personalizados: combinan activos como cafeína, retinol o péptidos para mantener la piel firme y luminosa.',
    link: '/servicios/laser'
  },
  cheeks: {
    title: 'Bioestimuladores Faciales',
    description: 'Los bioestimuladores faciales son tratamientos avanzados de medicina estética que ayudan a rejuvenecer la piel desde el interior, estimulando la producción natural de colágeno y elastina.\nA diferencia de los rellenos tradicionales, los bioestimuladores no buscan dar volumen inmediato, sino mejorar la calidad, firmeza y luminosidad de la piel de forma progresiva y natural.\n\n¿Cómo funcionan?\nSe aplican mediante microinyecciones en áreas como rostro, cuello, escote o manos.\nLos activos más utilizados son el ácido poliláctico (Sculptra®), la hidroxiapatita de calcio (Radiesse®) y la policaprolactona (Ellansé®).\nEstos compuestos estimulan las células de la piel (fibroblastos) para producir nuevo colágeno, generando un efecto tensor, reafirmante y revitalizante con resultados que mejoran con el tiempo.\n\nBeneficios de los bioestimuladores:\n\nReafirman y mejoran la elasticidad de la piel.\n\nAtenúan flacidez y arrugas finas.\n\nAportan luminosidad y textura más uniforme.\n\nResultados naturales y duraderos (hasta 18-24 meses).\n\nSin necesidad de cirugía ni tiempo de recuperación.',
    link: '/servicios/rellenos'
  },
  nose: {
    title: 'Rinomodelación',
    description: 'La rinomodelación es un tratamiento estético no quirúrgico que permite mejorar la forma y el perfil de la nariz sin necesidad de bisturí.\nSe realiza mediante la aplicación de ácido hialurónico, un relleno biocompatible que ayuda a armonizar el rostro, definir el perfil nasal y corregir pequeñas imperfeiones.\n\n💉 ¿Cómo funciona?\nEl ácido hialurónico se aplica en puntos estratégicos del dorso y la punta nasal para equilibrar proporciones, elevar ligeramente la punta o suavizar irregularidades. El procedimiento dura entre 20 y 30 minutos, y los resultados son inmediatos.',
    link: '/servicios/rinomodelacion'
  },
  lips: {
    title: 'Perfilado de Labios',
    description: 'El perfilado de labios es un procedimiento estético no quirúrgico que busca definir, hidratar y realzar el contorno natural de los labios mediante la aplicación de ácido hialurónico, un componente seguro y biocompatible presente de forma natural en nuestra piel.\n\nA diferencia del aumento de volumen, el perfilado se enfoca en resaltar los bordes del labio, mejorar su forma y simetría, y devolver la hidratación y suavidad perdidas con el tiempo, logrando un aspecto natural, armonioso y elegante.',
    link: '/servicios/perfilado-labios'
  },
  chin: {
    title: 'Marcación Mandibular',
    description: 'La marcación mandibular es un procedimiento estético no quirúrgico que permite definir y resaltar el contorno de la mandíbula, logrando un rostro más armónico, firme y estilizado.\nSe realiza mediante la aplicación de ácido hialurónico u otros rellenos dérmicos, que se colocan estratégicamente para dar proyección, simetría y definición a la línea mandibular y el mentón.',
    link: '/servicios/marcacion-mandibular'
  }
};

const treatmentsDataCorporal = {
  torso_superior: {
    title: 'Tratamiento Reafirmante de Torso',
    description: 'Mejora la firmeza y elasticidad de la piel en la zona del pecho y escote.',
    link: '/servicios/reafirmante-torso'
  },
  abdomen: {
    title: 'Criolipólisis Abdominal',
    description: 'Reduce la grasa localizada en el abdomen mediante la aplicación de frío controlado.',
    link: '/servicios/criolipolisis'
  },
  gluteos: {
    title: 'Levantamiento de Glúteos',
    description: 'Mejora la forma y tonicidad de los glúteos con tratamientos de bioestimulación.',
    link: '/servicios/levantamiento-gluteos'
  },
  piernas: {
    title: 'Tratamiento para Celulitis',
    description: 'Reduce la apariencia de la celulitis y mejora la textura de la piel en las piernas.',
    link: '/servicios/celulitis'
  }
};

const allTreatmentsData = { ...treatmentsDataFacial, ...treatmentsDataCorporal };

const FaceMap = ({ onHover, activeHotspot }) => {
    const hotspots = [
        { id: 'forehead', style: { top: '18%', left: '37%', width: '26%', height: '13%', borderRadius: '20px 20px 20px 20px' } },
        { id: 'eyes', style: { top: '39%', left: '25%', width: '16%', height: '8%', borderRadius: '50%' } },
        { id: 'eyes', style: { top: '39%', left: '59%', width: '16%', height: '7%', borderRadius: '50%' } },
        { id: 'cheeks', style: { top: '48%', left: '24%', width: '17%', height: '15%', borderRadius: '40%' } },
        { id: 'cheeks', style: { top: '48%', left: '59%', width: '17%', height: '15%', borderRadius: '40%' } },
        { id: 'nose', style: { top: '43%', left: '43%', width: '14%', height: '16%', borderRadius: '20px 20px 50% 50%' } },
        { id: 'lips', style: { top: '61%', left: '40%', width: '20%', height: '8%', borderRadius: '20px' } },
        { id: 'chin', style: { top: '70%', left: '40%', width: '20%', height: '7%', borderRadius: '30% 30% 100px 100px' } }
    ];

    return (
        <div className="image-map-container">
            <img src={facePng} alt="Mapa facial de tratamientos" className="face-image" />
            {hotspots.map((hotspot, index) => (
                <div
                    key={index}
                    className={`hotspot ${activeHotspot === hotspot.id ? 'active' : ''}`}
                    style={hotspot.style}
                    onMouseEnter={() => onHover(hotspot.id)}
                />
            ))}
        </div>
    );
};

const BodyMap = ({ onHover, activeHotspot }) => {
    const hotspots = [
        { id: 'cuello', style: { top: '15%', left: '43%', width: '15%', height: '8%' } },
        { id: 'torso_superior', style: { top: '25%', left: '40%', width: '20%', height: '8%' } },
        { id: 'abdomen', style: { top: '34%', left: '40%', width: '20%', height: '8%' } },
        { id: 'gluteos', style: { top: '42%', left: '40%', width: '20%', height: '10%' } },
        { id: 'piernas', style: { top: '60%', left: '38%', width: '26%', height: '18%' } }
    ];

    return (
        <div className="image-map-container">
            <img src={bodyPng} alt="Mapa corporal de tratamientos" className="face-image" />
            {hotspots.map((hotspot, index) => (
                <div
                    key={index}
                    className={`hotspot ${activeHotspot === hotspot.id ? 'active' : ''}`}
                    style={hotspot.style}
                    onMouseEnter={() => onHover(hotspot.id)}
                />
            ))}
        </div>
    );
};

const InfoPanel = ({ activeHotspot, onOpenModal }) => {
  const activeTreatment = allTreatmentsData[activeHotspot];

  if (!activeTreatment) {
    return (
      <div className="info-panel">
        <div className="info-panel-placeholder">
          <p>Selecciona las zonas del cuerpo para descubrir nuestros tratamientos estrella y cómo pueden ayudarte a realzar tu belleza.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-panel">
      <div className="treatment-card">
        <h3>{activeTreatment.title}</h3>
        <button onClick={() => onOpenModal(activeTreatment)} className="cta-button">Ver más</button>
      </div>
    </div>
  );
};

function TratamientosInteractivos() {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [view, setView] = useState('facial');
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const openModal = (treatment) => {
    setSelectedTreatment(treatment);
  };

  const closeModal = () => {
    setSelectedTreatment(null);
  };

  return (
    <section className="interactive-map-section">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Un Tratamiento para Cada Necesidad</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Nuestra tecnología y experiencia nos permiten ofrecer soluciones personalizadas. Explora interactivamente las áreas que te interesan y descubre el tratamiento ideal para ti.</p>
      </div>
      <div className="interactive-content-wrapper">
        <div className="map-controls">
          <button className={`map-control-button ${view === 'facial' ? 'active' : ''}`} onClick={() => setView('facial')}>Facial</button>
          <button className={`map-control-button ${view === 'corporal' ? 'active' : ''}`} onClick={() => setView('corporal')}>Corporal</button>
        </div>
        <div className="map-and-info-container" onMouseLeave={() => setActiveHotspot(null)}>
          <div className="image-map-wrapper">
            {view === 'facial' ? (
              <FaceMap onHover={setActiveHotspot} activeHotspot={activeHotspot} />
            ) : (
              <BodyMap onHover={setActiveHotspot} activeHotspot={activeHotspot} />
            )}
          </div>
          <InfoPanel activeHotspot={activeHotspot} onOpenModal={openModal} />
        </div>
      </div>
      <TreatmentModal treatment={selectedTreatment} onClose={closeModal} />
    </section>
  );
}

export default TratamientosInteractivos;