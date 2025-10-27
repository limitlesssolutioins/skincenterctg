import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Add Router here */}
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);
