import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const {
    productLines,
    selectedLine,
    setSelectedLine,
    productBrands,
    selectedBrand,
    setSelectedBrand,
    maxPrice,
    price, // Current price value for the slider
    setPrice, // Function to update the price
  } = props;

  return (
    <aside className="filters-sidebar">
      <div className="filter-group">
        <label htmlFor="line-filter">Línea de Producto:</label>
        <select id="line-filter" value={selectedLine} onChange={(e) => setSelectedLine(e.target.value)}>
          {productLines.map(line => (
            <option key={line} value={line}>{line}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="brand-filter">Marca/Laboratorio:</label>
        <select id="brand-filter" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          {productBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="price-filter">Precio (hasta):</label>
        <div className="price-range-inputs">
          <span>$0</span>
          <span>${price}</span>
        </div>
        <input 
          type="range" 
          id="price-filter" 
          min="0" 
          max={maxPrice} 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
