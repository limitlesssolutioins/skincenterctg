import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';
import { FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import logoIcon from '../assets/img/icon.png';
import logoText from '../assets/img/justxt.png';

function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [tiendaDropdownOpen, setTiendaDropdownOpen] = useState(false);
  const [dermatologiaDropdownOpen, setDermatologiaDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    if (location.pathname !== '/') {
      setScrolled(true);
    } else {
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="navbar-brand">
          <NavLink to="/">
            <div className="logo-container">
              <img src={logoIcon} alt="Clinica Icon" className="navbar-logo-icon" />
              <img src={logoText} alt="Clinica Dermatologica" className="navbar-logo-text" />
            </div>
          </NavLink>
        </div>
        <nav className="navbar-nav">
          <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
          <div
            className="dropdown-container"
            onMouseEnter={() => setDermatologiaDropdownOpen(true)}
            onMouseLeave={() => setDermatologiaDropdownOpen(false)}
          >
            <span className="nav-link">Dermatologia</span>
            {dermatologiaDropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/dermatologia/clinica" className="dropdown-item">Clinica</NavLink>
                <NavLink to="/dermatologia/estetica" className="dropdown-item">Estetica</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/spa" className="nav-link">Spa</NavLink>
          <div
            className="dropdown-container"
            onMouseEnter={() => setTiendaDropdownOpen(true)}
            onMouseLeave={() => setTiendaDropdownOpen(false)}
          >
            <NavLink to="/tienda" className="nav-link">Tienda</NavLink>
            {tiendaDropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/tienda/rejuvenecimiento" className="dropdown-item">Rejuvenecimiento</NavLink>
                <NavLink to="/tienda/capilar" className="dropdown-item">Capilar</NavLink>
                <NavLink to="/tienda/anti-acne" className="dropdown-item">Anti Acne</NavLink>
                <NavLink to="/tienda/antimanchas" className="dropdown-item">Antimanchas</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/blog" className="nav-link">Blog</NavLink>
          <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
        </nav>
      </div>
      <div className="navbar-actions">
        <div className="language-selector">
          <FaGlobe size={20} />
          <select>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
        <button className="nav-cta" onClick={openModal}>
          <FaCalendarAlt size={16} /> Agendar Cita
        </button>
      </div>
    </header>
  );
}

export default Navbar;
