import { useState, useEffect } from 'react';
import { db } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useSpaServices = (category) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "spa_services"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServices(data);
      } catch (error) {
        console.error("Error fetching spa services:", error);
      }
      setLoading(false);
    };

    fetchServices();
  }, [category]);

  return { services, loading };
};
