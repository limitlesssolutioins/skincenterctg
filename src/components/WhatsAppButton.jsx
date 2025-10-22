import React from 'react';
import './whatsappbutton.css';
import { FaCommentDots } from 'react-icons/fa';

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573001234567" // Replace with your WhatsApp number
      className="whatsapp-widget"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat"
    >
      <FaCommentDots size={30} />
    </a>
  );
}

export default WhatsAppButton;