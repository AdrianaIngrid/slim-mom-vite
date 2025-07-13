import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from './LoginSchema'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../AREDUX/Auth/operations';
import AuthLayout from '../AuthLayout/AuthLayout.jsx';
import css from "./LoginForm.module.css"


const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form values:", values); 
    try {
    
    const response =  await dispatch(login(values));
    console.log('Full server response:', response);
    if (response.error) {
      console.error('Login error:', response.error);
      alert('Login failed! Please check your credentials and try again.');
      return; 
    }
    
      alert('Login successful!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials and try again.');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
   < AuthLayout>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div >
          <div className={css.formElements}>
            <p className={css.LoginW}>Log In</p>
            <label htmlFor="email"className={css.labelForm}>Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Email*"
              autoComplete="email"
              className ={css.loginField}
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div>
            <label htmlFor="password" className={css.labelForm}>Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Pasword*"
              autoComplete="current-password"
              className ={css.loginField}
            />
            <ErrorMessage name="password" component="div" className={css.error} />
          </div>
          </div>
          <button type="submit" disabled={isSubmitting} className={css.loginBtnPgLogin}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <button type='button' onClick={()=> navigate("/register") } className={css.RegLoginPgBtn}>Register</button>
        </Form>
      )}
    </Formik>
    </AuthLayout>
  );
};

export default LoginForm;
