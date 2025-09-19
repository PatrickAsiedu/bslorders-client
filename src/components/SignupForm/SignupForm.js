import React, { useState } from "react";
import Input from "../UI/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/userSlice";

const initialState = {
  name: "",
  phone_number: "",
  password: "",
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formhasError, setFormHasError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const signupFormHanlder = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!/^[0][0-9]{9}$/.test(form.phone_number)) {
      errors.phone_number = "Phone number must start with 0 and be 10 digits.";
    }
    if (!form.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const submitFormHanlder = async (e) => {
    setFormError("");
    e.preventDefault();
    const errors = validate();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsSigningUp(true);
    // make the api calls
    const response = await dispatch(signUpUser(form)).unwrap();
    if (response.errorMessage) {
      setFormHasError(true);
      setFormError(response.errorMessage);
    }
    if (response.status === 201) {
      setFormHasError(false);
      setSuccessMessage(response.message);
      // send the user to login screen after 1 minute
      setTimeout(() => {
        window.location.href = "/";
      }, 60000);
    }
    if (response) {
      setIsSigningUp(false);
    }
  };

  return (
    <form
      onSubmit={submitFormHanlder}
      className=" flex flex-col mt-[22px] singup-form-shadow text-primary px-[22px] md:px-12  lg:px-[22px] 2xl:w-[516px] lg:mx-auto  "
    >
      <h1 className=" text-2xl font-semibold text-center mt-[40px] mb-[27px]">
        Nice to see you here
      </h1>
      <Input
        styling={
          "w-full border mt-[22px] mb-[21px] h-[61px] pl-6 outline-links "
        }
        label="Name"
        placeholder="Enter Name"
        id="Name"
        type="text"
        name="name"
        value={form.name}
        onChange={signupFormHanlder}
      />
      {validationErrors.name && (
        <p className="text-red-500 text-md mt-1">{validationErrors.name}</p>
      )}
      <Input
        styling={
          "w-full border mt-[22px] mb-[21px] h-[61px] pl-6 outline-links "
        }
        label="Phone Number"
        placeholder="Enter Phone Number"
        id="Phone Number"
        type="text"
        name="phone_number"
        value={form.phone_number}
        onChange={signupFormHanlder}
      />
      {validationErrors.phone_number && (
        <p className="text-red-500 text-md mt-1">
          {validationErrors.phone_number}
        </p>
      )}
      <Input
        forgotpasswordlink={"hidden"}
        styling={"w-full border mt-[22px]  h-[61px] pl-6   outline-links"}
        label="Password"
        placeholder="Enter Password"
        id="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={signupFormHanlder}
      />
      {validationErrors.password && (
        <p className="text-red-500 text-md mt-1">{validationErrors.password}</p>
      )}

      {/* jon added this to display error messages */}
      {formhasError && (
        <div>
          <p
            className={
              formhasError
                ? "text-notification font-normal text-center mt-[40px] "
                : ""
            }
          >
            {formError}
          </p>
        </div>
      )}
      {!formhasError && (
        <div>
          <p
            className={
              formhasError
                ? " "
                : "text-checkbox font-normal text-center mt-[40px]"
            }
          >
            {successMessage}
          </p>
        </div>
      )}
      {/* jon added this to display error messages */}

      <button
        type="submit"
        className="bg-primary h-[63px] w-full mt-6 text-white font-bold rounded-lg"
      >
        {isSigningUp ? "Creating your account..." : "Continue"}
      </button>

      <div className=" w-full border border-black/10 h-[0px] mt-10"></div>
      <div className="self-center mt-[38px] text-center mb-10 text-sm ">
        <span className=" font-normal text-forgotpassword ">
          Have an account?
        </span>
        <span>
          <Link
            to="/"
            className="hover:underline font-normal text-links ml-4  "
          >
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
