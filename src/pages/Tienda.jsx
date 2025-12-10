import React, { useState, useMemo, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Sidebar from '../components/Sidebar';
import './tienda.css';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('Todas');

  // State for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Memoized values for performance
  const productBrands = useMemo(() => ['Todas', ...new Set(products.map(p => p.brand))], [products]);

  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
    return matchesCategory && matchesBrand;
  }), [selectedCategory, selectedBrand, products]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="tienda-page" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

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
