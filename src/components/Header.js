import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import {useHistory} from "react-router-dom";

  const Header = ({ children, hasHiddenAuthButtons }) => {

      const history=useHistory();
      //local storage
     const userName=localStorage.getItem("username")

      //login handler
      let handleLogout = () => {
        //Redirect to same page - /products
        history.push("/");
        //Refresh the page
        history.go();
        //Remove all items
        localStorage.clear();
      };


    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={()=>{history.push("/")}}
        >
          Back to explore
        </Button>
        ):(userName ?(
          <Stack direction="row" spacing={1} alignItems="center">
             
             <Avatar alt={userName}  src="/public/avatar.png" />
            <p>{userName}</p>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>

        ):(
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={()=>{history.push("/login")}}>
              Login
            </Button>
            <Button variant="contained" onClick={()=>{history.push("/register")}}>
              Register
            </Button>
          </Stack>
        ))}
      </Box>
    )
};

export default Header;
