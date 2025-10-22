import React, { useState } from 'react';
import './tratamientosinteractivos.css';
import facePng from '../assets/img/facepng.png';

// Data for the treatments linked to hotspot IDs
const treatmentsData = {
  forehead: {
    title: 'Toxina Botulínica',
    description: 'Relaja las arrugas de expresión en la frente y el entrecejo para una apariencia más lisa y rejuvenecida.',
    link: '/servicios/toxina-botulinica'
  },
  eyes: {
    title: 'Contorno de Ojos Láser',
    description: "Trata las 'patas de gallo' y mejora la textura de la piel delicada alrededor de los ojos.",
    link: '/servicios/laser'
  },
  cheeks: {
    title: 'Rellenos de Ácido Hialurónico',
    description: 'Devuelve el volumen a tus pómulos, define el contorno facial y suaviza los surcos nasogenianos.',
    link: '/servicios/rellenos'
  },
  nose: {
    title: 'Rinomodelación',
    description: 'Corrige y perfila la nariz sin cirugía, logrando una armonía facial inmediata.',
    link: '/servicios/rinomodelacion'
  },
  lips: {
    title: 'Perfilado de Labios',
    description: 'Define, hidrata y da volumen a tus labios de forma natural y equilibrada.',
    link: '/servicios/perfilado-labios'
  },
  chin: {
    title: 'Marcación Mandibular',
    description: 'Define el ángulo de la mandíbula y estiliza el mentón para un perfil más elegante y definido.',
    link: '/servicios/marcacion-mandibular'
  }
};

// The new FaceMap component using a PNG and positioned divs for hotspots
const FaceMap = ({ onHover, activeHotspot }) => {
    const hotspots = [
        { id: 'forehead', style: { top: '15%', left: '35%', width: '30%', height: '15%', borderRadius: '100px 100px 0 0' } },
        { id: 'eyes', style: { top: '36%', left: '23%', width: '18%', height: '10%', borderRadius: '50%' } },
        { id: 'eyes', style: { top: '36%', left: '59%', width: '18%', height: '10%', borderRadius: '50%' } },
        { id: 'cheeks', style: { top: '45%', left: '18%', width: '25%', height: '20%', borderRadius: '40%' } },
        { id: 'cheeks', style: { top: '45%', left: '57%', width: '25%', height: '20%', borderRadius: '40%' } },
        { id: 'nose', style: { top: '42%', left: '42%', width: '16%', height: '18%', borderRadius: '20px 20px 50% 50%' } },
        { id: 'lips', style: { top: '60%', left: '38%', width: '24%', height: '10%', borderRadius: '20px' } },
        { id: 'chin', style: { top: '72%', left: '39%', width: '22%', height: '12%', borderRadius: '30% 30% 100px 100px' } }
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

// The InfoPanel component remains the same
const InfoPanel = ({ activeHotspot }) => {
  const activeTreatment = treatmentsData[activeHotspot];

  if (!activeTreatment) {
    return (
      <div className="info-panel">
        <div className="info-panel-placeholder">
          <p>Pasa el ratón sobre las zonas del rostro para descubrir nuestros tratamientos estrella y cómo pueden ayudarte a realzar tu belleza.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-panel">
      <div className="treatment-card">
        <h3>{activeTreatment.title}</h3>
        <p>{activeTreatment.description}</p>
        <a href={activeTreatment.link} className="cta-button">Descubrir Más</a>
      </div>
    </div>
  );
};

// The main component orchestrating the map and info panel
function TratamientosInteractivos() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <section className="interactive-map-section">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Un Tratamiento para Cada Necesidad</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Nuestra tecnología y experiencia nos permiten ofrecer soluciones personalizadas. Explora interactivamente las áreas que te interesan y descubre el tratamiento ideal para ti.</p>
      </div>
      <div className="map-layout" onMouseLeave={() => setActiveHotspot(null)}>
        <FaceMap onHover={setActiveHotspot} activeHotspot={activeHotspot} />
        <InfoPanel activeHotspot={activeHotspot} />
      </div>
    </section>
  );
}

export default TratamientosInteractivos;
