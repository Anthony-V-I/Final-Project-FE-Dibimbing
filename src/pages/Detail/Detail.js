import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup" ;
import "../Detail/Detail.css";
import defaultImage from "../../assets/default.webp";

const Detail = () => {
  let { foodID } = useParams();

  const [food, setFood] = useState("");
  const [rating, setRating] = useState();

  const onImageError = (e) => {
    e.target.src = defaultImage;
  };
  
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodID}`,
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        console.log(response);
        setFood(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        console.log(response);
        setRating(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((response) => {
        console.log(response);
        getRating();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    YupationSchema: Yup.object({
      rating: Yup.number().required("Please enter a rating").min(1, "Rating should be at least 1").max(5, "Rating should not exceed 5"),
      review: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <section className="container-fluid py-5">
        <div className="mx-auto food-detail">
          <h1 className="title text-center text-capitalize">
            {food && food.name} details
          </h1>
          <div className="card my-3 shadow">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <img
                    src={food && food.imageUrl}
                    className="img-fluid m-0 img-food"
                    alt={food && food.name}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <h2 className="card-title text-center text-sm-start text-capitalize fs-4 mb-3">
                    {food && food.name}
                  </h2>
                  <div className="d-flex gap-2 mb-1">
                    <i className="ri-file-list-line"></i>
                    <p className="card-text">
                      <span className="fw-bold">Description: </span>
                      {food && food.description}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mb-1">
                    <i className="ri-file-list-line"></i>
                    <p className="card-text">
                      <span className="fw-bold">Ingredients: </span>
                      {food &&
                        food.ingredients.map((m, index) => {
                          return (
                            <span key={index}>{(index ? ", " : "") + m}</span>
                          );
                        })}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mb-1">
                    <i className="ri-file-list-line"></i>
                    <p className="card-text">
                      <span className="fw-bold">Created at: </span>
                      {food && food.createdAt}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mb-1">
                    <i className="ri-file-list-line"></i>
                    <p className="card-text">
                      <span className="fw-bold">Updated at: </span>
                      {food && food.updatedAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer ">
              <div className="d-flex align-items-center mt-auto">
                <span className="text-muted d-flex align-items-center me-3 rate">
                  <i className="ri-star-fill me-1"></i>
                  {food && food.rating}
                </span>
                <span className="text-muted d-flex align-items-center rate">
                  <i className="ri-heart-fill me-1"></i>
                  {food && food.totalLikes}
                </span>
              </div>
            </div>
          </div>

          {localStorage.getItem("token") ? (
            <>
              <div className="text-start">
                <button
                  type="button"
                  className="btn text-light btn-success shadow d-flex align-items-center py-1"
                  data-bs-toggle="modal"
                  data-bs-target={`#rating${food && food.id}`}
                >
                  <i className="ri-award-line me-2"></i>
                  Rate this dish
                </button>
              </div>

              <div
                className="modal fade"
                id={`rating${food && food.id}`}
                tabIndex="-1"
                aria-labelledby="modal-title"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Rate This Food</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body p-4">
                      <div className="text-center">
                        <img
                          src={food && food.imageUrl}
                          className="img-fluid img-food-rate mb-3"
                          alt={food && food.name}
                        />
                      </div>
                      <form onSubmit={(e) => handleSubmit(e, food.id)}>
                        <div className="row mb-3">
                          <div className="col-lg-12">
                            <label
                              htmlFor="inputName"
                              className="form-label fw-bold mb-1"
                            >
                              Rating
                            </label>
                            <input
                              value={formik.values.rating}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              type="number"
                              className="form-control"
                              id="rating"
                              placeholder="Rate this food (1-5)"
                            />
                          </div>
                          {formik.touched.rating && formik.errors.rating ? (
                            <div className="text-danger">
                              {formik.errors.rating}
                            </div>
                          ) : null}
                        </div>
                        <div className="row mb-3">
                          <div className="col-lg-12">
                            <label
                              htmlFor="inputName"
                              className="form-label fw-bold mb-1"
                            >
                              Review
                            </label>
                            <textarea
                              value={formik.values.review}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              type="text"
                              className="form-control"
                              id="review"
                              placeholder="Review this food"
                            />
                          </div>
                          {formik.touched.review && formik.errors.review ? (
                            <div className="text-danger">
                              {formik.errors.review}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-start mt-3">
                          <button
                            type="submit"
                            className="btn text-light shadow btn-success"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <div className="my-4">
            <hr />
          </div>
          <div className="text-start">
            <h3 className="fs-4">Reviews</h3>
          </div>
          {rating &&
            rating.map((rate) => {
              return (
                <div key={rate.id}>
                  <ul className="list-group mt-3">
                    <li className="list-group-item shadow">
                      <div className="d-flex justify-content-start gap-2">
                        <div className="d-flex">
                          <img
                            src={
                              rate.user.profilePictureUrl
                                ? rate.user.profilePictureUrl
                                : defaultImage
                            }
                            className="img-fluid img-profile"
                            alt={rate.user.name}
                            onError={onImageError}
                          />
                        </div>
                        <div className="d-flex">
                          <div>
                            <p className="fw-bold review-name mb-1">
                              {rate.user.name}
                            </p>
                            <p className="d-flex align-items-center review-name">
                              <i className="ri-star-fill me-1"></i>
                              {rate.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start review-comment">
                        <p>{rate.review}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Detail;
