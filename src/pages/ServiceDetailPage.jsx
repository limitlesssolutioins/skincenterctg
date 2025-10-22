import React from 'react';
import { useParams } from 'react-router-dom';
import './service-detail.css';

function ServiceDetailPage() {
  const { serviceName } = useParams();

  // In a real application, you would fetch data based on serviceName
  // For now, we'll use a placeholder for content
  const serviceContent = {
    'dermatologia-clinica': {
      title: 'Dermatología Clínica',
      description: 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas, incluyendo acné, rosácea, psoriasis, dermatitis, infecciones cutáneas y más. Nuestro equipo de especialistas está capacitado para abordar una amplia gama de condiciones dermatológicas, ofreciendo soluciones efectivas y personalizadas para cada paciente.',
      image: '/public/img/service_clinical.webp',
      details: [
        'Acné y Rosácea',
        'Psoriasis y Eczemas',
        'Dermatitis y Alergias Cutáneas',
        'Infecciones de Piel, Cabello y Uñas',
        'Control de Lunares y Prevención de Cáncer de Piel',
      ],
    },
    'dermatologia-estetica': {
      title: 'Dermatología Estética',
      description: 'Procedimientos avanzados para el rejuvenecimiento facial y corporal, mejora de la textura de la piel y reducción de imperfecciones. Nuestros tratamientos están diseñados para realzar tu belleza natural, utilizando técnicas mínimamente invasivas y seguras que ofrecen resultados visibles y duraderos.',
      image: '/public/img/service_aesthetic.webp',
      details: [
        'Rellenos Dérmicos y Toxina Botulínica',
        'Rejuvenecimiento Facial sin Cirugía',
        'Tratamientos para Manchas y Pigmentación',
        'Mejora de Cicatrices y Estrías',
        'Peelings Químicos y Microdermoabrasión',
      ],
    },
    'terapias-laser': {
      title: 'Terapias Láser',
      description: 'Tecnología láser de última generación para depilación, eliminación de manchas, rejuvenecimiento y tratamiento de lesiones vasculares. Contamos con equipos de alta precisión que garantizan la seguridad y eficacia en cada sesión, adaptándonos a las necesidades específicas de tu piel.',
      image: '/public/img/service_laser_therapy.webp',
      details: [
        'Depilación Láser Permanente',
        'Eliminación de Manchas y Tatuajes',
        'Rejuvenecimiento Láser Fraccionado',
        'Tratamiento de Lesiones Vasculares (arañas vasculares)',
        'Láser para Acné y Cicatrices',
      ],
    },
    // Add more service details here as needed
  };

  const service = serviceContent[serviceName];

  if (!service) {
    return <div className="service-detail-container section-padding container">Servicio no encontrado.</div>;
  }

  return (
    <section className="service-detail-container section-padding container">
      <div className="service-detail-header">
        <h1>{service.title}</h1>
        <img src={service.image} alt={service.title} className="service-detail-image" />
      </div>
      <div className="service-detail-content">
        <p>{service.description}</p>
        <h3>Tratamientos Específicos:</h3>
        <ul>
          {service.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      {/* You can add a CTA button here if needed */}
      <div className="text-center" style={{ marginTop: '40px' }}>
        <NavLink to="/contacto" className="btn btn-primary">Agendar Cita</NavLink>
      </div>
    </section>
  );
}

export default ServiceDetailPage;