import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './customselect.css';

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  label,
  id,
  name,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOptionLabel = options.find(option => option.value === value)?.label || placeholder;

  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, height: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="custom-select-container">
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={`custom-select-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptionLabel}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="custom-select-options"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                className={`custom-select-option ${option.value === value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
                variants={itemVariants}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {/* Hidden native select for form submission and validation */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ display: 'none' }} // Hide the native select
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
