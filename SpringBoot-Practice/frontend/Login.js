import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { loginUserAction } from "../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS } from "../Redux/Auth/auth.actionType";
import axios from "axios";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be least 6 characters")
    .required("Password is required"),
};
const Login = () => {
  const [formValue, setFormValue] = useState();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit = async(values) => {
    console.log("handle submit",values);
    
   try{
    const response =await axios.post("http://localhost:9090/auth/signin",values);
    const token = response.data.token;
    localStorage.setItem("jwt", token);
    console.log("Token stored:", token);

    dispatch(loginUserAction({data:values,type: LOGIN_SUCCESS}));
    
   }catch(error){
    console.log("Error---",error.response.data)
   }

  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
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
          </div>
          
          <Button sx={{padding:"10px",backgroundColor:"#2179A8",color:"white",marginTop:"20px"}} fullWidth type="submit" variant="contained" >Login</Button>
        </Form>
      </Formik>
      <div style={{marginTop:"10px",display:"flex"}}>
        <p style={{marginTop:"15px"}}>Don't have an account? </p>
        <span><Button onClick={()=>navigate("/register")} sx={{padding:"10px",color:"#2179A8",marginTop:"10px",marginLeft:"60%"}}  >Register</Button></span>
      </div>
    </>
  );
};

export default Login;
