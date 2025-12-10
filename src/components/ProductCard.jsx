import React from 'react';
import './productcard.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onQuickViewClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent opening the quick view modal
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={() => onQuickViewClick(product)}>
      <div className="product-image-container">
        <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} aria-label={product.name}></div>
        <div className="product-actions-overlay">
          <button className="quick-view-btn">
            Vista Rápida
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
