import React from 'react';
import './productcard.css';

const ProductCard = ({ product, onQuickViewClick }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-actions-overlay">
          <button className="quick-view-btn" onClick={() => onQuickViewClick(product)}>
            Vista Rápida
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        {product.discountPrice && (
          <p className="product-discount-price">
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            ${product.discountPrice.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
