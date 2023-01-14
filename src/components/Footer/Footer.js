import React from 'react'
import "../Footer/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-info">
      <div className="container-fluid p-5 pb-2">
        <div className="footer-top">
          <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 gy-4">
            <div className="col">
              <h5 className="text-white">Contacts</h5>
              <div className="mt-3">
                <span className="text-decoration-none text-dark-50 d-flex align-items-center mb-1">
                  <i className="ri-mail-line me-2 fs-5"></i>recipedia@mail.com
                </span>
                <span className="text-decoration-none text-dark-50 d-flex align-items-center">
                  <i className="ri-phone-line me-2 fs-5"></i>12331160
                </span>
              </div>
            </div>
            <div className="col">
              <h5 className="text-white">Social Media</h5>
              <div className="social-icon mt-3 d-flex align-items-center">
              <span className="text-black-100">
                  <i className="me-1 fs-5 p-2 ri-youtube-fill"></i>
                </span>
                <span className="text-black-100">
                  <i className="me-1 fs-5 p-2 ri-facebook-circle-fill"></i>
                </span>
                <span className="text-black-100">
                  <i className="fs-5 p-2 ri-instagram-fill"></i>
                </span>
              </div>
            </div>
            <div className="col flex-md-grow-1">
              <h5 className="text-light">Subscribe and never miss a post!</h5>
              <div className="mt-3 col-12 col-sm-10 col-md-8 col-lg-12">
              
                    <button className="btn btn-warning px-4 py-2" type="button">
                      <i className="fw-bold far fa-paper-plane"></i>
                      <span className="d-none d-sm-inline">Subscribe</span>
                    </button>
                  </div>
              
                <small className="text-white-60">
                  *Follow for more news and
                  recipes.
                </small>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-white-50
            footer-bottom
            mt-5
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <p className="me-1">
            &copy; All Rights Reserved. By
            <span className="text-decoration-none text-white ms-1">
             {' '}   Anthony Valentine Immanuel
            </span>
          </p>
        </div>
    </footer>
  )
  }

export default Footer;