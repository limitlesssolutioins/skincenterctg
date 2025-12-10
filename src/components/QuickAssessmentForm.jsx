import React, { useEffect, useState } from 'react';
import './quickAssessmentModal.css';

const defaultFormState = (serviceName = '') => ({
  fullName: '',
  identificationType: '',
  identificationNumber: '',
  email: '',
  phone: '',
  preferredTreatment: serviceName,
  primaryGoal: '',
  hasMedicalOrder: 'no',
  doctorName: '',
  details: '',
  consent: false,
});

function QuickAssessmentForm({
  serviceName = '',
  category = '',
  onClose,
  layout = 'modal',
  heading = 'Formulario de Valoracion Rapida',
  headingId = 'assessment-modal-title',
  showCloseButton = true,
}) {
  const [formData, setFormData] = useState(defaultFormState(serviceName));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData(defaultFormState(serviceName));
    setSubmitted(false);
  }, [serviceName, category]);

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
    if (onClose) {
      onClose();
    }
  };

  const successButtonLabel = onClose ? 'Cerrar' : 'Nueva solicitud';

  return (
    <div className={`assessment-modal ${layout === 'embedded' ? 'assessment-modal--embedded' : ''}`}>
      {showCloseButton && (
        <button
          type="button"
          className="assessment-modal__close"
          onClick={handleClose}
          aria-label="Cerrar formulario"
        >
          X
        </button>
      )}

      <header className="assessment-modal__header">
        {category && <p className="assessment-modal__category">{category}</p>}
        <h2 id={headingId}>{heading}</h2>
        {serviceName && (
          <p className="assessment-modal__service">
            Tratamiento de interes: <span>{serviceName}</span>
          </p>
        )}
      </header>

      {submitted ? (
        <div className="assessment-modal__success">
          <h3>Gracias por tu interes</h3>
          <p>
            Hemos recibido tu informacion. Nuestro equipo se comunicara contigo para continuar con la
            valoracion.
          </p>
          <button type="button" className="assessment-modal__button" onClick={handleClose}>
            {successButtonLabel}
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
              <label htmlFor="identificationType">Tipo de identificacion</label>
              <select
                id="identificationType"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="cc">Cedula de ciudadania</option>
                <option value="ce">Cedula de extranjeria</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </div>
            <div>
              <label htmlFor="identificationNumber">Numero de identificacion</label>
              <input
                id="identificationNumber"
                name="identificationNumber"
                type="text"
                value={formData.identificationNumber}
                onChange={handleChange}
                required
                placeholder="Ingresa el numero"
              />
            </div>
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
            <legend>Tiene orden medica para el tratamiento?</legend>
            <label>
              <input
                type="radio"
                name="hasMedicalOrder"
                value="no"
                checked={formData.hasMedicalOrder === 'no'}
                onChange={handleChange}
                required
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="hasMedicalOrder"
                value="yes"
                checked={formData.hasMedicalOrder === 'yes'}
                onChange={handleChange}
                required
              />
              Si
            </label>
          </fieldset>

          {formData.hasMedicalOrder === 'yes' && (
            <div className="assessment-form__group">
              <label htmlFor="doctorName">Nombre del medico que ordena</label>
              <input
                id="doctorName"
                name="doctorName"
                type="text"
                value={formData.doctorName}
                onChange={handleChange}
                required
                placeholder="Ingresa el nombre del medico"
              />
            </div>
          )}

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
            Solicitar Consulta
          </button>
        </form>
      )}
    </div>
  );
}

export default QuickAssessmentForm;
