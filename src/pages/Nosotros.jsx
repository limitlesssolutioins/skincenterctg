import React, { useEffect, useMemo } from "react";
import "./nosotros.css";
import { Timeline } from "../components/Timeline";

const timelineEvents = [
  {
    year: "Nuestra Misión",
    text: "Ser una empresa dedicada a la prestación de servicios médicos generales y especializados, brindando una excelente atención a nuestros usuarios, para lo cual contamos con recurso humano idóneo y capacitado, tecnología avanzada, excelente infraestructura y procesos de calidad que conllevan a la mejora continua.",
  },
  {
    year: "Nuestra Visión",
    text: "Para el 2028, proyectamos ser una empresa reconocida a nivel regional y nacional por la calidad y eficiencia en la prestación de los servicios médicos y especializados, caracterizada por el compromiso y competencia del talento humano y la disponibilidad de herramientas necesarias para lograr la satisfacción de nuestros pacientes.",
  },
  {
    year: "Liderazgo y Experiencia",
    text: "Liderado por nuestra Dermatóloga Dra. Diana Carolina Carrasquilla Ruiz, profesional con alta experiencia, en actualización permanente y excelente reconocimiento a nivel nacional. Especialidades: Dermatología clínica, cosmética, cirugía dermatológica y terapias láser.",
  },
  {
    year: "Nuestros Valores",
    text: "- Pensamos en los demás\n- Pasión y alegría\n- Humildad\n- Autonomía\n- Profesionalismo\n- Respeto",
  },
];

const quoteText = "Somos lo que hacemos día a día. De modo que la excelencia no es un acto aislado sino un hábito";

const generateParticles = (count) =>
  Array.from({ length: count }).map(() => ({
    delay: (Math.random() * 10).toFixed(2),
    duration: (10 + Math.random() * 12).toFixed(2),
    left: (Math.random() * 100).toFixed(2),
    size: (4 + Math.random() * 4).toFixed(2),
  }));

const particlesConfig = generateParticles(24);

function Nosotros() {
  useEffect(() => {
    const body = document.body;

    const updateOffset = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        body.style.setProperty("--spa-navbar-offset", `${navbar.offsetHeight}px`);
      }
    };

    body.classList.add("spa-layout-mounted");
    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      body.classList.remove("spa-layout-mounted");
      body.style.removeProperty("--spa-navbar-offset");
      window.removeEventListener("resize", updateOffset);
    };
  }, []);



  return (
    <div className="nosotros-page">
      <section className="page-header-section">
        <div 
          className="background-image"
          style={{backgroundImage: `url(/img/nosotros1.jpeg)`}}
        >
          <div className="container">
            <p className="subtitle animated-text">"{quoteText}"</p>
            <p className="author animated-author">Aristóteles</p>
          </div>
        </div>
      </section>

      <section className="timeline-section section-padding">
        <div className="container">
          <h2 className="text-center section-title">Nuestra Filosofía</h2>
          <Timeline events={timelineEvents} />
        </div>
      </section>
    </div>
  );
}

export default Nosotros;

