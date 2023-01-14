import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Register/Register.css";
import ImageForm from "../../components/ImageForm/ImageForm";

const Register = () => {
const [uploadImage, setUploadImage] = useState("");

  const formSignup = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .matches(/^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/, "Password must consist letter and a number")
        .required("Required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Required"),
      role: Yup.string().oneOf(["admin", "user"], "Select Role").required("Required"),
      phoneNumber: Yup.string().matches(/^[0-9]{10,12}$/, "Must be in digit").required("Required"),
    }),

    onSubmit: (values) => {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/register",
        headers: {
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
          profilePictureUrl: uploadImage,
        },
      })
        .then((response) => {
          console.log(response);
          alert("Registration Success!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed. Try Again!");
        });
    },
  });

  return (
    <>
      <section className="container-fluid background-sign-up d-flex align-items-center py-5">
        <div className="card mx-auto shadow sign-up-card py-3 px-2">
          <div className="card-body">
            <h2 className="title text-center mb-4">Sign Up</h2>
            <form onSubmit={formSignup.handleSubmit}>
              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Username
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Username"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.name}
                  />
                  {formSignup.touched.name && formSignup.errors.name ? (
                    <div className="text-danger">{formSignup.errors.name}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.email}
                  />

                  {formSignup.touched.email && formSignup.errors.email ? (
                    <div className="text-danger">{formSignup.errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.password}
                  />

                  {formSignup.touched.password && formSignup.errors.password ? (
                    <div className="text-danger">
                      {formSignup.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Confirm Password
                  </label>
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.passwordRepeat}
                  />

                  {formSignup.touched.passwordRepeat &&
                  formSignup.errors.passwordRepeat ? (
                    <div className="text-danger">
                      {formSignup.errors.passwordRepeat}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Phone
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.phoneNumber}
                  />

                  {formSignup.touched.phoneNumber &&
                  formSignup.errors.phoneNumber ? (
                    <div className="text-danger">
                      {formSignup.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Select Role
                  </label>
                  <select
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.role}
                    component="select"
                    id="role"
                    name="role"
                    multiple={false}
                    className="form-select fs-12px"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              
              <ImageForm onChange={(value) => setUploadImage(value)} />

              <div className="mt-3">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success fs-12px"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
