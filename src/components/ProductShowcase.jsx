import React from 'react';
import './productshowcase.css';
import { allProducts } from '../data/products.js'; // Import the full product list
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Select the first 5 products from the catalog to feature for the carousel
const featuredProducts = allProducts.slice(0, 5).map(product => ({
  name: product.name,
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

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <section className="product-showcase-section">
      <div className="container">
        <h2 className="product-showcase-title">Nuestros Productos Destacados</h2>
        <Slider {...slickSettings}>
          {featuredProducts.map((product, index) => (
            <div key={index} className="product-card-wrapper">
              <div className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <button onClick={() => handleWhatsAppClick(product.name)} className="whatsapp-button">
                  Compra tu Producto
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductShowcase;
