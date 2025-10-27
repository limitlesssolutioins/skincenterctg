import React, { useState, useEffect } from 'react';
import './productmodal.css';
import { useCart } from '../context/CartContext'; // Import useCart

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use the addToCart function

  useEffect(() => {
    if (isOpen) {
      setQuantity(1); // Reset quantity when a new product is opened
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    // Add the product to the cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose(); // Close the modal after adding to cart
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-image-container">
          <img src={product.image} alt={product.name} className="modal-image" />
        </div>

        <div className="modal-info-container">
          <h2 className="modal-product-name">{product.name}</h2>
          <p className="modal-product-brand">{product.brand}</p>
          
          <p className="modal-product-description">
            {/* Using a placeholder description for now */}
            Este es un producto de alta calidad de la línea {product.line}, diseñado para ofrecer los mejores resultados. Perfecto para tu rutina de cuidado diario.
          </p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Cantidad:</label>
            <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" id="quantity" value={quantity} readOnly className="quantity-input" />
            <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <button className="modal-add-to-cart-btn" onClick={handleAddToCart}>Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
