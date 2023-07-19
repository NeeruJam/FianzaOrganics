import { useState } from "react";
import { NavLink } from "react-router-dom";
import Brand  from './Brand.js';
import "../../Home/Home.css";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import './Search.css';
import { useSelector } from "react-redux";
import UserOptions from "../Header/UserOptions.js";
import Cart from "../../Cart/Cart.js";

function Navbar() {

  const { isAuthenticated , user} = useSelector((state) => state.user);

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };
  return (
    <nav className="navbar">
      <div className="container">
        <div >
          <Brand />
          </div>
         <div className="searchBox">
          <form  onSubmit={searchSubmitHandler}>
            
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FiMenu
            style={{
              width: "32px",
              height: "32px",
            }}
          />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <div className="new">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
           {!isAuthenticated && <li>
              <NavLink to="/login">Login</NavLink>
            </li>}
            <li>
              <NavLink to="/cart" >Cart</NavLink>
            </li>
            
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
