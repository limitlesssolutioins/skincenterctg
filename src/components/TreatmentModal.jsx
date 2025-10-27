import React, { useState, useRef, useEffect } from 'react';
import './treatmentmodal.css';

const TreatmentModal = ({ treatment, onClose }) => {
  const [showScroll, setShowScroll] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const handleScroll = () => {
        const isScrolledToBottom = contentElement.scrollHeight - contentElement.scrollTop === contentElement.clientHeight;
        setShowScroll(!isScrolledToBottom);
      };

      // Initial check
      const isScrollable = contentElement.scrollHeight > contentElement.clientHeight;
      setShowScroll(isScrollable);

      contentElement.addEventListener('scroll', handleScroll);

      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [treatment]);

  if (!treatment) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={contentRef}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{treatment.title}</h2>
        <p>{treatment.description}</p>
        {showScroll && (
          <div className="scroll-indicator-wrapper">
            <div className="scroll-indicator"></div>
            <span>desliza hacia abajo</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentModal;
