import React from "react";
import { NavLink } from "react-router-dom";
import Resenas from "../components/Resenas";
import AntesDespues from "../components/AntesDespues";
import Tecnologias from "../components/Tecnologias";
import ProductShowcase from "../components/ProductShowcase";
import { Hero } from "../components/Hero";
import TratamientosInteractivos from "../components/TratamientosInteractivos";
import "./home.css";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

function Home({ openModal }) {
  return (
    <div className="home-page">
      <Hero openModal={openModal} />

      <AntesDespues />

      {/* --- Interactive Treatments Section --- */}
      <TratamientosInteractivos />

      <Resenas />
      {/* <Tecnologias /> */}
      <ProductShowcase />
    </div>
  );
}

export default Home;
