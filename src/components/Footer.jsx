import React from 'react';
import './footer.css';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-section pt-12 pb-0">
      <div className="container footer-grid">
        <div className="footer-column">
          <h3>Clínica Dermatológica</h3>
          <p>Tu salud y belleza de la piel son nuestra prioridad. Ofrecemos tratamientos avanzados y personalizados para resultados excepcionales.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><FaInstagram size={24} /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF size={24} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={24} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={24} /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>
          <p><FaMapMarkerAlt /> Calle 123 # 45-67, Cartagena, Colombia</p>
          <p><FaPhone /> +57 (5) 123 4567</p>
          <p><FaPhone /> +57 300 123 4567</p>
          <p><FaEnvelope /> info@dermatologico.com</p>
        </div>

        

        <div className="footer-column">
          <h3>Enlaces Útiles</h3>
          <ul>
            <li><a href="#">Térmenos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center py-2 text-xs sm:text-sm">
        <p className="whitespace-nowrap">
          &copy; {new Date().getFullYear()} Clínica Dermatológica. Todos los derechos reservados.&nbsp;
          <span className="mx-4 text-gray-400">|</span>&nbsp;
          Powered by{" "}
          <strong>Limitless Solutions</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;