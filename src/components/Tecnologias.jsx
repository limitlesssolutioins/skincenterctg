import React from 'react';
import './tecnologias.css';

const Tecnologias = () => {
  return (
    <section className="trusted-by-section">
      <div className="container">
        <h2 className="trusted-by-title">Nuestra Tecnología y Equipamiento</h2>
        <div className="trusted-by-logos">
          <img src="/img/laser.jpg" alt="Laser Technology" style={{ height: '60px', width: 'auto' }} />
          <img src="/img/laserr.png" alt="Laser Technology" style={{ height: '60px', width: 'auto' }} />
          <img src="/img/technology.jpg" alt="Dermatology Technology" style={{ height: '60px', width: 'auto' }} />
          <img src="/src/assets/img/justxt.png" alt="Justxt Logo" style={{ height: '60px', width: 'auto' }} />
          <img src="/src/assets/img/logonobg.png" alt="Logo" style={{ height: '60px', width: 'auto' }} />
          <img src="/src/assets/img/skincenterlogo.png" alt="Skin Center Logo" style={{ height: '60px', width: 'auto' }} />
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;
