import React, { useState, useEffect } from 'react';
import './cookieconsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
    // Optionally, implement logic to disable non-essential cookies here
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <p>
          Utilizamos cookies para mejorar su experiencia de navegación y analizar el tráfico de nuestro sitio. Al hacer clic en "Aceptar", usted acepta nuestro uso de cookies.
        </p>
        <div className="cookie-consent-buttons">
          <button onClick={handleAccept} className="accept-button">Aceptar</button>
          <button onClick={handleDecline} className="decline-button">Rechazar</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;