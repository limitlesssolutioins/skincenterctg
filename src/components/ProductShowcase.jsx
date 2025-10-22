import React from 'react';
import './productshowcase.css';
import { allProducts } from '../data/products.js'; // Import the full product list

// Select the first 3 products from the catalog to feature
const featuredProducts = allProducts.slice(0, 3).map(product => ({
  name: product.name,
  // Create a simple description from product data
  description: `Un producto de alta calidad de la línea ${product.line} de ${product.brand}.`,
  image: product.image,
}));

const ProductShowcase = () => {
  const whatsappNumber = '573145523459'; // Replace with the actual WhatsApp number

  const handleWhatsAppClick = (productName) => {
    const message = `Hola, estoy interesado/a en el producto ${productName}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="product-showcase-section">
      <div className="container">
        <h2 className="product-showcase-title">Nuestros Productos Destacados</h2>
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <button onClick={() => handleWhatsAppClick(product.name)} className="whatsapp-button">
                Compra tu Producto
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
