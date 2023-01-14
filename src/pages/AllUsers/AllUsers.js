import React, { useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { useField, Formik, Form } from 'formik';
import "../AllUsers/AllUsers.css";
import defaultImage from "../../assets/default.webp";

const AllUsers = () => {
  const [users, setUsers] = useState([])

  const onImageError = (e) => {
    e.target.src = defaultImage
  }

  const getUsers = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/all-user",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    }).then((response) => {
      console.log(response.data.data);
      setUsers(response.data.data);
    }).catch((error) => {
      console.log(error);
      alert("Error, reload the page!");
    });
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  const handleSubmit = (values) => {
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${values.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
      data: {
        role: values.role,
      },
    })
      .then((response) => {
        console.log(response);
        getUsers();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Please select a role from select form.");
      });
  }

  const SelectRole = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label
            className="form-label fw-bold mb-1"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <select className="form-select" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="container-fluid py-5 min-vh-100">
        <h1 className="title text-center">All Users</h1>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4">
          {users && users.map((r) => {
            return (
              <React.Fragment key={r.id}>
                <div className="card-group gy-0">
                  <div className="card shadow mt-4">
                    <div className="card-body d-flex flex-column p-2">
                      <img
                        src={
                          r.profilePictureUrl
                            ? r.profilePictureUrl
                            : defaultImage
                        }
                        className="img-card-profile mx-auto mb-2"
                        alt={r.name}
                        onError={onImageError}
                      />
                      <h5 className="card-title text-center fs-5 mb-3">
                        {r.name}
                      </h5>
                      <div className="d-flex gap-2 d-flex align-items-center mt-auto">
                        <i className="ri-mail-fill fs-5"></i>
                        <p className="card-text  font-12px text-truncate">
                          {r.email}
                        </p>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <i className="ri-phone-fill fs-5"></i>
                        <p className="card-text  font-12px">{r.phoneNumber}</p>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <i className="ri-account-circle-fill fs-5"></i>
                        <p className="card-text  font-12px">{r.role} account</p>
                      </div>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn text-light btn-success shadow d-flex align-items-center py-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#users${r.id}`}
                      >
                        Edit Role
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`users${r.id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Edit Role</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <div className="text-center mb-3">
                          <img
                            src={
                              r.profilePictureUrl
                                ? r.profilePictureUrl
                                : defaultImage
                            }
                            className="img-card-profile mx-auto mb-3"
                            alt={r.name}
                            onError={onImageError}
                          />
                          <h5 className="card-title text-center fs-5 mb-2">
                            {r.name}
                          </h5>
                          <div className="d-flex gap-2 align-items-center justify-content-center">
                            <i className="ri-mail-fill"></i>
                            <p className="card-text font-12px text-truncate">
                              {r.email}
                            </p>
                          </div>
                          <div className="d-flex gap-2 align-items-center justify-content-center">
                            <i className="ri-phone-fill fs-5"></i>
                            <p className="card-text font-12px">
                              {r.phoneNumber}
                            </p>
                          </div>
                        </div>
                        <Formik
                          initialValues={{
                            role: r.role,
                            id: r.id,
                          }}
                          enableReinitialize={true}
                          validationSchema={Yup.object({
                            role: Yup.string().oneOf(
                              ["admin", "user"],
                              "Select Role"
                            ),
                          })}
                          onSubmit={handleSubmit}
                        >
                          <Form>
                            <SelectRole label="Change Role" name="role">
                              <option value="">Select Role</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </SelectRole>
                            <div className="text-center mt-3">
                              <button type="submit" className="btn btn-success">
                                Save Change
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default AllUsers;