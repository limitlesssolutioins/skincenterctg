import React, { useState } from 'react';
import styles from './SocialWidgets.module.css';
import { FaShareAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const SocialWidgets = ({
  facebook = 'https://www.facebook.com/share/1VCsvhNBdZ',
  instagram = 'https://www.instagram.com/skincenter_oficial?igsh=MncyM2w4dWc3ajlo',
  twitter = '#',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.fabContainer}>
      <button className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`} onClick={toggleMenu}>
        <FaShareAlt className={styles.fabIcon} />
      </button>
      <div className={`${styles.fabOptions} ${isOpen ? styles.fabOptionsOpen : ''}`}>
        <a href={facebook} target="_blank" rel="noopener noreferrer" className={styles.fabOption}>
          <FaFacebook />
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.fabOption}>
          <FaInstagram />
        </a>
        <a href={twitter} target="_blank" rel="noopener noreferrer" className={styles.fabOption}>
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default SocialWidgets;
