import React from 'react';
import './tecnologias.css';

const technologyTimelineEvents = [
  {
    title: 'Luz Intensa Pulsada (IPL)',
    text:
      'Pulsos de luz de amplio espectro que corrigen manchas solares, melasma controlado, rosacea, fotoenvejecimiento y poros dilatados aportando luminosidad y uniformidad.',
    image: '/img/ipl.png',
  },
  {
    title: 'Black Peel',
    text:
      'Mascarilla de carbon activado combinada con energia laser para limpiar profundamente, controlar grasa y reducir puntos negros, brillo y textura irregular.',
    image: '/img/blackpeel.png',
  },
  {
    title: 'Laser CO2 Fraccionado',
    text:
      'Realiza micro columnas de energia que remueven capas superficiales y estimulan colageno nuevo para tratar cicatrices, arrugas profundas y manchas resistentes.',
    image: '/img/laserco2.png',
  },
  {
    title: 'Laser Picosegundo',
    text:
      'Pulsos ultrarrapidos en picosegundos que fragmentan pigmentos y tatuajes, mejoran melasma supervisado y realizan toning para brillo y textura uniforme.',
    image: '/img/picosegundo.png',
  },
  {
    title: 'Laser Diodo Facial',
    text:
      'Tecnologia confortable que estimula el metabolismo celular para rejuvenecer suavemente, equilibrar pieles mixtas/grasas y aportar luminosidad.',
    image: '/img/laserdiode.png',
  },
];

const Tecnologias = () => {
  return (
    <section className="trusted-by-section">
      <div className="container">
        <h2 className="technology-timeline-title">Tecnologias Laser y Luz Pulsada</h2>
        <p className="technology-timeline-subtitle">
          En SkinCenter cuidamos tu piel con plataformas de precision supervisadas por dermatologos para tratar manchas, cicatrices, fotoenvejecimiento y textura con resultados seguros y progresivos.
        </p>
        <div className="horizontal-timeline">
          {technologyTimelineEvents.map((event, index) => (
            <div key={event.title} className="timeline-event-card">
              <div className="event-content">
                <h3>{event.title}</h3>
                {event.image && <img src={event.image} alt={event.title} className="event-image" />}
                <p>{event.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;
