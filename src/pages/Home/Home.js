import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import About from "../../components/About/About";
import Feature from "../../components/Feature/Feature";
import Gallery from "../../components/Gallery/Gallery";

const Home = () => {
  return (
    <>
      <Carousel />
      <About />
      <Feature />
      <Gallery />
    </>
  );
};

export default Home;
