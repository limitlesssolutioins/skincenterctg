import React, { useState, useEffect } from 'react';
import './quickAssessmentModal.css';

const defaultFormState = (serviceName = '') => ({
  fullName: '',
  email: '',
  phone: '',
  preferredTreatment: serviceName,
  primaryGoal: '',
  skinSensitivity: '',
  details: '',
  consent: false,
});

function QuickAssessmentModal({ isOpen, onClose, serviceName, category }) {
  const [formData, setFormData] = useState(defaultFormState(serviceName));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultFormState(serviceName));
      setSubmitted(false);
    }
  }, [isOpen, serviceName]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setFormData(defaultFormState(serviceName));
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="assessment-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="assessment-modal-title">
      <div className="assessment-modal">
        <button type="button" className="assessment-modal__close" onClick={handleClose} aria-label="Cerrar formulario">X</button>
        <header className="assessment-modal__header">
          <p className="assessment-modal__category">{category}</p>
          <h2 id="assessment-modal-title">Formulario de Valoracion Rapida</h2>
          {serviceName && <p className="assessment-modal__service">Tratamiento de interes: <span>{serviceName}</span></p>}
        </header>

        {submitted ? (
          <div className="assessment-modal__success">
            <h3>Gracias por tu interes</h3>
            <p>Hemos recibido tu informacion. Nuestro equipo se comunicara contigo para continuar con la valoracion.</p>
            <button type="button" className="assessment-modal__button" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <form className="assessment-form" onSubmit={handleSubmit}>
            <div className="assessment-form__group">
              <label htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="assessment-form__group assessment-form__group--split">
              <div>
                <label htmlFor="email">Correo electronico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone">Telefono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="300 123 4567"
                />
              </div>
            </div>

            <div className="assessment-form__group">
              <label htmlFor="preferredTreatment">Tratamiento de interes</label>
              <input
                id="preferredTreatment"
                name="preferredTreatment"
                type="text"
                value={formData.preferredTreatment}
                onChange={handleChange}
                placeholder="Selecciona o describe el tratamiento"
              />
            </div>

            <div className="assessment-form__group">
              <label htmlFor="primaryGoal">Cual es tu objetivo principal?</label>
              <select
                id="primaryGoal"
                name="primaryGoal"
                value={formData.primaryGoal}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opcion</option>
                <option value="diagnostico">Diagnostico y tratamiento</option>
                <option value="prevencion">Prevencion y mantenimiento</option>
                <option value="mejora-estetica">Mejorar la apariencia de la piel</option>
                <option value="cicatrices">Reducir cicatrices o manchas</option>
                <option value="rejuvenecimiento">Rejuvenecimiento facial</option>
              </select>
            </div>

            <fieldset className="assessment-form__group">
              <legend>Como describirias la sensibilidad de tu piel?</legend>
              <label>
                <input
                  type="radio"
                  name="skinSensitivity"
                  value="baja"
                  checked={formData.skinSensitivity === 'baja'}
                  onChange={handleChange}
                  required
                />
                Baja
              </label>
              <label>
                <input
                  type="radio"
                  name="skinSensitivity"
                  value="media"
                  checked={formData.skinSensitivity === 'media'}
                  onChange={handleChange}
                  required
                />
                Media
              </label>
              <label>
                <input
                  type="radio"
                  name="skinSensitivity"
                  value="alta"
                  checked={formData.skinSensitivity === 'alta'}
                  onChange={handleChange}
                  required
                />
                Alta
              </label>
            </fieldset>

            <div className="assessment-form__group">
              <label htmlFor="details">Cuentanos mas sobre tu caso</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                placeholder="Describe antecedentes, tiempos o expectativas"
              ></textarea>
            </div>

            <label className="assessment-form__consent">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              Acepto ser contactado para continuar con la valoracion.
            </label>

            <button type="submit" className="assessment-modal__button">
              Enviar valoracion
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuickAssessmentModal;
