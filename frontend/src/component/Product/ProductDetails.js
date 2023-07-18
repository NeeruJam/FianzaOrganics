import React , {useState ,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Loader from "../layout/Loader/Loader";
import { Helmet } from 'react-helmet-async';
import { Rating } from "@material-ui/lab";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
    clearErrors,
    getProductDetails,
    newReview,
  } from "../../actions/productAction";
  import { addItemsToCart } from "../../actions/cartAction";
  import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
  import { NEW_REVIEW_RESET } from "../../constants/productConstants";
  import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
  


function ProductDetails() {
    const {id} = useParams();
const alert = useAlert();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
      
      const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );

      const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        isHalf: true
      };

      const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

 function increaseQuantity() {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

 function decreaseQuantity() {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }
        dispatch(getProductDetails(id))

    }, [dispatch, id,error, alert,reviewError,success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>{`Fianza | ${product.name}`}</title>
            <meta name="description" content="Description for Product Page" />
          </Helmet>
          <div className="ProductDetails">
            <div>
              <Carousel >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
<div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status: 
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out Of Stock" : " Available"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <br/>
              <h3 >Review the Product</h3>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
              </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

        </>
      )}
    </>
  );
}

export default ProductDetails;
