import React from "react";
import css from "./ModalDailyCalories.module.css";
import { useMediaQuery } from "react-responsive";
import Header from "../Header/Header.jsx";

const ModalDailyCalories = ({ isOpen, onClose, onNavigate, results }) => {
  const isMobile = useMediaQuery({ maxWidth: 428 });
  if (!isOpen) return null; 

  return (
    <div className={css.modal}>
    
      <div className={css.modalContent}>
      
      {isMobile && <Header />}
      <button onClick={onClose} className={css.modalCloseBtn}> x</button>
    
      
        <p className={css.dailyParagraph}>Your reccomended daily calorie intake is: </p>
         <p className={css.dailyCalories}>{results.data.dailyCalories} <span className={css.dailyCaloriesSpan}>kcal</span></p> 
        <p className={css.dailyFoodsNotEat}>Foods you should not eat</p>
        <hr />
        <ol className={css.scrollable}>
          {[...new Set(results.data.notRecommended.map((item) => item.title))].map(
            (uniqueTitle, index) => (
              <li key={index} className={css.uniqueTitle}>{uniqueTitle}</li>
            )
          )}
        </ol>
       
        <button onClick={onNavigate} className={css.startLosingModalBtn}>Start Losing Weight</button>
        </div>
    </div>
  );
};

export default ModalDailyCalories;