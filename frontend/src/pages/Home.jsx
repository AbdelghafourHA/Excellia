import React from "react";
import Hero from "../sections/Hero.jsx";
import Services from "../sections/Services.jsx";
import Gallery from "../sections/Gallery.jsx";
import BreakfastMenu from "../sections/BreakfastMenu.jsx";
import Contact from "../sections/Contact.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Gallery />
      <BreakfastMenu />
      <Contact />
    </div>
  );
};

export default Home;
