import { useState } from "react";
import { NavLink } from "react-router-dom";
import Brand  from './Brand.js';
import "../../Home/Home.css";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import './Search.css';
import { useSelector } from "react-redux";
import UserOptions from "../Header/UserOptions.js";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);

  const { isAuthenticated , user} = useSelector((state) => state.user);

 
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
        <div className="menu-icon" onClick={toggle}>
          <FiMenu
            style={{
              width: "32px",
              height: "32px",
            }}
          />
        </div>
        <div className={`nav-elements  ${isOpen && "active"}`}>
          <div className="new">
          <ul>
            <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/contact">Contact Us</NavLink>
            </li>
           {!isAuthenticated && <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/login">Login</NavLink>
            </li>}
            <li>
              <NavLink onClick={toggle} onBlur={hide} onFocus={show} to="/cart" >Cart</NavLink>
            </li>
            {isAuthenticated && <li onBlur={hide} onFocus={show}>
              <UserOptions user={user}/>
            </li>}
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
