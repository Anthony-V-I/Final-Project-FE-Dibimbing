import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "../FoodList/FoodList.css";
import ImageForm from "../../components/ImageForm/ImageForm";

const FoodList = () => {
  const [food, setFood] = useState();
  const [uploadImage, setUploadImage] = useState("");

  const getFoodData = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}` };
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      headers: headers,
    })
      .then((response) => {
        console.log(response.data.data);
        setFood(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, reload the page!");
      });
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const handleLike = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/unlike",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpdate = (values) => {
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${values.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
      data: {
        name: values.name,
        description: values.description,
        ingredients: values.ingredients,
        imageUrl: uploadImage,
      },
    })
      .then((response) => {
        getFoodData();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFood = (id) => {
    if (window.confirm(`Are you sure want to delete this food?`)) {
      axios({
        method: "delete",
        url: `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
      })
        .then((response) => {
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const InputText = ({ label, ...props }) => {
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
          <input className="form-control" {...field} {...props} />
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
        <div id="heroSlider">
         <h1 className="title text-center">Our Recipes</h1>
        </div>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4">
          {food &&
            food.map((r) => {
              return (
                <React.Fragment key={r.id}>
                  <div className="card-group gy-0">
                    <div className="card mh-100 shadow mt-4">
                      <img
                        src={r.imageUrl}
                        className="card-img-top mx-auto card-image"
                        alt={r.name}
                      />
                      <div className="d-flex justify-content-center my-2 gap-2">
                        <Tippy content="Edit this food">
                          <button
                            type="button"
                            className="btn btn-info text-dark d-flex align-items-center justify-content-center fs-6 btn-edit-delete p-1"
                            data-bs-toggle="modal"
                            data-bs-target={`#staticBackdrop_${r.id}`}
                          >
                            <i className="ri-pencil-fill"></i>
                          </button>
                        </Tippy>
                        <Tippy content="Delete this food">
                          <button
                            type="button"
                            className="btn btn-info text-dark d-flex align-items-center justify-content-center fs-6 btn-edit-delete p-1"
                            onClick={() => deleteFood(r.id)}
                          >
                            <i className="ri-delete-bin-fill"></i>
                          </button>
                        </Tippy>
                      </div>
                      <div className="card-body d-flex flex-column p-2">
                        <h5 className="card-title text-start text-capitalize fs-10 mb-1">
                          {r.name}
                        </h5>
                        <div className="d-flex align-items-center mt-auto">
                          <span className="text-muted d-flex align-items-center me-3 rate">
                            <i className="ri-star-fill me-1"></i>
                            {r.rating}
                          </span>
                          <span className="text-muted d-flex align-items-center rate">
                            <i
                              className="ri-heart-fill me-1"
                              style={{
                                color: `${r.isLike ? "red" : "gray"}`,
                              }}
                              onClick={() => handleLike(r.id, r.isLike)}
                            ></i>
                            {r.totalLikes}
                          </span>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-end">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/detail/${r.id}`}
                          className="text-success d-flex align-items-center text-card"
                        >
                          Details
                          <i className="ri-arrow-right-line ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id={`staticBackdrop_${r.id}`}
                    tabIndex="-1"
                    aria-labelledby="modal-title"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Update {r.name}</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body p-4">
                          <Formik
                            initialValues={{
                              name: r.name,
                              description: r.description,
                              ingredients: r.ingredients,
                              imageUrl: r.imageUrl,
                              id: r.id,
                            }}
                            validationSchema={Yup.object({
                              name: Yup.string().required("Required"),
                              description: Yup.string().required("Required"),
                            })}
                            onSubmit={handleUpdate}
                          >
                            <Form>
                              <InputText
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Food Name"
                              />
                              <InputText
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Description"
                              />
                              <ImageForm
                                onChange={(value) => setUploadImage(value)}
                              />

                              <div className="row mb-3">
                                <div className="col-lg-12">
                                  <label className="form-label fw-bold mb-1">
                                    Ingredients
                                  </label>
                                  <FieldArray name="ingredients">
                                    {(fieldArrayProps) => {
                                      const { push, remove, form } =
                                        fieldArrayProps;
                                      const { values } = form;
                                      const { ingredients } = values;
                                      return (
                                        <div>
                                          {ingredients.map(
                                            (ingredient, index) => (
                                              <div
                                                key={index}
                                                className="d-flex input-group mb-1"
                                              >
                                                <Field
                                                  name={`ingredients[${index}]`}
                                                  placeholder={`Ingredient ${
                                                    index + 1
                                                  }`}
                                                  className="form-control"
                                                />
                                                {index > 0 && (
                                                  <button
                                                    type="button"
                                                    className="btn btn-danger "
                                                    onClick={() =>
                                                      remove(index)
                                                    }
                                                  >
                                                    <i className="ri-delete-bin-line"></i>
                                                  </button>
                                                )}
                                                <button
                                                  type="button"
                                                  className="btn btn-success "
                                                  onClick={() => push("")}
                                                >
                                                  <i className="ri-add-fill"></i>
                                                </button>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      );
                                    }}
                                  </FieldArray>
                                </div>
                              </div>
                              <div className="text-center mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
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
};

export default FoodList;
