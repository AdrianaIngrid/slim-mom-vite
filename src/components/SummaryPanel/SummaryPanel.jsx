import React from 'react';
import css from './SummaryPanel.module.css';

const SummaryPanel = ({ summary = {}, foodNotRecommended = [], selectedDate}) => {
  const { left = 0, consumed = 0, dailyCalories = 0, percentageOfNormal = 0 } = summary || {};
  console.log("Summary:", summary, "Food Not Recommended:", foodNotRecommended, "Selected Date:", selectedDate);
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    console.error("Invalid summary data:", summary);
    return <p>Error loading summary data</p>;
  }
  const validFoodList = Array.isArray(foodNotRecommended) ? foodNotRecommended : [];
  console.log("validFoodList:", validFoodList);
  return (
    <div className={css.summaryPanelDiv}>
        <h3 className={css.summaryDate}>
        Summary for {
    selectedDate && !isNaN(new Date(selectedDate))
      ? new Date(selectedDate).toLocaleDateString()
      : new Date().toLocaleDateString() // data curentă
  }
      </h3>
      <div className={css.summaryParagraph}>
        <p>
          Left:
          <span className={css.rightValue}>{left.toFixed(0) || '000'} kcal</span>
        </p>
        <p>
          Consumed:
          <span className={css.rightValue}>
            {consumed.toFixed(0) || '000'} kcal
          </span>
        </p>
        <p>
          Daily rate:
          <span className={css.rightValue}>
            {dailyCalories.toFixed(0) || '000'} kcal
          </span>
        </p>
        <p>
          n% of normal:
          <span className={css.rightValue}>
            {percentageOfNormal || '000'} %
          </span>
        </p>
      </div>
      <h4 className={css.summaryFoodTitle}>Food not recommended</h4>
      
      <ol className={css.foodList}>
        {validFoodList.length > 0 ? (
          validFoodList.map((food, index) => <li key={index}>{food.title}</li>)
        ) : (
          <li>Your diet will be displayed here</li>
        )}
      </ol>
    </div>
  );
};

export default SummaryPanel;
