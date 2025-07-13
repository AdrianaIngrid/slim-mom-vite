import React from "react";
import css from "./PageStyles.module.css";
import LoginForm from "../LoginForm/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div className={css.pageContainer}>
      <LoginForm/>
      <nav className={css.nav}>
       </nav>
      
    </div>
  );
};

export default LoginPage;