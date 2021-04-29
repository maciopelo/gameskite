import React from "react";
import "../styles/navMenu.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="menu">
      <div className="site-logo">
        <p>
          <NavLink to="/" exact>
            Logo
          </NavLink>
        </p>
      </div>
      <div className="actual-menu">
        <p>
          <NavLink to="/login"> Login </NavLink>
        </p>
      </div>
    </nav>
  );
};

export default Menu;
