import React from 'react';
import { NavLink } from "react-router-dom";

function Brand() {
  return (
    <>
    <div className="brand">
      <NavLink to={'/'}>
      <img src={require('./fianza_logo.jpg')}/>
      </NavLink>
      <h1>Fianza</h1>
    </div>
    </>
  )
}

export default Brand;
