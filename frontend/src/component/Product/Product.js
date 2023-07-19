import React from 'react';
import {Link} from 'react-router-dom';
import './Product.css';
import { Rating } from "@material-ui/lab";
import 'react-responsive-carousel/lib/styles/carousel.min.css';



function Product({product}) {

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
    <Link className='productCard' to ={`/product/${product._id}`}>
      <div>
      <img src={product.images[0].url} alt='product_image'/>
      <h4>{product.name}</h4>
      <div>
        <Rating {...options} />{" "}
        
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>

    <span>{`₹${product.price}`}</span>
      </div>
    </Link>
    </>
  );
}

export default Product;
