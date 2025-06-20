import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import authService from "../../appwrite/auth";
import { login as setLogin } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, InputField, Logo } from "../index";

// Helper to make error messages user-friendly
function getFriendlyError(error) {
  if (!error) return "Something went wrong.";
  if (typeof error === "string") return error;

  // Appwrite error codes/messages
  if (error.code === 401 || /invalid credentials/i.test(error.message)) {
    return "Incorrect email or password.";
  }
  if (error.code === 409 || /already exists/i.test(error.message)) {
    return "Account already exists.";
  }
  if (/email/i.test(error.message) && /invalid/i.test(error.message)) {
    return "Invalid email address.";
  }
  if (/password/i.test(error.message) && /short/i.test(error.message)) {
    return "Password is too short.";
  }
  // Add more custom mappings as needed

  return error.message || "An unexpected error occurred.";
}

function Form({ use = "login" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [ Error, setError ] = useState("");
  const [ userId, setUserId ] = useState("");

  const checkUse = (data) => {

    //for login handling
    if (use.toLowerCase() === "login") {
      //async login function
      const loginFunction = async (data) => {
        console.log(data);
        setError("");
        try {
          const session = await authService.login(data);
          if (session && session.code) {
            setError(session.message || "Login failed");
            return; // Stop here, do not navigate
          }
          if (session) {
            await authService.getUser().then((userData) => {
              if (userData) {
                dispatch(setLogin(userData));
                navigate("/");
              }
            })
          }

        } catch (error) {
          setError(error);
          console.log("hi from form login function")
        }

      }
      loginFunction(data);
    }

    // for signup handling
    else if (use.toLowerCase() === "signup") {
      //async signup function
      const signup = async (data) => {
        setError("");
        try {
          console.log(userId);
          const session = await authService.createAccount({ email: data.email, password: data.password, userId: userId });
          // Check if session is an error
          if (session && session.code) {
            setError(session.message || "Signup failed");
            return; // Stop here, do not navigate
          }
          if (session) {
            const userData = await authService.getUser();
            if (userData) dispatch(setLogin(userData));
            navigate("/");
          }
        } catch (error) {
          setError(error?.message || String(error));
        }
      }
      signup(data);
    }
  };

  //generating userId from name

  // converting spaces and alphanumeric value to "-" eg:your-full-name
  const nameToId = useCallback((value) => {
    if (value && typeof value === "string") {
      let id = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9._-]+/g, "-") // only allow a-z, A-Z, 0-9, ., -, _
        .replace(/^-+/, "") // remove leading hyphens
        .replace(/-+$/, ""); // remove trailing hyphens
      if (!/^[a-zA-Z0-9]/.test(id)) {
        id = "user-" + id; // ensure it starts with a letter or number
      }
      return id.slice(0, 36); // max 36 chars
    }
    return "";
  }, [])

  //every time, title's input changes, post id is set.
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name') setUserId(nameToId(value.name));
    })

    return () => subscription.unsubscribe();

  }, [ watch, nameToId, ])

  return (
    <>
      {/* flow of useForm Hook:  
        ...register takes the value from input field ==> handleSubmit checks what function to execute ==> the value obtained from ...register is sent as data parameter in the user given function to execute.
    */}

      <form
        className=" w-full max-w-md mx-auto bg-[#e5e5e5] p-6 rounded-xl shadow flex flex-col items-center justify-evenly min-h-[300px] md:min-h-[400px] xl:h-full"
        onSubmit={handleSubmit(checkUse)}
      >
        {/* Logo section */}
        <Logo />

        {/* title section */}
        {use.toLowerCase() === "signup" ? (
          <h1 className="text-2xl font-bold text-[#14213d] mb-4 w-full text-center">Sign Up</h1>) : (
          <h1 className="text-2xl font-bold text-[#14213d] mb-4 w-full text-center">Login</h1>)}

        {/* error section */}
        {(Error || errors?.email) && (
          <p className="w-full text-center text-sm text-red-600 font-medium mb-4 bg-red-100 border border-red-300 rounded px-3 py-2">
            {Error ? getFriendlyError(Error) : errors?.email?.message}
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
            bgColor="bg-[#fca311]"
            hoverColor="hover:bg-[#14213d]"
            activeColor="active:bg-[#0f1b2e]"
          />
        )}

        {/* check has account section */}
        {use.toLowerCase() === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-[#b1710b] text-xl font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-[#b1710b] text-xl font-medium hover:underline"
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
