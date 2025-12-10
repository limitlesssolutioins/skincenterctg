import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { allProducts } from '../data/products';

// Hardcoded data extracted from components
const clinicalServices = [
  {
    id: 'consulta-dermatologica',
    title: 'Consulta dermatológica',
    description: 'Valoración integral que combina diagnóstico dermatológico y plan estético seguro, progresivo y personalizado.',
    image: '/img/oficinadra.png',
    image2: '/img/consultorio1.png',
    longDescription: 'En nuestra consulta dermatológica, realizamos una evaluación completa de tu piel y anexos cutáneos según la necesidad, identificamos posibles alteraciones y diseñamos un plan de tratamiento personalizado según tus necesidades.',
    highlights: [
      'Analizamos tu tipo de piel y sus características.',
      'Realizamos un escáner de piel con diferentes tecnologías.',
      'Diagnosticamos enfermedades o condiciones dermatológicas.',
      'Te orientamos sobre el cuidado adecuado y tratamientos médicos o estéticos.',
      'Y tendremos controles para observar la evolución de la patología.',
    ],
    category: 'clinical'
  },
  {
    id: 'control-dermatologico',
    title: 'Control dermatológico',
    description: 'Seguimiento especializado que mide la respuesta de tu piel y ajusta cada tratamiento con seguridad.',
    image: '/img/consultorio2.png',
    image2: '/img/equipo2.png',
    longDescription: 'Acompañamos tu tratamiento dermatológico para asegurar avances efectivos y seguros. En cada control, evaluamos fotografías clínicas, resolvemos dudas y fortalecemos la adherencia para que sigas un plan claro y personalizado.',
    highlights: [
      'Verificación de la evolución en acné, rosácea, dermatitis o melasma.',
      'Ajustes de dosis, combinaciones terapéuticas y rutinas dermocosméticas.',
      'Educación en prevención, signos de alarma y planes de mantenimiento para evitar recaídas.',
    ],
    category: 'clinical'
  },
  {
    id: 'reseccion-lesiones',
    title: 'Resección de lesiones cutáneas',
    description: 'Procedimiento ambulatorio para retirar lunares, queratosis, quistes o verrugas bajo anestesia local y con control histopatológico.',
    image: '/img/lesionescutaneas.png',
    image2: '/img/lesionescutaneas2.png',
    longDescription: 'La resección de lesiones cutáneas es un procedimiento médico que consiste en retirar de forma segura y controlada una lesión en la piel, como lunares, quistes, verrugas, queratosis u otras formaciones sospechosas o molestas.',
    highlights: [
      'Cuando una lesión cambia de color, tamaño o forma.',
      'Si causa molestias, sangrado o picazón.',
      'Por motivos estéticos o diagnósticos (para estudio en patología).',
      'El procedimiento se efectúa con anestesia local, lo que garantiza que el paciente no sienta dolor.',
      'El dermatólogo retira cuidadosamente la lesión y, si es necesario, envía la muestra al laboratorio para confirmar el diagnóstico.',
      'En algunos casos, se colocan puntos finos que se retiran después de unos días.',
    ],
    category: 'clinical'
  },
  {
    id: 'infiltracion-intralesional',
    title: 'Infiltración intralesional',
    description: 'Aplicamos medicamentos directamente en la lesión para reducir inflamación, frenar fibrosis y acelerar la recuperación del tejido.',
    image: '/img/infiltraciones.png',
    image2: '/img/infiltraciones2.png',
    longDescription: 'La infiltración intralesional es un procedimiento dermatológico en el que se aplica medicación directamente dentro de una lesión en la piel, con el objetivo de reducir la inflamación, mejorar su apariencia o acelerar la recuperación.',
    highlights: [
      'Este tratamiento se utiliza en diversas afecciones cutáneas, como:',
      'Queloides o cicatrices elevadas.',
      'Alopecia areata (pérdida localizada de cabello).',
      'Acné inflamatorio.',
      'Lesiones inflamatorias crónicas o resistentes a otros tratamientos.',
      'Se aplica anestesia local o crema anestésica, para evitar molestias.',
      'El dermatólogo introduce una pequeña cantidad del medicamento (como corticoide u otra sustancia específica) directamente en la lesión.',
      'El procedimiento es rápido, ambulatorio y no requiere incapacidad.',
    ],
    category: 'clinical'
  },
  {
    id: 'biopsia-piel',
    title: 'Biopsia de piel',
    description: 'Obtenemos una muestra precisa de piel para confirmar diagnósticos complejos y definir el tratamiento más seguro.',
    image: '/img/biopsia.png',
    image2: '/img/biopsia2.png',
    longDescription: 'La biopsia de piel es un procedimiento médico sencillo y seguro que permite obtener una pequeña muestra de piel para analizarla en el laboratorio. Su objetivo es confirmar un diagnóstico y orientar el tratamiento más adecuado.',
    highlights: [
      'Se realiza cuando el dermatólogo necesita estudiar con precisión una lesión o alteración de la piel, como:',
      'Manchas, lunares o lesiones con cambios de color o forma.',
      'Brotes persistentes, úlceras o heridas que no cicatrizan.',
      'Sospecha de enfermedades inflamatorias, infecciosas o tumorales.',
      'Se aplica anestesia local, por lo que el procedimiento no duele.',
      'Se toma una pequeña muestra de piel mediante un instrumento especializado.',
      'Posteriormente, la muestra se envía a un laboratorio de anatomía patológica, donde un médico patólogo la examina con microscopio.',
      'La zona se cubre con un apósito y se dan indicaciones para su cuidado. Generalmente, la recuperación es rápida y sin complicaciones.',
    ],
    category: 'clinical'
  }
];

const aestheticServices = [
  {
    id: 'toxina-botulinica',
    title: 'Toxina botulínica avanzada',
    description: 'Tratamiento estético para relajar arrugas dinámicas y prevenir el envejecimiento, manteniendo un rostro fresco.',
    image: '/img/toxina.png',
    image2: '/img/toxina2.png',
    longDescription: 'La toxina botulínica es uno de los tratamientos estéticos más utilizados en dermatología para suavizar las líneas de expresión y prevenir el envejecimiento facial. Su acción temporal relaja de forma controlada los músculos responsables de las arrugas dinámicas, logrando un rostro más fresco, descansado y natural.',
    highlights: [
      'Líneas de la frente.',
      'Líneas del entrecejo.',
      '“Patas de gallo” alrededor de los ojos.',
      'Sonrisa gingival.',
      'Bruxismo y tensión mandibular.',
      'Sudoración excesiva (hiperhidrosis), entre otros.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'rellenos-acido-hialuronico',
    title: 'Rellenos con ácido hialurónico',
    description: 'Reposición de volumen y definición de contornos en labios, surcos, mentón y pómulos.',
    image: '/img/acidohialuronico.png',
    image2: '/img/acidohialuronico2.png',
    longDescription: 'Trabajamos con productos prémium certificados y cánulas de última generación para moldear facciones, hidratar labios y corregir sombras. Priorizamos técnicas de soporte profundo para mantener resultados longevos.',
    highlights: [
      'Planeación estética basada en proporciones armónicas.',
      'Capas de inyección según movilidad y necesidad de soporte.',
      'Seguimiento virtual para monitorear la integración del producto.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'bioestimuladores-plla',
    title: 'Bioestimuladores cutáneos con ácido poliláctico (PLLA)',
    description: 'Bioestimulador que reactiva la producción de colágeno tipo I para un rejuvenecimiento progresivo y natural.',
    image: '/img/radiesse.png',
    image2: '/img/radiesse2.png',
    longDescription: 'El ácido poliláctico (PLLA) es uno de los bioestimuladores más reconocidos en dermatología estética por su capacidad de activar la producción de colágeno tipo I, mejorando de manera gradual la firmeza, la elasticidad y la calidad de la piel.',
    highlights: [
      'Sculptra® (PLLA): Pionero y ampliamente estudiado.',
      'DermaVeil® (PLLA): Enfocado en mejorar la firmeza y la calidad de la piel.',
      'Repart PLA® / LinneaSafe® (PLLA): Marcas emergentes biocompatibles.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'bioestimuladores-caha',
    title: 'Bioestimuladores con hidroxiapatita de calcio (CaHA)',
    description: 'Bioestimulador que redefine contornos y mejora la firmeza, aportando soporte inmediato y estimulación progresiva de colágeno.',
    image: '/img/harmonyca.png',
    image2: '/img/harmonyca2.png',
    longDescription: 'La hidroxiapatita de calcio (CaHA) es un bioestimulador cutáneo ampliamente utilizado en dermatología estética por su capacidad para mejorar la firmeza de la piel, estimular la producción de colágeno y redefinir los contornos faciales.',
    highlights: [
      'Efecto inmediato: Aporta un leve tensado y soporte estructural.',
      'Estimulación progresiva: Induce la producción de colágeno tipo I y III.',
      'Aplicable en mejillas, línea mandibular, cuello, escote, brazos, abdomen, glúteos.',
      'Radiesse® (CaHA): Marca líder y estudiada.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'bioestimuladores-pcl',
    title: 'Bioestimuladores con policaprolactona (PCL)',
    description: 'Rejuvenecimiento profundo con resultados prolongados.',
    image: '/img/harmonyca.png',
    image2: '/img/harmonyca2.png',
    longDescription: 'La policaprolactona (PCL) es un bioestimulador cutáneo avanzado, utilizado en dermatología estética para mejorar la firmeza, la elasticidad y la calidad de la piel a largo plazo.',
    highlights: [
      'Ellansé® (PCL): Conocido por su duración extendida.',
      'Ideal para flacidez facial moderada, arrugas profundas y cicatrices atróficas.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'bioestimuladores-hibridos',
    title: 'Bioestimuladores híbridos',
    description: 'HArmonyCA®: relleno híbrido con efecto tensor y mejora de la calidad de la piel.',
    image: '/img/harmonyca.png',
    image2: '/img/harmonyca2.png',
    longDescription: 'HArmonyCA® es un innovador tratamiento estético que combina ácido hialurónico (HA) e hidroxiapatita de calcio (CaHA).',
    highlights: [
      'Combina hidratación inmediata con estimulación de colágeno a largo plazo.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'skinbooster-facial',
    title: 'Skinbooster facial',
    description: 'Hidratación profunda que mejora la elasticidad, textura y luminosidad de la piel.',
    image: '/img/skinbooster.png',
    image2: '/img/skinbooster2.png',
    longDescription: 'El skinbooster facial es un tratamiento dermatológico diseñado para hidratar profundamente la piel, mejorar su textura y devolverle un aspecto fresco, luminoso y saludable.',
    highlights: [
      'Hidratación profunda y duradera.',
      'Piel más luminosa y suave.',
      'Reducción de líneas finas.',
      'Mejora de la elasticidad y la textura.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'hilos-pdo',
    title: 'Hilos PDO',
    description: 'Tensado inmediato y estimulación de colágeno con hilos de polidioxanona, biocompatibles y 100 % reabsorbibles.',
    image: '/img/hilos.png',
    image2: '/img/hilos2.png',
    longDescription: 'Los hilos PDO (polidioxanona) son un tratamiento mínimamente invasivo para estimular el colágeno y generar un efecto tensor natural.',
    highlights: [
      'Hilos lisos: Estimulan el colágeno y mejoran la calidad de la piel.',
      'Hilos espiculados: Generan efecto lifting inmediato.',
      'Hilos screw: Aportan leve volumen.',
    ],
    category: 'aesthetic'
  },
  {
    id: 'tratamientos-microagujas',
    title: 'Tratamientos con microagujas',
    description: 'Tecnologías de microagujas que renuevan la piel al estimular el colágeno, unificar el tono y potenciar los activos dermatológicos.',
    image: '/img/microagujas.png',
    image2: '/img/microagujas2.png',
    longDescription: 'En Skincenter, ofrecemos una gama de tratamientos con microagujas diseñados para estimular la regeneración profunda de la piel.',
    highlights: [
      'Microneedling: Mejora textura y firmeza.',
      'Fixer: Radiofrecuencia con microagujas para tensado.',
      'Morpheus8: Radiofrecuencia fraccionada profunda.',
      'Dermashine: Microagujas con infusión de activos.',
    ],
    category: 'aesthetic'
  }
];

const spaServices = [
  {
    id: 'limpiezas-faciales',
    title: 'LIMPIEZAS FACIALES SKINCENTER',
    shortDescription: 'Limpieza profunda y personalizada para cada tipo de piel.',
    description: 'En SkinCenter contamos con diferentes tipos de limpieza facial, diseñadas para cada tipo de piel y necesidad. Estas limpiezas eliminan impurezas, células muertas y exceso de grasa.',
    category: 'facial',
    media: { type: 'image', src: '/img/skinbooster.png', alt: 'Limpiezas Faciales' },
    highlights: ['SkinDelux', 'SkinPremium', 'SkinGold', 'SkinFrax', 'Skin360', 'SkinBeauty', 'OxyGeneo Facial']
  },
  {
    id: 'rituales-antiacne',
    title: 'RITUALES FACIALES ANTIACNÉ SKINCENTER',
    shortDescription: 'Tratamientos especializados para pieles con tendencia al acné.',
    description: 'Línea especializada de rituales faciales antiacné, diseñados para limpiar, purificar y equilibrar la piel grasa o con tendencia al acné.',
    category: 'facial',
    media: { type: 'image', src: '/img/radiesse.png', alt: 'Rituales Antiacné' },
    highlights: ['Antiacné One', 'Antiacné SkinCenter', 'Microderm Face', 'Load DuoPeel', 'Detox Facial', 'Lift Cross', 'Face Mask']
  },
  {
    id: 'rituales-antimanchas',
    title: 'RITUALES FACIALES ANTIMANCHAS SKINCENTER',
    shortDescription: 'Unifica el tono, aclara la piel y reduce la pigmentación.',
    description: 'Línea especializada de rituales faciales antimanchas creados para unificar el tono, aclarar la piel y reducir la pigmentación.',
    category: 'facial',
    media: { type: 'image', src: '/img/toxina.png', alt: 'Rituales Antimanchas' },
    highlights: ['DarkFace Pro', 'DuoPeel Antimanchas', 'Cosmelan', 'Mesogun Antimanchas', 'Detox Antimanchas', 'Face Mask Antimanchas']
  },
  {
    id: 'dermatologia-capilar',
    title: 'DERMATOLOGÍA CAPILAR SKINCENTER',
    shortDescription: 'Diagnóstico y tratamientos personalizados para la salud de tu cabello.',
    description: 'Protocolos diseñados para detener la caída, estimular el crecimiento, fortalecer la fibra capilar y mejorar la salud del folículo.',
    category: 'capilar',
    media: { type: 'image', src: '/img/laser.jpg', alt: 'Dermatología Capilar' },
    highlights: ['Mesoterapia capilar', 'Láser capilar de baja intensidad', 'Terapia PRP capilar', 'Limpiezas y detox capilares', 'Nutrición y revitalización capilar']
  },
  {
    id: 'tratamientos-corporales',
    title: 'Tratamientos corporales Skincenter',
    shortDescription: 'Tecnología y técnicas manuales para remodelar tu figura.',
    description: 'Combinamos tecnología corporal de última generación con técnicas manuales especializadas para ofrecer tratamientos efectivos y seguros.',
    category: 'corporal',
    media: { type: 'image', src: '/img/cuerpo.png', alt: 'Tratamientos Corporales' },
    highlights: ['EmZero', 'Liposonix', 'HIFU corporal', 'Tensamax', 'Radiofrecuencia corporal', 'Cavitación y ultrasonido', 'Presoterapia']
  },
  {
    id: 'tecnologias-laser',
    title: 'Rejuvenecimiento Láser y Tratamiento de la Piel',
    shortDescription: 'Rejuvenecimiento facial, mejora de la textura y unificación del tono.',
    description: 'Tratamientos con láser y luz intensa pulsada (IPL) diseñados para revitalizar la piel, tratar manchas, enrojecimiento y cicatrices.',
    category: 'laser',
    media: { type: 'image', src: '/img/laser.jpg', alt: 'Rejuvenecimiento Láser' },
    highlights: ['Luz Intensa Pulsada (IPL)', 'Black Peel', 'Láser CO₂ Fraccionado', 'Láser Picosegundo', 'Láser Diodo Facial']
  },
  {
    id: 'depilacion-laser',
    title: 'Depilación Láser',
    shortDescription: 'Eliminación permanente del vello con tecnología láser de vanguardia.',
    description: 'Depilación láser permanente para una piel suave y sin vello.',
    category: 'laser',
    media: { type: 'image', src: '/img/laser.jpg', alt: 'Depilación Láser' },
    highlights: ['Soprano Ice Platinum', 'Láser Diodo']
  },
  {
    id: 'despigmentacion-zonas-nigricans',
    title: 'Despigmentación de Zonas Nigricans',
    shortDescription: 'Tratamiento especializado para aclarar zonas con hiperpigmentación.',
    description: 'Tratamiento delicado y efectivo diseñado para reducir la coloración oscura en áreas sensibles como axilas, ingles, codos y cuello.',
    category: 'laser',
    media: { type: 'image', src: '/img/laser.jpg', alt: 'Despigmentación Zonas Nigricans' },
    highlights: ['Láser Picosegundo', 'Láser Diodo', 'Peelings Químicos Suaves']
  }
];

const blogPosts = [
  {
    id: 'beneficios-acido-hialuronico',
    title: 'Los Beneficios del Ácido Hialurónico',
    date: '15 de Julio, 2025',
    image: '/img/blog_post1.webp',
    excerpt: 'El ácido hialurónico es una sustancia natural que se encuentra en nuestro cuerpo, especialmente en la piel, articulaciones y ojos. Su principal función es retener agua, lo que lo convierte en un hidratante excepcional.',
    content: 'El ácido hialurónico es una sustancia natural que se encuentra en nuestro cuerpo, especialmente en la piel, articulaciones y ojos. Su principal función es retener agua, lo que lo convierte en un hidratante excepcional. En dermatología, se utiliza ampliamente para mejorar la elasticidad de la piel, reducir arrugas y líneas de expresión, y proporcionar un aspecto más joven y saludable.'
  },
  {
    id: 'proteccion-solar-verano',
    title: 'Protección Solar: Más Allá del Verano',
    date: '10 de Julio, 2025',
    image: '/img/blog_post2.webp',
    excerpt: 'La protección solar es fundamental durante todo el año, no solo en verano. Los rayos UV están presentes incluso en días nublados y pueden causar daño acumulativo.',
    content: 'La protección solar es fundamental durante todo el año, no solo en verano. Los rayos UV están presentes incluso en días nublados y pueden causar daño acumulativo en la piel, llevando a envejecimiento prematuro, manchas y un mayor riesgo de cáncer de piel.'
  },
  {
    id: 'mitos-acne-adulto',
    title: 'Mitos y Verdades sobre el Acné Adulto',
    date: '05 de Julio, 2025',
    image: '/img/blog_post3.webp',
    excerpt: 'El acné no es solo un problema adolescente; muchas personas experimentan brotes en la edad adulta.',
    content: 'El acné no es solo un problema adolescente; muchas personas experimentan brotes en la edad adulta, a menudo debido a factores hormonales, estrés o productos inadecuados. Desmentimos creencias populares como que el chocolate causa acné.'
  }
];

const teamMembers = [
  {
    id: 'dr-luis-fernando',
    name: 'Dr. Luis Fernando González',
    role: 'Dermatólogo Especialista',
    bio: 'El Dr. Luis Fernando González es un dermatólogo altamente calificado y dedicado, con una trayectoria de más de 20 años en el cuidado de la piel. Se especializa en diagnóstico y tratamiento de enfermedades de la piel y procedimientos estéticos avanzados.',
    image: '/img/doctor_luis_fernando.webp',
    credentials: [
      'Médico Cirujano, Universidad Nacional de Colombia.',
      'Especialista en Dermatología, Hospital Universitario San Ignacio.',
      'Miembro de la Asociación Colombiana de Dermatología y Cirugía Dermatológica (ASOCOLDERMA).',
      'Miembro de la Academia Americana de Dermatología (AAD).'
    ]
  }
];

const DataMigration = () => {
  const [status, setStatus] = useState('Idle');
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const migrateProducts = async () => {
    const batch = writeBatch(db);
    allProducts.forEach(product => {
      // Use name as ID or a specific ID field if unique enough, or just let Firestore generate one if not consistent.
      // Here we have numeric IDs, better to use string keys or auto-id. 
      // Using numeric string for simplicity to match current logic if possible, or new auto-IDs.
      // Let's use auto-generated IDs for better scalability or existing IDs if important.
      // Since existing IDs are 1, 2, 3... let's stick to that but stored as string in doc key to prevent overwrites or duplicates easily.
      const docRef = doc(collection(db, "products"), String(product.id));
      batch.set(docRef, product);
    });
    await batch.commit();
    addLog(`Migrated ${allProducts.length} products.`);
  };

  const migrateServices = async () => {
    const batch = writeBatch(db);
    [...clinicalServices, ...aestheticServices].forEach(service => {
      const docRef = doc(collection(db, "services"), service.id);
      batch.set(docRef, service);
    });
    await batch.commit();
    addLog(`Migrated ${clinicalServices.length + aestheticServices.length} dermatology services.`);
  };

  const migrateSpa = async () => {
    const batch = writeBatch(db);
    spaServices.forEach(service => {
      const docRef = doc(collection(db, "spa_services"), service.id);
      batch.set(docRef, service);
    });
    await batch.commit();
    addLog(`Migrated ${spaServices.length} spa services.`);
  };

  const migrateBlog = async () => {
    const batch = writeBatch(db);
    blogPosts.forEach(post => {
      const docRef = doc(collection(db, "blog_posts"), post.id);
      batch.set(docRef, post);
    });
    await batch.commit();
    addLog(`Migrated ${blogPosts.length} blog posts.`);
  };

  const migrateTeam = async () => {
    const batch = writeBatch(db);
    teamMembers.forEach(member => {
      const docRef = doc(collection(db, "team"), member.id);
      batch.set(docRef, member);
    });
    await batch.commit();
    addLog(`Migrated ${teamMembers.length} team members.`);
  };

  const handleMigration = async () => {
    setStatus('Migrating...');
    setLog([]);
    try {
      await migrateProducts();
      await migrateServices();
      await migrateSpa();
      await migrateBlog();
      await migrateTeam();
      setStatus('Success');
      addLog('All migrations completed successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error');
      addLog(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Data Migration to Firestore</h1>
      <button onClick={handleMigration} disabled={status === 'Migrating'}>
        {status === 'Migrating' ? 'Migrating...' : 'Start Migration'}
      </button>
      <div style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
        <h3>Log:</h3>
        {log.map((entry, i) => <div key={i}>{entry}</div>)}
      </div>
    </div>
  );
};

export default DataMigration;
