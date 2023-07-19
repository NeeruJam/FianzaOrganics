import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import Navbar from "./component/layout/Navbar/Navbar.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Josefin Sans", "Dancing Script", "Droid Sans", "Chilanka"],
      },
    });

      store.dispatch(loadUser());

      getStripeApiKey();
  }, []);

 
  
  return (


    <Router>
      <Navbar />


      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" element={<Payment/>} />
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
       
        <Route exact path="/product/:id" element={<ProductDetails />} />
       
        <Route exact path="/products" element={<Products />} />
       
        <Route path="/products/:keyword" element={<Products />} />
       
        <Route exact path="/login" element={<LoginSignUp />} />
        
        <Route exact path="/about" element={<About />} />
        
        <Route exact path="/contact" element={<Contact />} />
        
        {loading === false && isAuthenticated  &&<Route  exact path="/account" element={<Profile />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/me/update" element={<UpdateProfile />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/password/update" element={<UpdatePassword />} />}
      
        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/cart" element={<Cart />} />

        {loading === false && isAuthenticated  &&<Route  exact path="/login/shipping" element={<Shipping />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/order/confirm" element={<ConfirmOrder />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/success" element={<OrderSuccess />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/orders" element={<MyOrders />} />}

        {loading === false && isAuthenticated  &&<Route  exact path="/order/:id" element={<OrderDetails />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/dashboard" element={<Dashboard />} />}

        
        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/products" element={<ProductList />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/product" element={<NewProduct />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/product/:id" element={<UpdateProduct />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/orders" element={<OrderList />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/order/:id" element={<ProcessOrder />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/users" element={<UsersList />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/user/:id" element={<UpdateUser />} />}

        {loading === false && isAuthenticated  &&<Route isAdmin ={true} exact path="/admin/reviews" element={<ProductReviews />} />}

        {/* <Route path ="*" element={<NotFound/>}/> */}
     
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
