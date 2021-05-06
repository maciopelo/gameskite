import React from "react";
import "../styles/navMenu.scss";
import kite from "../assets/kite.png"
import { NavLink } from "react-router-dom";



const Logo = () => { 
  return (
    <div className="site-logo">
      <NavLink className="logo-link" to="/" exact>
        <span className="logo-text" style={{textDecoration:"none"}}>GamesKite</span>
        <img src={kite} className="logo-img"/>
      </NavLink>
    </div>
  )
}

const MenuButton = ({value}) => {
  return (
    <NavLink className="logo-link" to="/login">
      <div className="menu-button">
        <span>{value}</span>
      </div>
    </NavLink>
);
}
 

const Menu = () => {
  return (
    <nav className="menu">
      <Logo/>
      <MenuButton value={"Login"}/>
    </nav>
  );
};

export default Menu;
