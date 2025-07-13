import React from "react";
import css from "./AuthLayout.module.css";
import VectorBg from "../Images/vector.png";
import banana from "../Images/banana.png";
import leaves from "../Images/leaves.png";
import Strawberry from "../Images/strawberry.png";
import LeavesTablet from "../Images/leavesTablet.png";


function AuthLayout({ children }) {
  return (
    <div className={css.authContainer}>
         <div className={css.formWrapper}>
        {children}
      </div>
        <div className={css.imagesContainer}>
      <img src={VectorBg} alt="vector" className={css.vectorBg} />
      <img src={banana} alt="banana" className={css.bananaImg} />
      <img src={Strawberry} alt="strawberry" className={css.strawberryImg} />
      <img src={leaves} alt="leaves" className={css.leavesImg} />
      <img src={LeavesTablet} alt="leaves small" className={css.leavesTabletImg} />
      </div>
      
     
    </div>
  );
}

export default AuthLayout;