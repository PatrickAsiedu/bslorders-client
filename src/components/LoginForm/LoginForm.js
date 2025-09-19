import React, { useState } from "react";
import Input from "../UI/Input";
import ToggleSwitch from "../UI/ToggleSwitch";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!/^[0][0-9]{9}$/.test(phone_number)) {
      errors.phone_number = "Phone number must start with 0 and be 10 digits.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLogInError("");
    const errors = validate();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoggingIn(true);
    const response = await dispatch(
      logInUser({ phone_number, password })
    ).unwrap();
    if (response.status === 202) {
      setIsLoggingIn(false);
      if (response.user.type === "user") {
        window.location.href = "/me";
      } else if (response.user.type === "chef") {
        window.location.href = "/chef";
      } else if (response.user.type === "admin") {
        window.location.href = "/admin";
      }
    } else {
      setLogInError(response.errorMessage);
      setIsLoggingIn(false);
    }
  };

  return (
    <form
      className="  flex flex-col mt-[22px] singup-form-shadow text-primary px-[22px] md:px-12  lg:px-[22px] 2xl:w-[516px] lg:mx-auto "
      onSubmit={onSubmitHandler}
    >
      <h1 className=" text-2xl font-semibold text-center mt-[40px] mb-[27px]">
        Nice to see you here
      </h1>
 <div className="space-y-4 w-full">
        <Input
          styling={
            "w-full border mt-[22px]  h-[61px] pl-6 outline-links "
          }
          label="Phone Number"
          placeholder="Enter Phone Number"
          id="Phone Number"
          type="text"
          title="Enter a valid phone number starting with 0 and of length 10"
          name="phone_number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {validationErrors.phone_number && (
          <p className="text-red-500 text-md mt-1">
            {validationErrors.phone_number}
          </p>
        )}
        <Input
          styling={"w-full border mt-[22px]  h-[61px] pl-6 outline-links "}
          label="Password"
          placeholder="Enter Password"
          id="Pasword"
          type="password"
          title="Enter password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 </div>
      {validationErrors.password && (
        <p className="text-red-500 text-md mt-1">{validationErrors.password}</p>
      )}
      <div className="flex justify-between mt-[38px] text-sm ">
        <div className="flex  items-center">
          <ToggleSwitch />

          <label className=" ml-2" htmlFor="rememberme">
            Remember me
          </label>
        </div>
        <Link className="text-links hover:underline" to="/resetpassword">
          Forgot Password ?
        </Link>
      </div>

      {/* jon added this to display error messages */}
      <div>
        <p className="text-notification font-normal text-center mt-8 ">
          {logInError}
        </p>
      </div>
      {/* jon added this to display error messages */}
      <button className="bg-primary h-[63px] w-full mt-6 text-white font-bold rounded-lg">
        {isLoggingIn ? "Logging you in..." : "Continue"}
      </button>
      <div className=" w-full border border-black/10 h-[0px] mt-10"></div>
      <div className="self-center mt-[38px] text-center pb-20 text-sm ">
        <span className=" font-normal text-forgotpassword ">
          Don't Have an account?
        </span>
        <span>
          <Link
            to="/register"
            className="hover:underline font-normal text-links ml-4  "
          >
            Sign up now
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
