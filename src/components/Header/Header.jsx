import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../AREDUX/Auth/selectors";
import { logout } from "../AREDUX/Auth/operations";
import logoImage from "../Images/slimLogo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import css from "./Header.module.css";

function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  console.log("Header: isLoggedIn:", isLoggedIn);
  console.log("Header: user:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
  
    await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  console.log("Header Component: Rendered with", { isLoggedIn, user });
  return (
    <div className={css.headerDiv}>
      <img  src={logoImage} alt="logoImageSlimMom" className={css.logoImg}/>
    <header className={css.headerH}>
      
      <nav>
        <NavLink to ="/home"className={css.slimWord}>Slim<span className={css.span1}>Mom</span></NavLink>
       <span className={css.span2} >___</span>
       
       {isLoggedIn ? (
        <nav className={css.navBar}>
          <ul className={css.navLinks}>
            
            <li>
              <NavLink to="/diary" className={css.link}>
                Diary
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={css.link}>
                Calculator
              </NavLink>
            </li>
            </ul>
            <ul className={css.navRight}>
            <li>
              <span className={css.user}>{user.username}</span>
            </li>
            <li><span className={css.spanUser}>|</span></li>
            <li>
              <button onClick={handleLogout} className={css.logoutButton} >
                Exit
              </button>
            </li>
          </ul>
          </nav>
          
        ) : (
          <ul className={css.navLinks}>
            <li>
              <NavLink to="/login" className={css.link} >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={css.link}>
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
      
    </header>
    
    </div>
  );
}
export default Header;