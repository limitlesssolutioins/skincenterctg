import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DermatologiaClinica from './DermatologiaClinica';
import DermatologiaEstetica from './DermatologiaEstetica';

const DermatologyWrapper = ({ openModal }) => {
  return (
    <Routes>
      <Route index element={<Navigate to="clinica" replace />} />
      <Route path="clinica" element={<DermatologiaClinica openModal={openModal} />} />
      <Route path="estetica" element={<DermatologiaEstetica openModal={openModal} />} />
      <Route path="*" element={<Navigate to="clinica" replace />} />
    </Routes>
  );
};

export default DermatologyWrapper;
