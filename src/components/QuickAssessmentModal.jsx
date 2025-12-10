import React from 'react';
import './quickAssessmentModal.css';
import QuickAssessmentForm from './QuickAssessmentForm';

function QuickAssessmentModal({ isOpen, onClose, serviceName, category }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="assessment-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assessment-modal-title"
    >
      <QuickAssessmentForm
        serviceName={serviceName}
        category={category}
        onClose={onClose}
        heading="Formulario de Valoracion Rapida"
        headingId="assessment-modal-title"
        showCloseButton
      />
    </div>
  );
}

export default QuickAssessmentModal;
