import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Sidebar from '../components/Sidebar'; // Import the new sidebar
import { allProducts } from '../data/products.js';
import './tienda.css';

// Dummy comment to force re-compilation.

const Tienda = () => {
  // State for filters
  const [selectedLine, setSelectedLine] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [price, setPrice] = useState(100);

  // State for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized values for performance
  const productLines = useMemo(() => ['Todas', ...new Set(allProducts.map(p => p.line))], []);
  const productBrands = useMemo(() => ['Todas', ...new Set(allProducts.map(p => p.brand))], []);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...allProducts.map(p => p.price))), []);

  // Set initial price to max price once calculated
  useState(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  const filteredProducts = useMemo(() => allProducts.filter(product => {
    const matchesLine = selectedLine === 'Todas' || product.line === selectedLine;
    const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
    const matchesPrice = product.price <= price;
    return matchesLine && matchesBrand && matchesPrice;
  }), [selectedLine, selectedBrand, price]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="tienda-page">
        <div className="container">
          <h1 className="page-title">Nuestra Tienda</h1>
        </div>

        <section className="tienda-content-section section-padding">
          <div className="tienda-layout">
            <Sidebar 
              productLines={productLines}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
              productBrands={productBrands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              maxPrice={maxPrice}
              price={price}
              setPrice={setPrice}
            />
            <main className="product-grid-container">
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onQuickViewClick={handleQuickView} />
                  ))}
                </div>
              ) : (
                <p className="no-results">No se encontraron productos con los filtros seleccionados.</p>
              )}
            </main>
          </div>
        </section>
      </div>
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </>
  );
};

export default Tienda;
