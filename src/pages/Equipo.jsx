import React, { useState, useEffect } from "react";
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import "./equipo.css";

function About() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const teamData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTeamMembers(teamData);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
      setLoading(false);
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <section className="doctor-presentation-section section-padding container"><p>Cargando equipo...</p></section>;
  }

  return (
    <section className="doctor-presentation-section section-padding container">
      {teamMembers.map((member) => (
        <div className="doctor-profile-single" key={member.id}>
          <div className="doctor-image-wrapper">
            <img src={member.image} alt={member.name} className="doctor-img" />
          </div>
          <div className="doctor-details">
            <h1>{member.name}</h1>
            <h2>{member.role}</h2>
            <p>{member.bio}</p>
            {member.credentials && member.credentials.length > 0 && (
              <>
                <h3>Credenciales y Membresías:</h3>
                <ul>
                  {member.credentials.map((cred, index) => (
                    <li key={index}>{cred}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default About;