import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './appointmentmodal.css';

import CustomSelect from './CustomSelect';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function AppointmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    identification: '',
    address: '',
    phone: '',
    email: '',
    reason: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data. WhatsApp integration will come later.
    console.log('Form Data Submitted:', formData);
    setIsSubmitted(true); // Set submitted to true
    setTimeout(() => {
      onClose(); // Close modal after a delay
      setIsSubmitted(false); // Reset for next open
      setFormData({
        name: '',
        identification: '',
        address: '',
        phone: '',
        email: '',
        reason: '',
      });
    }, 2000); // Close after 2 seconds
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={onClose}>&times;</button>
            {!isSubmitted ? (
              <>
                <h2>Agenda tu Consulta</h2>
                <motion.form
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.07 } },
                    hidden: {},
                  }}
                >
                  <motion.div variants={itemVariants} className="form-group">
                    <label htmlFor="name">Nombre Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="form-group">
                    <label htmlFor="identification">Identificación</label>
                    <input
                      type="text"
                      id="identification"
                      name="identification"
                      value={formData.identification}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="form-group">
                    <CustomSelect
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      label="Motivo de la Consulta"
                      options={[
                        { value: 'consultar_precio', label: 'Consultar precio' },
                        { value: 'agendar_cita', label: 'Agendar cita' },
                        { value: 'mas_informacion', label: 'Más información sobre tratamientos' },
                        { value: 'otra_solicitud', label: 'Otra solicitud' },
                      ]}
                      placeholder="Selecciona un motivo"
                    />
                  </motion.div>
                  <motion.button variants={itemVariants} type="submit" className="submit-button">Enviar Solicitud</motion.button>
                </motion.form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="success-message"
              >
                <h2>¡Gracias por tu solicitud!</h2>
                <p>Nos pondremos en contacto contigo a la brevedad.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppointmentModal;
