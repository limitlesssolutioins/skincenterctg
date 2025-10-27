import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './spa.css';

const spaSections = [
  { path: 'facial', label: 'Facial', tagline: 'Glow inmediato y renovación profunda' },
  { path: 'capilar', label: 'Capilar', tagline: 'Fortalecimiento y regeneración del cuero cabelludo' },
  { path: 'corporal', label: 'Corporal', tagline: 'Moldeamiento, tonificación y bienestar integral' },
  { path: 'laser', label: 'Laser', tagline: 'Tecnología de alta precisión para resultados visibles' },
];

const SpaLayout = ({ openModal }) => {
  useEffect(() => {
    const body = document.body;
    const updateOffset = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        body.style.setProperty('--spa-navbar-offset', `${navbar.offsetHeight}px`);
      }
    };

    body.classList.add('spa-layout-mounted');
    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => {
      body.classList.remove('spa-layout-mounted');
      body.style.removeProperty('--spa-navbar-offset');
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <div className="spa-layout">
      <section className="spa-hero">
        <div className="spa-hero__media" aria-hidden="true">
          <div className="spa-hero__backdrop" />
        </div>
        <div className="spa-hero__overlay" />
        <div className="spa-hero__content container">
          <p className="spa-hero__kicker">Spa Dermatológico</p>
          <h1>Experiencias inmersivas para transformar tu piel</h1>
          <p className="spa-hero__lead">
            Protocolos sensoriales creados por especialistas dermatológicos que combinan aparatología de última generacion,
            formulas exclusivas y técnicas manuales para un cuidado integral.
          </p>
          <div className="spa-hero__actions" role="tablist">
            {spaSections.map((section) => (
              <NavLink
                key={section.path}
                to={section.path}
                className={({ isActive }) => `spa-hero__card${isActive ? ' is-active' : ''}`}
              >
                <span className="spa-hero__card-label">{section.label}</span>
                <span className="spa-hero__card-tagline">{section.tagline}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <nav className="spa-nav">
        <div className="container spa-nav__inner">
          {spaSections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) => `spa-nav__link${isActive ? ' is-active' : ''}`}
              end
            >
              <span className="spa-nav__label">{section.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="spa-outlet">
        <Outlet context={{ openModal }} />
      </div>
    </div>
  );
};

export default SpaLayout;
