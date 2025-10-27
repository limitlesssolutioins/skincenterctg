import React from 'react';
import './hero.css';

export function Hero({ openModal }) {
  return (
    <section className="hero-static">
      <div className="hero-static__image">
        <img src="/img/portada.jpg" alt="Dra. Diana Carrasquilla" />
      </div>
      <div className="hero-static__text">
        <h1>Dra. Diana Carrasquilla</h1>
        <h2>Dermatología Estética y Clínica</h2>
        <p>Tu piel, nuestra pasión. Descubre tratamientos personalizados para una piel sana y radiante.</p>
        <button className="cta-button" onClick={() => openModal()}>
          Agenda tu cita
        </button>
      </div>
    </section>
  );
}