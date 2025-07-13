import React from "react";
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header/Header.jsx";
import RegisterPage from "../components/APAGES/RegistrationPage.jsx";
import LoginPage from "./APAGES/LoginPage.jsx";
import Form from "./Form/Form.jsx";
import Diary from "../components/Diary/Diary.jsx";
import '../index.css';
import { Suspense } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../components/AREDUX/Auth/operations.js";
 import { logout } from "../components/AREDUX/Auth/operations.js";
 import { store } from "../components/AREDUX/store.js";

import css from "./App.module.css";
import UserForm from "./UserForm/UserForm.jsx";

const isProduction = import.meta.env.MODE === "production";
const basename = isProduction ? "/slim-mom-vite/" : "/";



function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (store.getState().auth.token) {
      // Avem un token în Redux (persistat)
      // Verificăm dacă e valid apelând /api/currentUser
      dispatch(getUserInfo()).unwrap().catch(() => {
        // Dacă e invalid => logout
        dispatch(logout());
      });
    }
  }, [dispatch]);
  return (
    <BrowserRouter basename={basename}>

      <div className={css.back}>
      <Header />
      <hr className={css.ruleHoriz}/>
      <Suspense fallback= {<p>Loading....</p>}>
      
      
      
      <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<UserForm/>} />
      <Route path="/diary" element={<Diary/>} />
      <Route path="/home" element={<Form />} />
         <Route path="*" element={<Form/>} />
      </Routes>
      </Suspense>
      </div>
    
    </BrowserRouter>
  );
}



export default App;
