import React, { useState, useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "./Product";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

const categories = [
  "Hair Care",
  "Skin Care",
  "Face Care",
  "Lip Care",
  "Kids Care",
  "Gift Hampers",
];

function Products() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>Fianza | PRODUCTS</title>
            <meta name="description" content="Description for Home Page" />
          </Helmet>

          <div className="products">
            
            <div 
            className="products-main">
              <h2 className="productsHeading">All Products</h2>
              <div className="card">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </div>

            <div className="filterBox">
              <h4>Categories</h4>
              <ul className="categoryBox">
                <li className="category-link" onClick={() => setCategory("")}>
                  All Products
                </li>
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
           
            {resultPerPage < productCount && (
              <div className="paginationBox">
                <h5>Page: {currentPage}</h5>
                <Pagination
                  count={Math.trunc(productCount / resultPerPage) + 1}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                  size="large"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
