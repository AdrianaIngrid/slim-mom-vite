import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from './RegisterSchema'; 

import { register } from '../AREDUX/Auth/operations'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../AuthLayout/AuthLayout.jsx';
import css from "./RegistrationForm.module.css";

const RegisterForm = () => {

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    
      const { confirmPassword: _unused, ...payload } = values;
      console.log("Payload to be sent:", payload);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      console.log("Before dispatch...");
      await dispatch(register(payload)).unwrap();
      
      setSuccessMessage('User registered successfully! Please go to email!');
      resetForm(); 
    } catch (error) {
      console.error("Error during registration:", error); 
      setErrorMessage(error || 'Registration failed!');
    } finally {
      console.log("Finished submission");
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form  className={css.registerForm}>
          <div>
            <p className={css.RegisterW}>Register</p>
            <label htmlFor="username" className={css.labelForm}>Name</label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Name*"
              className ={css.registerField}
            />
            <ErrorMessage name="username" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="email" className={css.labelForm} >Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Email*"
              className ={css.registerField}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="password" className={css.labelForm}>Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password*"
              className ={css.registerField}
            />
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={css.labelForm}>Confirm Password</label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              className ={css.registerField}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={css.error}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className={css.registerBtnPgRegister}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className={css.error}>{errorMessage}</p>}
          <button type='button' onClick={()=> navigate("/login") }className={css.loginRegisterPgBtn}>Log in</button>
        </Form>
      )}
    </Formik>
    </AuthLayout>
  );
};

export default RegisterForm;