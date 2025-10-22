import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Equipo from "./pages/Equipo";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import FAQ from './pages/FAQ';
import Tienda from './pages/Tienda';
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AppointmentModal from "./components/AppointmentModal";

import DermatologyWrapper from './pages/DermatologyWrapper';
import SpaLayout from './pages/SpaLayout';
import SpaFacial from './pages/SpaFacial';
import SpaCapilar from './pages/SpaCapilar';
import SpaCorporal from './pages/SpaCorporal';
import SpaLaser from './pages/SpaLaser';

import "./styles/global.css";

// Placeholder components for sub-routes
const Rejuvenecimiento = () => <div style={{padding: "2rem"}}>Rejuvenecimiento Page</div>;
const Capilar = () => <div style={{padding: "2rem"}}>Capilar Page</div>;
const AntiAcne = () => <div style={{padding: "2rem"}}>Anti Acne Page</div>;
const Antimanchas = () => <div style={{padding: "2rem"}}>Antimanchas Page</div>;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar openModal={openModal} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/equipo" element={<Equipo />} />
            
            <Route path="/dermatologia/*" element={<DermatologyWrapper />} />

            <Route path="/spa" element={<SpaLayout />}>
              <Route index element={<Navigate to="facial" replace />} />
              <Route path="facial" element={<SpaFacial />} />
              <Route path="capilar" element={<SpaCapilar />} />
              <Route path="corporal" element={<SpaCorporal />} />
              <Route path="laser" element={<SpaLaser />} />
            </Route>

            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/rejuvenecimiento" element={<Rejuvenecimiento />} />
            <Route path="/tienda/capilar" element={<Capilar />} />
            <Route path="/tienda/anti-acne" element={<AntiAcne />} />
            <Route path="/tienda/antimanchas" element={<Antimanchas />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Router>
  );
}

export default App;
