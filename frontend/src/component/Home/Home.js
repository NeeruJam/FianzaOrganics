import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "../Product/Product.js";
import { Helmet } from "react-helmet-async";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>Fianza | Home</title>
            <meta name="description" content="Description for Home Page" />
          </Helmet>
          <div className="banner">
            <h1>Fianza</h1>
            <p>Bond between nature and body</p>
            <p>100% Handmade with Love</p>
          </div>

          <div className="heading">
            <h2>Featured Products</h2>
          </div>

          <div className="category">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
