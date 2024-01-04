import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import * as Yup from "yup";
import { RegisterUserAction } from "../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {firstName:"",lastName:"", email: "", password: "",gender:"" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be least 6 characters")
    .required("Password is required"),
};
const Register = () => {
  const [gender,setGender]=useState();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (values) => {
   values.gender=gender
    console.log("handle submit",values);
    dispatch(RegisterUserAction({data:values}))
  };

  const handleChange=(event)=>{
    setGender(event.target.value);

  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-1">
          <div className="space-y-1">
          <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="Enter full name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Enter last Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
           
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Enter email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Enter password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <RadioGroup row aria-label="gender" name="gender"  onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                <FormControlLabel value="othes" control={<Radio/>} label="Other"/>
              </RadioGroup>
            </div>
          </div>
          <Button sx={{padding:"10px",backgroundColor:"#2179A8",color:"white",marginTop:"20px"}} fullWidth type="submit" variant="contained" >Sign-UP</Button>
        </Form>
      </Formik>
      <div style={{marginTop:"10px",marginBottom:"-10px",display:"flex"}}>
        <p style={{marginTop:"15px"}}>Already have an account? </p>
        <span><Button onClick={()=>navigate("/")}  sx={{padding:"10px",color:"#2179A8",marginTop:"10px",marginLeft:"60%"}} >Login</Button></span>
      </div>
    </>
  );
};

export default Register;
