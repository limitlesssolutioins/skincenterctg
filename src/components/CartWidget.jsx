import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import './cartwidget.css';

const CartWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
  const cartRef = useRef(null);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleBuyClick = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    const whatsappNumber = '573145523459'; // Número de WhatsApp del negocio
    let message = "¡Hola! Me gustaría hacer un pedido con los siguientes productos:\n\n";

    cartItems.forEach(item => {
      message += `- ${item.name} (x${item.quantity})\n`;
    });

    message += `\nTotal estimado: $${calculateTotal()}\n\n`;
    message += "Por favor, confírmame la disponibilidad y el proceso de pago.";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart(); // Opcional: limpiar el carrito después de enviar el pedido
    setIsOpen(false);
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef]);

  return (
    <div className="cart-widget-container" ref={cartRef}>
      <button className="cart-toggle-button" onClick={toggleCart}>
        <FaShoppingCart />
        {cartItems.length > 0 && <span className="cart-item-count">{cartItems.length}</span>}
      </button>

      {isOpen && (
        <div className="cart-window">
          <div className="cart-header">
            <h3>Tu Carrito</h3>
            <button className="cart-close-button" onClick={toggleCart}>X</button>
          </div>
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <p className="empty-cart-message">El carrito está vacío.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => removeFromCart(item.name)}><FaMinusCircle /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}><FaPlusCircle /></button>
                    <button onClick={() => removeFromCart(item.name)} className="remove-item-button"><FaTrashAlt /></button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">Total: ${calculateTotal()}</div>
              <button className="buy-now-button" onClick={handleBuyClick}>Comprar por WhatsApp</button>
              <button className="clear-cart-button" onClick={clearCart}>Vaciar Carrito</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartWidget;
