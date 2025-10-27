import React from 'react';
import './tecnologias.css';

const technologyTimelineEvents = [
  {
    year: "2018",
    title: "Inauguración y Primeros Equipos Láser",
    text: "SkinCenter Cartagena abre sus puertas con tecnología láser de vanguardia para tratamientos dermatológicos iniciales, marcando el inicio de nuestro compromiso con la innovación.",
    image: "/img/laser.jpg",
  },
  {
    year: "2020",
    title: "Adopción de Plataformas de Gestión Digital",
    text: "Implementamos sistemas de gestión digital (como Justxt) para optimizar la experiencia del paciente, desde la programación de citas hasta el seguimiento post-tratamiento.",
    image: "/src/assets/img/justxt.png",
  },
  {
    year: "2022",
    title: "Expansión en Dermatología Estética Avanzada",
    text: "Incorporamos equipos especializados para tratamientos estéticos avanzados, incluyendo nuevas técnicas de rejuvenecimiento y mejora de la piel, consolidando nuestra oferta integral.",
    image: "/img/equipo1.png", // Usar una imagen de equipo genérica
  },
  {
    year: "2024",
    title: "Integración de IA y Asistencia Virtual (Lia)",
    text: "Lanzamiento de nuestra asesora virtual Lia, impulsada por IA, para ofrecer atención 24/7 y orientación personalizada, mejorando la accesibilidad y el soporte al paciente.",
    image: "/src/assets/img/logonobg.png", // Usar el logo del chatbot
  },
  {
    year: "2025",
    title: "Innovación Continua y Personalización",
    text: "Continuamos invirtiendo en las últimas tecnologías y en la personalización de tratamientos, asegurando que cada paciente reciba la atención más avanzada y adaptada a sus necesidades.",
    image: "/src/assets/img/skincenterlogo.png", // Usar el logo de SkinCenter
  },
];

const Tecnologias = () => {
  return (
    <section className="trusted-by-section">
      <div className="container">
        <h2 className="technology-timeline-title">Nuestras Tecnologías</h2>
        <div className="horizontal-timeline">
          {technologyTimelineEvents.map((event, index) => (
            <div key={index} className="timeline-event-card">
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
