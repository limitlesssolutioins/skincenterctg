import React, { useState } from 'react';
import './tech-folio.css'; // Import the new styles

const TechFolioLayout = ({ services }) => {
  const [activeService, setActiveService] = useState(services[0]);

  if (!services || services.length === 0) {
    return <p>No hay servicios disponibles en esta categoría.</p>;
  }

  return (
    <div className="tech-folio-container">
      <aside className="tech-folio-sidebar">
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <button
                className={activeService.id === service.id ? 'active' : ''}
                onClick={() => setActiveService(service)}
              >
                {service.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="tech-folio-content">
        <div className="tech-folio-service-detail">
          <h2>{activeService.title}</h2>
          <p className="tagline">{activeService.tagline}</p>
          <img src={activeService.image} alt={activeService.title} />
          
          <div className="key-data-points">
            {activeService.keyPoints.map((point, index) => (
              <div key={index} className="key-data-point">
                <div className="icon">{point.icon}</div>
                <h4>{point.title}</h4>
                <p>{point.value}</p>
              </div>
            ))}
          </div>

          <div className="detailed-description">
            <p>{activeService.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TechFolioLayout;