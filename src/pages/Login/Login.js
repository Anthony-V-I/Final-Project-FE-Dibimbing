import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import "../Login/Login.css";

const Login = () => {
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/login",
        headers: {
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);

          const role = response.data.user.role;
          localStorage.setItem("role", role);

          const name = response.data.user.name;
          localStorage.setItem("name", name);

          const email = values.email;
          localStorage.setItem("email", email);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("The password that you've entered is incorrect. Try again.");
        });
    },
  });
  

  return (
    <>
      <section className="container-fluid background d-flex align-items-center py-5">
        <div className="card mx-auto shadow sign-card py-3 px-2">
          <div className="card-body">
            <h2 className="title text-center mb-4">Log in</h2>
            <form onSubmit={formLogin.handleSubmit}>
              <div className="mb-2">
                <label className="form-label fw-bold mb-0">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.email}
                  placeholder="Email"
                />
                {formLogin.touched.email && formLogin.errors.email ? (
                  <div className="text-danger">{formLogin.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold mb-0">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.password}
                  placeholder="Password"
                />
                {formLogin.touched.password && formLogin.errors.password ? (
                  <div className="text-danger">{formLogin.errors.password}</div>
                ) : null}
              </div>
              <div className="my-3">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-success w-100"
                />
              </div>
              <p className="fw-bold text-center">
                Not Registered Yet?
                <span className="ms-1">
                  <Link
                    className="text-decoration-none text-success"
                    to="/register"
                  >
                    Create an Account
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login