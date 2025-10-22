import React, { useState, useMemo, useEffect } from 'react';
import './spaExperienceShowcase.css';

const SpaExperienceShowcase = ({ experiences = [], categoryLabel, onOpenAssessment }) => {
  const defaultActiveId = useMemo(
    () => (experiences.length > 0 ? experiences[0].id : null),
    [experiences]
  );

  const [activeId, setActiveId] = useState(defaultActiveId);

  useEffect(() => {
    if (experiences.length === 0) {
      setActiveId(null);
      return;
    }

    const matchesCurrent = experiences.find((experience) => experience.id === activeId);
    if (!matchesCurrent) {
      setActiveId(experiences[0].id);
    }
  }, [experiences, activeId]);

  if (experiences.length === 0) {
    return null;
  }

  const activeExperience = experiences.find((experience) => experience.id === activeId) || experiences[0];

  const handleSelect = (id) => {
    setActiveId(id);
  };

  const handleRequestAssessment = (title) => {
    if (typeof onOpenAssessment === 'function') {
      onOpenAssessment(title);
    }
  };

  const renderMedia = (experience) => {
    if (!experience || !experience.media) {
      return null;
    }

    if (experience.media.type === 'video') {
      return (
        <video
          className="spa-experience-detail__video"
          poster={experience.media.poster}
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={experience.media.src} type="video/mp4" />
          Tu navegador no soporta la reproduccion de video.
        </video>
      );
    }

    return (
      <img
        className="spa-experience-detail__image"
        src={experience.media.src}
        alt={experience.media.alt || experience.title}
      />
    );
  };

  return (
    <div className="spa-experience-showcase">
      <div className="spa-experience-grid">
        {experiences.map((experience) => {
          const isActive = experience.id === activeId;
          const backgroundImage = experience.media?.poster || experience.media?.src || '';

          return (
            <button
              key={experience.id}
              type="button"
              className={`spa-experience-card${isActive ? ' is-active' : ''}`}
              onClick={() => handleSelect(experience.id)}
              aria-pressed={isActive}
            >
              <div
                className="spa-experience-card__face spa-experience-card__face--front"
                style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
              >
                <div className="spa-experience-card__overlay" />
                <div className="spa-experience-card__content">
                  <p className="spa-experience-card__category">{categoryLabel}</p>
                  <h3>{experience.title}</h3>
                  <p className="spa-experience-card__summary">{experience.shortDescription}</p>
                  {experience.metrics && (
                    <ul className="spa-experience-card__metrics">
                      {experience.metrics.map((metric) => (
                        <li key={metric.label}>
                          <span className="metric-label">{metric.label}</span>
                          <span className="metric-value">{metric.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {experience.highlights && experience.highlights.length > 0 && (
                <div className="spa-experience-card__face spa-experience-card__face--back">
                  <div className="spa-experience-card__back-content">
                    <h4>Incluye</h4>
                    <ul>
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <span className="spa-experience-card__hint">Toca para descubrir la experiencia completa</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {activeExperience && (
        <div className="spa-experience-detail">
          <div className="spa-experience-detail__media">
            {renderMedia(activeExperience)}
          </div>

          <div className="spa-experience-detail__body">
            <div className="spa-experience-detail__header">
              <p className="spa-experience-detail__eyebrow">{categoryLabel}</p>
              <h2>{activeExperience.title}</h2>
              <p className="spa-experience-detail__lead">{activeExperience.description}</p>
            </div>

            <div className="spa-experience-detail__grid">
              {activeExperience.technology && activeExperience.technology.length > 0 && (
                <div className="spa-experience-detail__panel">
                  <h3>Tecnologia protagonista</h3>
                  <ul>
                    {activeExperience.technology.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeExperience.steps && activeExperience.steps.length > 0 && (
                <div className="spa-experience-detail__panel">
                  <h3>Ruta de la experiencia</h3>
                  <ol>
                    {activeExperience.steps.map((step, index) => (
                      <li key={`${activeExperience.id}-step-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {activeExperience.addOns && activeExperience.addOns.length > 0 && (
                <div className="spa-experience-detail__panel">
                  <h3>Potencia tu ritual</h3>
                  <ul>
                    {activeExperience.addOns.map((addOn) => (
                      <li key={addOn}>{addOn}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="button"
              className="spa-experience-detail__cta"
              onClick={() => handleRequestAssessment(activeExperience.title)}
            >
              Solicitar valoracion rapida
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaExperienceShowcase;
