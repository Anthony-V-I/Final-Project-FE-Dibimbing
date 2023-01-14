import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      })
        .then((response) => {
          setUsername(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
    })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container-fluid px-lg-5">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={"https://s.tmimgcdn.com/scr/1200x627/212900/spoon-and-fork-restaurant-logo_212966-original.png"} alt="logo" height="40" className="me-2" />
            <span className="fw-bold fs-2 logo-color wavy">RECIPEDIA</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link className="nav-link fw-bold text-blue" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link fw-bold text-blue" to="/our-recipes">
                  Recipes
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link fw-bold text-blue" to="/favorite">
                      Favorite
                    </Link>
                  </li>
                </>
              ) : null}
              {localStorage.getItem("role") === "admin" ? (
                <>
                  <li className="nav-item ">
                    <Link
                      className="nav-link fw-bold text-blue"
                      to="/add-food"
                    >
                      Add Food
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
            <span>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                {localStorage.getItem("token") ? (
                  <li className="nav-item dropdown">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="nav-link fw-bold text-dark dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {username}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link
                          className="dropdown-item fw-bold text-dark"
                          to={`/profile`}
                        >
                          My Profile
                        </Link>
                      </li>
                      {localStorage.getItem("role") === "admin" ? (
                        <li>
                          <Link
                            className="dropdown-item fw-bold text-dark"
                            to="/all-users"
                          >
                            All user
                          </Link>
                        </li>
                      ) : null}
                      <li>
                        <Link
                          className="dropdown-item fw-bold text-dark"
                          to="#"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item ">
                    <Link className="nav-link fw-bold text-blue" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
