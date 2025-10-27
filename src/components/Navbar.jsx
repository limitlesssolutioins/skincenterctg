import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaCalendarAlt, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import logoIcon from '../assets/img/icon.png';
import logoText from '../assets/img/justxt.png';

function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [dermatologiaDropdownOpen, setDermatologiaDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const footer = document.getElementById('contacto');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-brand-link">
            <div className="logo-container">
              <img src={logoIcon} alt="Clínica Icon" className="navbar-logo-icon" />
              <img src={logoText} alt="Clínica Dermatológica" className="navbar-logo-text" />
            </div>
          </NavLink>
        </div>
      </div>
      <nav className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/nosotros" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Nosotros</NavLink>
        <div
          className="dropdown-container"
          onMouseEnter={() => setDermatologiaDropdownOpen(true)}
          onMouseLeave={() => setDermatologiaDropdownOpen(false)}
        >
          <span className="nav-link">Dermatología</span>
          {dermatologiaDropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/dermatologia/clinica" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>Clínica</NavLink>
              <NavLink to="/dermatologia/estetica" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>Estética</NavLink>
            </div>
          )}
        </div>
        <NavLink to="/spa" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Spa</NavLink>
        <NavLink to="/tienda" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Tienda</NavLink>
        <NavLink to="/blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</NavLink>
        <span className="nav-link" onClick={handleContactClick} style={{cursor: 'pointer'}}>Contacto</span>
      </nav>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <div className="navbar-actions">
        <div className="language-selector">
          <FaGlobe size={20} />
          <select>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
        <button className="nav-cta" onClick={() => { openModal(); setMobileMenuOpen(false); }}>
          <FaCalendarAlt size={16} /> Agendar Cita
        </button>
      </div>
    </header>
  );
}

export default Navbar;