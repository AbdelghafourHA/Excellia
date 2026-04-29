import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Gallery from "../sections/Gallery";
import BreakfastMenu from "../sections/BreakfastMenu";
import Contact from "../sections/Contact";

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
