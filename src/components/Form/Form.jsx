import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDailyCalories from "../ModalDailyCalories/ModalDailyCalories.jsx";
import css from "./Form.module.css";
import AuthLayout from "../AuthLayout/AuthLayout.jsx";
function Form() {
  const [formData, setFormData] = useState({
    height: "",
    currentWeight: "",
    desiredWeight: "",
    age: "",
    bloodType: 1,
    consumed: 0,
  });
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData,  [name]: name === "bloodType" ? Number(value) : value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { height, desiredWeight, currentWeight, age } = formData;

  if (!height || !desiredWeight || !currentWeight || !age) {
    alert("Please fill in all required fields.");
    return;
  }
    try {
      const response = await fetch('http://localhost:3000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height: formData.height,
          desiredWeight: formData.desiredWeight,
          currentWeight: formData.currentWeight,
          age: formData.age,
          bloodType: formData.bloodType,
          consumed: 0, 
        }),
      });
      const data = await response.json();
      console.log('Saved daily rate:', data.data.dailyCalories);
      setResults(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error calculating daily calories:', error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };
  return (
 <AuthLayout>
     
    <div className={css.divForm}>
      <h2 className={css.titleForm}>Calculate your daily calorie intake right now</h2>
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
            className={css.inputRadio}
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
            className={css.inputRadio}
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
            className={css.inputRadio}
          />
          4
        </label>
   
      </div>
      <button type="submit"className = {css.startBtn}>Start losing weight</button>
    </form>
    
    <ModalDailyCalories
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigateToRegister}
        results={results}
      />
      </div>
      </AuthLayout>
  );
}

export default Form;