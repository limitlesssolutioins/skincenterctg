import React, { useState, useEffect } from 'react';
import './hero.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    id: "luminosidad",
    title: "Luminosidad y manchas",
    headline: "Aclara el tono y devuelve brillo uniforme",
    summary:
      "Combinamos energia modulada y dermocosmetica de precision para tratar melasma leve, lentigos y piel opaca sin tiempos de baja prolongados.",
    metrics: {
      sessions: "3 a 4 sesiones",
      recovery: "24 horas",
      idealFor: "Manchas recientes y tono apagado",
    },
    image: "/img/equipo1.png",
  },
  {
    id: "acne",
    title: "Control de acne",
    headline: "Equilibrio de sebo, inflamacion y marcas",
    summary:
      "Protocolo integral que regula el microbioma, desinflama lesiones activas y trabaja cicatrices superficiales sin comprometer la barrera.",
    metrics: {
      sessions: "4 a 6 sesiones",
      recovery: "Sin baja laboral",
      idealFor: "Brotes moderados y piel grasa",
    },
    image: "/img/equipo2.png",
  },
  {
    id: "antiage",
    title: "Reafirmacion facial",
    headline: "Elasticidad, volumen y definicion",
    summary:
      "Tratamiento escalonado que estimula colageno, redefine el ovalo y mejora arrugas finas con equipos de alta precision.",
    metrics: {
      sessions: "1 sesion anual",
      recovery: "48 horas",
      idealFor: "Flacidez leve y arrugas dinamicas",
    },
    image: "/img/equipo3.png",
  },
  {
    id: "sensibilidad",
    title: "Piel sensible",
    headline: "Fortalece la barrera y calma rojeces",
    summary:
      "Rutina de cabina que estabiliza pieles reactivas con tecnologias suaves y activos reparadores de grado dermatologico.",
    metrics: {
      sessions: "3 sesiones mensuales",
      recovery: "Sin baja",
      idealFor: "Rosacea y piel sensibilizada",
    },
    image: "/img/equipo4.png",
  },
];

export function Hero({ openModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="hero-carousel">
      <div className="hero-carousel__slide">
        <div className="hero-carousel__image">
          <img src={slide.image} alt={slide.title} />
        </div>
        <div className="hero-carousel__text">
          <h1>{slide.title}</h1>
          <h2>{slide.headline}</h2>
          <p>{slide.summary}</p>
          <div className="hero-carousel__metrics">
            <div className="metric">
              <span>Sesiones</span>
              <strong>{slide.metrics.sessions}</strong>
            </div>
            <div className="metric">
              <span>Recuperacion</span>
              <strong>{slide.metrics.recovery}</strong>
            </div>
            <div className="metric">
              <span>Ideal para</span>
              <strong>{slide.metrics.idealFor}</strong>
            </div>
          </div>
          <button className="cta-button" onClick={openModal}>
            Agenda tu cita
          </button>
        </div>
      </div>

      <button className="hero-carousel__control prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="hero-carousel__control next" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
}