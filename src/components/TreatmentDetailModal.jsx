import React from 'react';
import QuickAssessmentForm from './QuickAssessmentForm';
import './treatmentDetailModal.css';

const TreatmentDetailModal = ({ treatment, category, onClose }) => {
  if (!treatment) {
    return null;
  }

  const galleryImages = [treatment.image, treatment.image2].filter(Boolean);

  return (
    <div
      className="treatment-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-detail-title"
    >
      <div className="treatment-detail-modal">
        <button
          type="button"
          className="treatment-detail-modal__close"
          onClick={onClose}
          aria-label="Cerrar informacion del tratamiento"
        >
          &times;
        </button>

        <div className="treatment-detail-modal__body">
          <div className="treatment-detail-modal__info">
            {category && <p className="treatment-detail-modal__category">{category}</p>}
            <h2 id="treatment-detail-title">{treatment.title}</h2>
            <p className="treatment-detail-modal__description">
              {treatment.longDescription || treatment.description}
            </p>

            {Array.isArray(treatment.highlights) && treatment.highlights.length > 0 && (
              <ul className="treatment-detail-modal__highlights">
                {treatment.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {galleryImages.length > 0 && (
              <div className="treatment-detail-modal__gallery">
                {galleryImages.map((src, index) => (
                  <img
                    key={`${treatment.title}-${index}`}
                    src={src}
                    alt={`${treatment.title} referencia ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="treatment-detail-modal__form">
            <QuickAssessmentForm
              serviceName={treatment.title}
              category={category}
              heading="Agenda tu valoracion"
              headingId="embedded-assessment-title"
              layout="embedded"
              showCloseButton={false}
            />
          </div>
        </div>

        <div className="treatment-detail-modal__scroll-hint" aria-hidden="true">
          <span>Desliza para ver mas</span>
          <span className="treatment-detail-modal__scroll-hint-icon" />
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetailModal;
