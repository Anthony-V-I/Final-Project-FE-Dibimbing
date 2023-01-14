import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Gallery/Gallery.css";

const Gallery = () => {
  const [food, setFood] = useState([]);

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
        console.log(response);
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

  return (
    <>
      <section className="container-fluid p-home p-responsive">
        <h1 className="title text-center underline">Most Favorite Food</h1>
        <div className="row g-3 mt-4">
          {food &&
            food
              .sort((a, b) => (a.totalLikes < b.totalLikes ? 1 : -1))
              .slice(0, 4)
              .map((r) => {
                return (
                  <React.Fragment key={r.id}>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                      <div className="food-gallery d-flex justify-content-center">
                        <img
                          className="img-fluid img-gallery"
                          src={r.imageUrl}
                          alt={r.name}
                        />
                        <Link
                          style={{ textDecoration: "none" }}
                          className="food-btn text-white text-center bg-success fs-5 p-2"
                          to={`/detail/${r.id}`}
                        >
                          {r.name}
                        </Link>
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

export default Gallery;
