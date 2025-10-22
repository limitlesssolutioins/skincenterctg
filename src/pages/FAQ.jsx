import React, { useState } from 'react';
import './faq.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

// FAQ data array
const faqData = [
  {
    question: '¿Necesito una remisión para agendar una cita?',
    answer: 'No, no necesitas una remisión para agendar una cita con nuestros especialistas. Puedes contactarnos directamente para programar tu consulta.'
  },
  {
    question: '¿Qué debo esperar en mi primera consulta dermatológica?',
    answer: 'En tu primera visita, el dermatólogo evaluará tu historial médico y examinará tu piel. Se discutirán tus preocupaciones, se realizará un diagnóstico y se propondrá un plan de tratamiento personalizado.'
  },
  {
    question: '¿Los tratamientos estéticos son dolorosos?',
    answer: 'La mayoría de los tratamientos estéticos son mínimamente invasivos y se toleran muy bien. Utilizamos anestesia tópica y otras técnicas para minimizar cualquier molestia y asegurar tu comodidad durante el procedimiento.'
  },
  {
    question: '¿Cuánto tiempo tardan en verse los resultados de un tratamiento?',
    answer: 'El tiempo para ver resultados varía según el tratamiento. Algunos procedimientos ofrecen resultados inmediatos, mientras que otros, como los que estimulan el colágeno, pueden tardar algunas semanas o meses en mostrar su efecto completo.'
  },
  {
    question: '¿Qué tipos de pago aceptan?',
    answer: 'Aceptamos una variedad de métodos de pago, incluyendo tarjetas de crédito (Visa, MasterCard), tarjetas de débito y efectivo. Para más detalles, por favor contacta a nuestra administración.'
  }
];

// Reusable Accordion Item Component
const AccordionItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{faq.question}</span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>
      <div className={`accordion-answer ${isOpen ? 'open' : ''}`}>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

function FAQ() {
  return (
    <div className="faq-page">
      <div className="container">
        <h1 className="page-title">Preguntas Frecuentes</h1>
      </div>

      {/* FAQ Accordion Section */}
      <section className="faq-section section-padding">
        <div className="container">
          <div className="faq-accordion-container">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
