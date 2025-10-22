import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DermatologiaClinica from './DermatologiaClinica';
import DermatologiaEstetica from './DermatologiaEstetica';

const DermatologyWrapper = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="clinica" replace />} />
      <Route path="clinica" element={<DermatologiaClinica />} />
      <Route path="estetica" element={<DermatologiaEstetica />} />
      <Route path="*" element={<Navigate to="clinica" replace />} />
    </Routes>
  );
};

export default DermatologyWrapper;
