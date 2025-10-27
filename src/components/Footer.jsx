import React from 'react';
import './footer.css';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer id="contacto" className="footer-section pt-12 pb-0">
      <div className="container footer-grid">
        <div className="footer-column">
          <h3>Clínica Dermatológica</h3>
          <p>Tu salud y belleza de la piel son nuestra prioridad. Ofrecemos tratamientos avanzados y personalizados para resultados excepcionales.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/skincenter_oficial?igsh=MncyM2w4dWc3ajlo" aria-label="Instagram"><FaInstagram size={24} /></a>
            <a href="https://www.facebook.com/share/1VCsvhNBdZ" aria-label="Facebook"><FaFacebookF size={24} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={24} /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>
          <div className="contact-details-horizontal">
            <p><FaMapMarkerAlt /> Urb. Providencia, Dg. 32 #71-53, Cartagena, Colombia</p>
            <p><FaPhone /> +57 (605) 441 8956</p>
            <p><FaEnvelope /> consulta@skincenterdc.com</p>
          </div>
        </div>

        

        <div className="footer-column">
          <h3>Ubicación</h3>
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1962.1727441292303!2d-75.47643525209996!3d10.394110403889435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625ad08934cd7%3A0x41c1bef04d7b4c62!2sSkinCenter%20Salud%20%26%20Bienestar!5e0!3m2!1sen!2sco!4v1761175697817!5m2!1sen!2sco" width="100%" height="200" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center py-2 text-xs sm:text-sm">
        <p className="whitespace-nowrap">
          &copy; {new Date().getFullYear()} Clínica Dermatológica. Todos los derechos reservados.&nbsp;
          <span className="mx-4 text-gray-400">|</span>&nbsp;
          Powered by{" "}
          <a href="https://limitlesscol.com" target="_blank" rel="noopener noreferrer"><strong>Limitless Solutions</strong></a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;