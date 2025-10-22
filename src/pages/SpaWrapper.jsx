import React from 'react';
import SpaFacial from './SpaFacial';
import SpaCapilar from './SpaCapilar';
import SpaCorporal from './SpaCorporal';
import SpaLaser from './SpaLaser';

const SpaWrapper = () => {
  return (
    <>
      {/* You might want to add some routing logic here if you have sub-routes for spa */}
      {/* For now, we'll just render them directly or based on a prop */}
      <SpaFacial />
      <SpaCapilar />
      <SpaCorporal />
      <SpaLaser />
    </>
  );
};

export default SpaWrapper;
