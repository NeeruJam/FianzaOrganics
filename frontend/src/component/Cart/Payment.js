import React, {useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from 'react-helmet-async';
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import { clearCart } from "../../actions/cartAction.js";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 

function Payment() {
    
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
  
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
  
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
  
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
   
    const submitHandler = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;
      
      payBtn.current.disabled = true;

    
      try {
        
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
            
          "/api/v1/payment/process",
          paymentData,
          {headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/json',
            Pragma: 'no-cache',
            'Authorization': `Bearer rk_test_51NTN0uSAgHaIGpquzTXRk0TUDM5lWDTe7iIlPOvm0Ub8Neftn3epQ85BqtFVG45HZt8BxIAssEvHFE9LIn48dosf00j0jVyO6B`
        }}
        );
  
        const client_secret = await data.client_secret;
  
        
  
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });
  
        if (result.error) {
          payBtn.current.disabled = false;
  
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
  
            dispatch(createOrder(order));
  dispatch(clearCart());
           navigate("/success");
          } else {
            alert.error("There's some issue while processing payment ");
           }
         }
       } 
       catch (error) {
        payBtn.current.disabled = false;
        console.log(error)
        alert.error(error.response.data.message);
      }
    };
  console.log(error)
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error, alert]);

 
  
    return (
      <>
         <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description for Home Page"/>
      </Helmet>
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}> 
             <Typography>Card Info</Typography>
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>
  
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />

           </form> 
        </div>
      </>
    );
}

export default Payment;
