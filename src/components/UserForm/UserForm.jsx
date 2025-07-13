import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryPanel from "../SummaryPanel/SummaryPanel.jsx";
import css from "./UserForm.module.css";
function UserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState({
    left: 0,
    consumed: 0,
    dailyCalories: 0,
    percentageOfNormal: 0,
  });
  const [foodNotRecommended, setFoodNotRecommended] = useState([]);
 
  const [formData, setFormData] = useState({
    height: "",
    currentWeight: "",
    desiredWeight: "",
    age: "",
    bloodType: 1,
    consumed: 0,
    error: null,
  });
 
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,  [name]: name === "bloodType" ? Number(value) : value, error: null,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { height, desiredWeight, currentWeight, age } = formData;

    if (!height || !desiredWeight || !currentWeight || !age) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Please fill in all required fields.",
      }));
      setIsLoading(false);
      return;
    }
    if (height <= 0 || age <= 0 || currentWeight <= 0 || desiredWeight <= 0) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Please enter valid positive numbers!",
      }));
      setIsLoading(false);
      return;
    }
    
  
    try {
      const response = await fetch('http://localhost:3000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const dataResponse = await response.json();
      setSummary({
        left: dataResponse.data.left || 0,
        consumed: dataResponse.data.consumed || 0,
        dailyCalories: dataResponse.data.dailyCalories || 0,
        percentageOfNormal: dataResponse.data.percentageOfNormal || 0,
      });
  
      setFoodNotRecommended(dataResponse.data.notRecommended || []);
    
     setIsLoading(false);
     
     navigate('/diary', { state: dataResponse });
    } catch (error) {
      setIsLoading(false);
      console.error('Error calculating daily calories:', error);
      console.error("Error calculating daily calories:", error);
      setFormData((prevData) => ({
        ...prevData,
        error: "Something went wrong. Please try again.",
      }));
    }
  };


 
  return (
    <div className= {css.sideBySide} >
      <div className={css.userDiv}>
      <h2 className={css.titleForm}>Calculate your daily calorie intake right now</h2>
      {formData.error && <p className={css.error}>{formData.error}</p>}
      {isLoading && <p>Loading...</p>}
    <form className={css.formDates} onSubmit={handleSubmit}>
      
      <input
        type="number"
        name="height"
        placeholder="Height *"
        value={formData.height}
        onChange={handleChange}
        required
        className={css.inputFormDates}
      />
      
      <input
        type="number"
        name="desiredWeight"
        placeholder="Desired weight *"
        value={formData.desiredWeight}
        onChange={handleChange}
        required
        className={css.inputFormDates}
      />
           <input
        type="number"
        name="age"
        placeholder="Age *"
        value={formData.age}
        onChange={handleChange}
        required
        className={css.inputFormDates}
      />
      <input
        type="number"
        name="currentWeight"
        placeholder="Current weight *"
        value={formData.currentWeight}
        onChange={handleChange}
        required
        className={css.inputFormDates}
      />
      <div className={css.bloodType}>
        <p>BloodType *</p>
        <label>
          <input
            type="radio"
            name="bloodType"
            value="1"
            checked={formData.bloodType === 1}
            onChange={handleChange}
            className={css.inputRadio}
          />
          1
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value="2"
            checked={formData.bloodType === 2}
            onChange={handleChange}
          />
          2
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value="3"
            checked={formData.bloodType === 3}
            onChange={handleChange}
          />
          3
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value="4"
            checked={formData.bloodType === 4}
            onChange={handleChange}
          />
          4
        </label>
   
      </div>
      <button type="submit"className = {css.startBtn} disabled={isLoading}> {isLoading ? "Calculating..." : "Start losing weight"}</button>
    </form>
    </div>
    <SummaryPanel 
  summary={{
    left: summary.left || 0,
    consumed: summary.consumed || 0,
    dailyCalories: summary.dailyCalories || 0,
    percentageOfNormal: summary.percentageOfNormal || 0,
  }} 
  foodNotRecommended={foodNotRecommended || []} 
  className={css.summaryPanelUser} 
/>
  
      </div>
  );
}

export default UserForm;