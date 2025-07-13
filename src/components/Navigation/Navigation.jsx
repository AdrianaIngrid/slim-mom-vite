import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";


export const Navigation = () => {
  const location = useLocation();
  return (
    <div className={css.navPage}>
   
      <nav>
        
        {location.pathname === "/login" && (
          <NavLink to="/register">
            {" "}
            <button className={css.btnLinkRegister}>Register</button>
          </NavLink>
        )}

        <br />
        {location.pathname === "/register" && (
          <NavLink to="/login">
            {" "}
            <button>Login</button>
          </NavLink>
        )}
      </nav>
    </div>
  );
};
export default Navigation;
