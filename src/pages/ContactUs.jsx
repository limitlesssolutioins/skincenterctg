import React, { useState } from "react";
import "./contactus.css";
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    alert("Mensaje enviado. Gracias por contactarnos.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-us-page">
      <div className="container">
        <h1 className="page-title">Contáctanos</h1>
      </div>

      {/* Main Content Section */}
      <section className="contact-main-section section-padding">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Contact Info */}
            <div className="contact-details-wrapper">
              <h2>Información de Contacto</h2>
              <p>Si tienes alguna pregunta o deseas agendar una cita, no dudes en contactarnos a través de los siguientes medios.</p>
              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-info-icon" />
                <div>
                  <h4>Nuestra Ubicación</h4>
                  <p>Calle 123 # 45-67, Cartagena, Colombia</p>
                </div>
              </div>
              <div className="contact-info-item">
                <FaPhone className="contact-info-icon" />
                <div>
                  <h4>Teléfonos</h4>
                  <p><a href="tel:+5751234567">+57 (5) 123 4567</a> / <a href="tel:+573001234567">+57 300 123 4567</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <FaEnvelope className="contact-info-icon" />
                <div>
                  <h4>Correo Electrónico</h4>
                  <p><a href="mailto:info@dermatologico.com">info@dermatologico.com</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <FaClock className="contact-info-icon" />
                <div>
                  <h4>Horarios de Atención</h4>
                  <p>Lunes a Viernes: 9:00 AM - 6:00 PM<br/>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Envíanos un Mensaje</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.678923456789!2d-75.500000!3d10.400000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAuNDAwMDAwLCAtNzUuNTAwMDAw!5e0!3m2!1ses!2sco!4v1678901234567!5m2!1ses!2sco"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de la Clínica"
        ></iframe>
      </section>
    </div>
  );
}

export default ContactUs;
