import React from "react";
import "./equipo.css";

function About() {
  return (
    <section className="doctor-presentation-section section-padding container">
      <div className="doctor-profile-single">
        <div className="doctor-image-wrapper">
          <img src="/public/img/doctor_luis_fernando.webp" alt="Dr. Luis Fernando González" className="doctor-img" />
        </div>
        <div className="doctor-details">
          <h1>Dr. Luis Fernando González</h1>
          <h2>Dermatólogo Especialista</h2>
          <p>El Dr. Luis Fernando González es un dermatólogo altamente calificado y dedicado, con una trayectoria de más de 20 años en el cuidado de la piel. Su compromiso con la excelencia y la innovación lo ha posicionado como un referente en el campo de la dermatología clínica y estética.</p>
          <p>Se especializa en el diagnóstico y tratamiento de enfermedades de la piel, así como en procedimientos estéticos avanzados para el rejuvenecimiento facial y corporal. Su enfoque se centra en ofrecer soluciones personalizadas que combinan la ciencia más reciente con un profundo entendimiento de las necesidades individuales de cada paciente.</p>
          <h3>Credenciales y Membresías:</h3>
          <ul>
            <li>Médico Cirujano, Universidad Nacional de Colombia.</li>
            <li>Especialista en Dermatología, Hospital Universitario San Ignacio.</li>
            <li>Miembro de la Asociación Colombiana de Dermatología y Cirugía Dermatológica (ASOCOLDERMA).</li>
            <li>Miembro de la Academia Americana de Dermatología (AAD).</li>
            <li>Participación activa en congresos y seminarios internacionales sobre avances en dermatología y medicina estética.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;