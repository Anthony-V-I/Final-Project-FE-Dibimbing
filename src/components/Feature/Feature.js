import React from "react";
import "../Feature/Feature.css";

const Feature = () => {
  return (
    <section className="container-fluid p-home bg-feature">
      <div className="row">
        <div className="col-12">
          <h1 className="text-white text-center">Our Features</h1>
        </div>
      </div>
      <div className="row gy-4">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
             <i className="ri-star-s-fill"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Rating and Review</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
              <i className="ri-refresh-line"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Recipes Publish and Updates</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
              <i className="ri-user-heart-fill"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Add to Favorites</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
