import React from "react";
import "../About/About.css";
import about from "../../assets/about-us.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section className="container-fluid p-home">
        <div className="row align-items-center g-lg-5 g-md-4 g-4">
          <div className="col-lg-4 col-md-5 col-12 text-center">
            <img
              className="rounded-5 img-fluid img-about"
              src={about}
              alt="about"
            />
          </div>
          <div className="col-lg-6 col-md-7 col-12">
          
            <div className="mt-3">
              <p className="about-lh">
                Recipedia is a website built for food and beverage enthusiast. Furthermore, Recipedia provides more than just an inspiration or recipe to lots of home cooks.
              </p>
              <p className="about-lh">
                Recipedia changed the food and beverage world with lots of tools to share
                recipes and ratings to view with : photo, ingredients, review,
                and ratings.
              </p>
            </div>
            <Link
              style={{ textDecoration: "none" }}
              to="/our-recipes"
            >
              <button
                type="button"
                className="btn btn-info shadow d-flex align-items-center p-3"
              >
                Press Here to See Our Recipes !
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
