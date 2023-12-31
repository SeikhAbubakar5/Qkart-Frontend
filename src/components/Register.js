import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history=useHistory()
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
const [isLoading, setIsLoading]=useState(false)
  function changeHandler(e) {
    setUserData({
      ...userData,[e.target.name]:e.target.value
    });
  }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function

  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    setIsLoading(true);
      const URL = `${config.endpoint}/auth/register`;
      const loadData = {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
    
      const responseLoadData = {
        username: formData.username,
        password: formData.password
      };
      
      try {
        if (validateInput(loadData)) {
          const response = await axios.post(URL, responseLoadData);
          if(response.data.success){
         // console.log(response)
          enqueueSnackbar("Registered successfully", { variant: "success" });
          history.push("/login")
          }
        }
      } catch (e) {
        if (e.response && e.response.status === 400) {
          enqueueSnackbar(`${e.response.data.message}`, { variant: "error" });
        } else {
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable, and returns valid JSON.", { variant: "error" });
        }
      
    }
    setIsLoading(false);
  };
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
      if(data.username===""){
        enqueueSnackbar("Username is a required field", {variant: "alert"})
        return(false)
      }
      else if(data.username.length<6){
        enqueueSnackbar("username must be atleast 6 char", {variant: "alert"})
        return(false)
      }
    else if(data.password===""){
        enqueueSnackbar("Password is a required field", {variant: "alert"})
        return(false)
      }
     
     else if(data.password.length<6){
        enqueueSnackbar("password must be atleast 6 char", {variant: "alert"})
        return(false)

      }else if(data.password!==userData.confirmPassword){
        enqueueSnackbar("password do not match", {variant: "alert"})
        return(false)
      }else{
        return(true)
      }

      };
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={changeHandler}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={changeHandler}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={changeHandler}
          />
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="success" size={25} />
            </Box>
          ) : (
        <Button className="button" variant="contained" onClick={async()=>await register(userData)} >
            Register Now
           </Button>
        )}
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login"> 
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
