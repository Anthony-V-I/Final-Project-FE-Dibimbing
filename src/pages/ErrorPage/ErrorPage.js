import React from "react";
import { Link } from "react-router-dom";
import "../ErrorPage/ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <section className="container-fluid min-vh-100 d-flex align-items-center">
        <div className="row mx-auto">
          <div className="col-md-12 text-center">
            <span className="fs-error">404</span>
            <div className="mb-4 fs-4 text-uppercase">
              Page Not Found 
            </div>
            <Link to="/" className="btn btn-success fs-6">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorPage