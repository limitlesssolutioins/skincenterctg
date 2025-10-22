import React, { useEffect, useMemo } from "react";
import "./nosotros.css";
import { Timeline } from "../components/Timeline";
import doctorImage from "../assets/img/dradiana.png";

const timelineEvents = [
  {
    year: "Nuestra Mision",
    text: "Ser una empresa dedicada a la prestacion de servicios medicos generales y especializados, brindando una excelente atencion a nuestros usuarios, para lo cual contamos con recurso humano idoneo y capacitado, tecnologia avanzada, excelente infraestructura y procesos de calidad que conllevan a la mejora continua.",
    image: "/img/consultorio1.png",
  },
  {
    year: "Nuestra Vision",
    text: "Para el 2028, proyectamos ser una empresa reconocida a nivel regional y nacional por la calidad y eficiencia en la prestacion de los servicios medicos y especializados, caracterizada por el compromiso y competencia del talento humano y la disponibilidad de herramientas necesarias para lograr la satisfaccion de nuestros pacientes.",
    image: "/img/consultorio2.png",
  },
  {
    year: "Liderazgo y Experiencia",
    text: "Liderado por nuestra Dermatologa Dra. Diana Carolina Carrasquilla Ruiz, profesional con alta experiencia, en actualizacion permanente y excelente reconocimiento a nivel nacional. Especialidades: Dermatologia clinica, cosmetica, cirugia dermatologica y terapias laser.",
    image: doctorImage,
  },
  {
    year: "Nuestros Valores",
    text: "- Pensamos en los demas\n- Pasion y alegria\n- Humildad\n- Autonomia\n- Profesionalismo\n- Respeto",
    image: "/img/equipo1.png",
  },
];

const quoteText = "Somos lo que hacemos dia a dia. De modo que la excelencia no es un acto aislado sino un habito";

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

  const signaturePath = useMemo(() => {
    let path = "";
    let x = 0;
    let y = 50;

    quoteText.split("").forEach((_, index) => {
      const amplitude = 6 + Math.random() * 10;
      const width = 20 + Math.random() * 25;
      const controlX = x + width / 2;
      const controlY = y - amplitude;
      const endX = x + width;
      const endY = 50 + (Math.random() > 0.5 ? amplitude / 2 : -amplitude / 2);

      if (index === 0) {
        path += M ;
      }

      path +=  Q   ;
      x = endX;
      y = endY;
    });

    return path;
  }, []);

  return (
    <div className="nosotros-page">
      <section className="page-header-section">
        <div className="particle-layer" aria-hidden="true">
          {particlesConfig.map((particle, index) => (
            <span
              key={index}
              className="particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="handwriting-mask" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid slice">
              <path className="handwriting-path" d={signaturePath} />
            </svg>
          </div>

          <p className="subtitle animated-text">"{quoteText}"</p>
          <p className="author animated-author">Aristoteles</p>
        </div>
      </section>

      <section className="timeline-section section-padding">
        <div className="container">
          <h2 className="text-center section-title">Nuestra Filosofia</h2>
          <Timeline events={timelineEvents} />
        </div>
      </section>
    </div>
  );
}

export default Nosotros;

