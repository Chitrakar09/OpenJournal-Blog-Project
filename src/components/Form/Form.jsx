import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import authService from "../../appwrite/auth";
import { login as setLogin } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, InputField, Logo } from "../index";

function Form({ use = "login" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ error, setError ] = useState("");

  const checkUse = () => {

    //for login handling
    if (use.toLowerCase() === "login") {
      //async login function
      const login = async (data) => {
        setError("");
        try {
          const session = await authService.login(data);
          if (session) {
            const userData = authService.getUser();
            if (userData) dispatch(setLogin(userData));
            navigate("/allPost");
          }
        } catch (error) {
          setError(error);
        }
        //calling the function
        login();
      }
    }
    // for signup handling
    else if (use.toLowerCase() === "signup") {
      //async signup function
      const signup= async(data)=>{
        setError("");
        try {
          const session= await authService.createAccount(data);
          if(session){
            const userData= authService.getUser();
            if(userData) dispatch(setLogin(userData));
            navigate("/allPost");
          }
        } catch (error) {
          setError(error)
        }
      }
      signup();
    }
  };

  return (
    <>
      {/* flow of useForm Hook:  
        ...register takes the value from input field ==> handleSubmit checks what function to execute ==> the value obtained from ...register is sent as data parameter in the user given function to execute.
    */}

      <form
        className=" w-full max-w-md mx-auto bg-[#e5e5e5] p-6 rounded-xl shadow flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] xl:h-full"
        onSubmit={handleSubmit(checkUse)}
      >
        {/* Logo section */}
        <Logo />

        {/* error section */}
        {(error || errors?.email) && (
          <p className="w-full text-center text-sm text-red-600 font-medium mb-4 bg-red-100 border border-red-300 rounded px-3 py-2">
            {error || errors?.email?.message}
          </p>
        )}

        {/* Input field section */}

        {use.toLowerCase() === "signup" ? (
          <>
            <InputField
              label={"Enter Full Name"}
              type="text"
              name={"Full Name"}
              placeholder="Enter your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <InputField
              label={"Enter email"}
              type="email"
              name={"email"}
              placeholder="you@example.com"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </>
        ) : (
          <InputField
            label={"Enter email"}
            type="email"
            name={"email"}
            placeholder="you@example.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
        )}

        <InputField
          label="Password"
          type="Password"
          name="password"
          {...register("password", {
            required: true,
          })}
        />

        {/* button section */}

        {use.toLowerCase() === "signup" ? (
          <Button />
        ) : (
          <Button
            text="Login"
            type="submit"
            use="login"
            bgColor="bg-[#14213d]"
            hoverColor="hover:bg-[#1a2b4a]"
            activeColor="active:bg-[#0f1b2e]"
          />
        )}

        {/* check has account section */}
        {use.toLowerCase() === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-[#fca311] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-[#fca311] font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        )}
      </form>
    </>
  );
}

export default Form;
