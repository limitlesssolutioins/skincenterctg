import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Sidebar from '../components/Sidebar'; // Import the new sidebar
import { allProducts } from '../data/products.js';
import './tienda.css';

// Dummy comment to force re-compilation.

const Tienda = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('Todas');

  // State for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized values for performance
  const productBrands = useMemo(() => ['Todas', ...new Set(allProducts.map(p => p.brand))], []);

  const filteredProducts = useMemo(() => allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
    return matchesCategory && matchesBrand;
  }), [selectedCategory, selectedBrand]);

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
        </div>

        <section className="tienda-content-section section-padding">
          <div className="tienda-layout">
            <Sidebar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              productBrands={productBrands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
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
