import React, { useState } from "react";
import Input from "../UI/Input";
import { Link } from "react-router-dom";
import API from "../../network/api";

const ResetPasswordForm = () => {
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [resetting, isResetting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    // Phone number: must start with 0, be 10 digits, and only numbers
    if (!phone_number) {
      errs.phone_number = "Phone number is required.";
    } else if (!/^0\d{9}$/.test(phone_number)) {
      errs.phone_number =
        "Enter a valid phone number starting with 0 and 10 digits long.";
    }
    // Password: at least 6 characters (customize as needed)
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    isResetting(true);
    setResult("");
    API.post("/forgot-password", { phone_number, password })
      .then((result) => {
        setResult(result.data.message);
        isResetting(false);
      })
      .catch((error) => {
        setResult("An error occurred. Please try again.");
        isResetting(false);
      });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="  flex flex-col mt-[22px] singup-form-shadow text-primary px-[22px] md:px-12   lg:mx-auto lg:w-[516px]  "
    >
      <h1 className=" text-2xl font-semibold text-center mt-[40px] mb-6">
        Reset Your Password
      </h1>
      <h1 className="  text-center  mb-[27px]">
        Enter your phone number and your new password
      </h1>
      <Input
        styling={
          "w-full border mt-[22px] mb-[21px] h-[61px] pl-6 outline-links "
        }
        label="Phone Number"
        placeholder="Enter Phone Number"
        id="Phone Number"
        type="text"
        title="Enter a valid phone number starting with 0 and of length 10"
        pattern="[0]{1}[0-9]{9}"
        name="phone_number"
        onChange={(e) => setPhone_number(e.target.value)}
        value={phone_number}
        required="required"
      />
      {errors.phone_number && (
        <p className="text-red-500 text-sm mb-2">{errors.phone_number}</p>
      )}

      <Input
        styling={
          "w-full border mt-[22px] mb-[21px] h-[61px] pl-6 outline-links "
        }
        label="Password"
        placeholder="Enter Password"
        id="password"
        type="password"
        title="Enter a valid password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required="required"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}

      <p className="text-notification font-normal text-center mt-8 ">
        {result}
      </p>
      <button
        type="submit"
        className="bg-primary h-[63px] w-full mt-6 text-white font-bold rounded-lg "
      >
        {!resetting ? "Reset Password" : "Resetting Password"}
      </button>
      <div className=" w-full border border-black/10 h-[0px] mt-10"></div>
      <span className=" mt-6 text-center mb-20">
        <Link to="/" className="hover:underline font-normal text-links ml-4 ">
          Return to Login
        </Link>
      </span>
    </form>
  );
};

export default ResetPasswordForm;
