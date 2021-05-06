import React, { useState } from "react";
import Axios from "axios";
import "../styles/loginPage.scss";
//import { useHistory } from "react-router";
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

const LoginPage = () => {
  // const [emailReg, setEmailReg] = useState("");
  // const [nicknameReg, setNicknameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");
  // const [passwordLog, setPasswordLog] = useState("");
  // const [emailLog, setEmailLog] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  

  const handleRegister = (values) => {
    Axios.post("http://localhost:8080/register", {
      email: values.emailReg,
      nick: values.nick,
      password: values.passwordReg,
    }).then((res) => {
      if (res.data.message){
        setRegisterStatus(res.data.message)
      }
    });
  };


  const handleLogin = (values) => {
    Axios.post("http://localhost:8080/login", {
      email: values.emailLog,
      password: values.passwordLog,
    }).then((res) => {
      if (res.data.message){
        setLoginStatus(res.data.message)
      }
      else{
        setLoginStatus(res.data[0].nick)
      }
      
    });
  };

  const CustomTextInput = ({label, ...props}) =>{
    const [field, meta] = useField(props);

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ): null}
      </>
    )
  }


  return (
    <div className = "login-page">
    <Formik
    initialValues={{
      nick: "",
      emailReg: "",
      passwordReg: "",
      confirmPasswordReg: "",
      file: null,
    }}

    validationSchema = {Yup.object({
      nick: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at 30 characters or less")
      .required("Required"),
      emailReg: Yup.string()
      .email("Invalid email address")
      .required("Required"),
      passwordReg: Yup.string()
      .matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          )
      .required("Required"),
      confirmPasswordReg: Yup.string()
      .oneOf([Yup.ref("passwordReg"), null], "Password must match")
      .required("Required")

    })}

    onSubmit={(values, {setSubmitting, resetForm}) =>{
      setTimeout(() => {
        handleRegister(values)
        resetForm();
        setSubmitting(false);
      }, 2000)
    }}
    >
      
      
      {props => (
        
        <Form className="register-panel">

          <h1>Register</h1>
          <CustomTextInput label="Nick" name = "nick" type="text" placeholder="nick" />
          <CustomTextInput label="Password" name = "passwordReg" type="password" placeholder="smth" />
          <CustomTextInput label="Confirm Password" name = "confirmPasswordReg" type="password" placeholder="smth" />
          <CustomTextInput label="Email" name = "emailReg" type="email" placeholder="smth@smth.com" />
          <button type = "submit">{props.isSubmitting ? "Loading..." : "Submit"}</button>

          <h1>{registerStatus}</h1>

        </Form>

       
      )}
      
    </Formik>
        <Formik
    initialValues={{
      emailLog: "",
      passwordLog: "",
    }}

    validationSchema = {Yup.object({
      emailLog: Yup.string()
      .email("Invalid email address")
      .required("Required"),
      passwordLog: Yup.string()
      .required("Required"),
    })}

    onSubmit={(values, {setSubmitting, resetForm}) =>{
      setTimeout(() => {
        handleLogin(values)
        resetForm();
        setSubmitting(false);
      }, 2000)
    }}
    >
      
      
      {props => (
        
          
        <Form className="login-panel">
          <h1>Log in</h1>

          <CustomTextInput label="Email" name = "emailLog" type="email" placeholder="smth@smth.com" />
          <CustomTextInput label="Password" name = "passwordLog" type="password" placeholder="smth" />
          <button type = "submit">{props.isSubmitting ? "Loading..." : "Submit"}</button>

          <h1>{loginStatus}</h1>

        </Form>

     
      )}
      
    </Formik>
    </div>
  


    // <div className="login-page">
    //   <div className="login-panel">
    //     <h1>Login</h1>
    //     <label>
    //       e-mail
    //       <input placeholder="e-mail" type="email" 
    //       value = {emailLog}
    //       onChange={(e) => setEmailLog(e.target.value)}
    //       />
    //     </label>

    //     <label>
    //       password
    //       <input placeholder="password" type="password" 
    //       value = {passwordLog}
    //       onChange={(e) => setPasswordLog(e.target.value)}
    //       />
    //     </label>
    //     <button onClick={handleLogin}>Login</button>
    //   </div>
    //   

    //   <div className="register-panel">
    //     <h1>Register</h1>
    //     <label>
    //       e-mail
    //       <input
    //         type="email"
    //         value={emailReg}
    //         onChange={(e) => setEmailReg(e.target.value)}
    //       />
    //     </label>

    //     <label>
    //       nickname
    //       <input
    //         type="text"
    //         value={nicknameReg}
    //         onChange={(e) => setNicknameReg(e.target.value)}
    //       />
    //     </label>

    //     <label>
    //       password
    //       <input
    //         type="password"
    //         value={passwordReg}
    //         onChange={(e) => setPasswordReg(e.target.value)}
    //       />
    //     </label>
    //     <button onClick={handleRegister}>Register</button>
    //   </div>
    // </div>
  );
};

export default LoginPage;
