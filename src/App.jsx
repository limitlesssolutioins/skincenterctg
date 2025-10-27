import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Equipo from "./pages/Equipo";
import Blog from "./pages/Blog";

import FAQ from './pages/FAQ';
import Tienda from './pages/Tienda';
import Footer from "./components/Footer";
import SocialWidgets from "./components/SocialWidgets";
import QuickAssessmentModal from "./components/QuickAssessmentModal";
import ChatbotWidget from "./components/ChatbotWidget";
import CartWidget from "./components/CartWidget"; // Import CartWidget
import CookieConsent from "./components/CookieConsent"; // Import CookieConsent

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
  const [modalData, setModalData] = useState({ isOpen: false, serviceName: '', category: '' });
  const location = useLocation(); // Initialize useLocation

  const openModal = (serviceName = '', category = '') => {
    setModalData({ isOpen: true, serviceName, category });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, serviceName: '', category: '' });
  };

  // Determine if the current route is the shop page
  const isShopPage = location.pathname.startsWith('/tienda');

  return (
    <div className="app">
        <Navbar openModal={openModal} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/equipo" element={<Equipo />} />
            
            <Route path="/dermatologia/*" element={<DermatologyWrapper openModal={openModal} />} />

            <Route path="/spa" element={<SpaLayout openModal={openModal} />}>
              <Route index element={<Navigate to="facial" replace />} />
              <Route path="facial" element={<SpaFacial />} />
              <Route path="capilar" element={<SpaCapilar />} />
              <Route path="corporal" element={<SpaCorporal />} />
              <Route path="laser" element={<SpaLaser />} />
            </Route>

            <Route path="/blog" element={<Blog />} />
            
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/rejuvenecimiento" element={<Rejuvenecimiento />} />
            <Route path="/tienda/capilar" element={<Capilar />} />
            <Route path="/tienda/anti-acne" element={<AntiAcne />} />
            <Route path="/tienda/antimanchas" element={<Antimanchas />} />
          </Routes>
        </main>
        <Footer />
        <SocialWidgets facebook="#" instagram="#" twitter="#" />
        <QuickAssessmentModal 
          isOpen={modalData.isOpen} 
          onClose={closeModal} 
          serviceName={modalData.serviceName} 
          category={modalData.category} 
        />
        {isShopPage && <CartWidget />} {/* Conditionally render CartWidget */}
        <ChatbotWidget />
        <CookieConsent />
      </div>
  );
}

export default App;
