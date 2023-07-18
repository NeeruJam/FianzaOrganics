import React from 'react';
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className='footer'>
        <div className="leftFooter">
        <h5 >Quick Links</h5>
        <ul>
            <li><a href="">About Us</a></li>
            <li><a href="">Terms & Conditions</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">Disclaimer</a></li>
            
        </ul>

        
      </div>

       <div className="midFooter">
        <h1>Fianza Organics by Vigna</h1>
        <p>100% Handmade organic products with no harsh chemicals</p>

      </div>

      <div className="rightFooter">
        <h5>Follow Us</h5>
        <a href="https://www.instagram.com/fianza_organics/">Instagram</a>
        
      </div>
      </div>
    </footer>
  )
}

export default Footer
