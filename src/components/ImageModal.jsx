import React from 'react';
import './imagemodal.css';

function ImageModal({ isOpen, onClose, imageSrc, description }) {

  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <img src={imageSrc} alt={description} className="modal-image" />
        <p className="modal-description">{description}</p>
      </div>
    </div>
  );
}

export default ImageModal;
