import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    productBrands,
    selectedBrand,
    setSelectedBrand,
  } = props;

  return (
    <aside className="filters-sidebar">
      <div className="filter-group">
        <label>Categoría:</label>
        <div className="category-buttons">
          <button className={selectedCategory === 'Todas' ? 'active' : ''} onClick={() => setSelectedCategory('Todas')}>Todas</button>
          <button className={selectedCategory === 'Rejuvenecimiento' ? 'active' : ''} onClick={() => setSelectedCategory('Rejuvenecimiento')}>Rejuvenecimiento</button>
          <button className={selectedCategory === 'Antiacne' ? 'active' : ''} onClick={() => setSelectedCategory('Antiacne')}>Antiacné</button>
          <button className={selectedCategory === 'Capilar' ? 'active' : ''} onClick={() => setSelectedCategory('Capilar')}>Capilar</button>
          <button className={selectedCategory === 'Manchas' ? 'active' : ''} onClick={() => setSelectedCategory('Manchas')}>Manchas</button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="brand-filter">Marca/Laboratorio:</label>
        <select id="brand-filter" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          {productBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
