import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import authService from '../../appwrite/auth'
import { logout } from '../../features/auth/authSlice'

function Button({
  text = "Sign Up",
  type = "submit",
  use = "signup",
  bgColor = "bg-[#14213d]",
  hoverColor = "hover:bg-[#1a2b4a]",
  activeColor = "active:bg-[#0f1b2e]",
  className = "",
  ...props
}) {

  const dispatch = useDispatch();
  const navigate = useNavigate(); //this hook forcefully navigates to another page if called.

  //button functions

  // Logout function
  const logoutBtn = () => {
    authService.logout().
      then(() => { dispatch(logout()) });
  }

  // Login button used to navigate to login page
  const loginBtn = () => {
    navigate("/login") // redirects to login page on click if the use is login
  }


  // According to the use of the button, respective function is called
  const checkUse = () => {
    console.log("use", use);
    // no need to check for post, signup and login(not the navigation one) as its type is submit and automatically submits the form and done. 
    //navigated login
    if (use.toLowerCase() === "navlogin") {
      loginBtn();
    }
    //logout
    else if (use.toLowerCase() === "logout") {
      logoutBtn();
    }
    //signup and login
    else if (use.toLowerCase() === "signup" || use.toLowerCase() == "login") {
      return null // does nothing and returns to form
    }
    //post
    else if (use.toLowerCase() === "postsubmit") {
      return null; // does nothing and returns to form
    }
  };

  return (
    <button
      type={type}
      onClick={() => checkUse()}
      className={`${bgColor} text-white font-semibold px-5 py-1 text-lg text-center rounded-lg transition ${hoverColor} ${activeColor} ${className}`}
    >{text}</button>
  );
}

export default Button;
