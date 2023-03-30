import { Input } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchUser } from "../store/user-slice";
import "./pages.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  const [authorizationDone, setAuthorizationDone] = useState(false);

  const onSubmitSignIn = (value) => {
    const userData = {
      user: {
        email: value.email,
        password: value.password,
      },
    };

    const path = 'users/login';

    dispatch(fetchUser({userData, path})).then(value =>{
      if(value.meta.requestStatus === "fulfilled"){
        setAuthorizationDone(true);
      }
    });
  };

  if(authorizationDone === true){
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmitSignIn)} className="sing-page">
      <p className="sing-page__header">Sign In</p>
      <label className="sing-page__name-input">
        Email address
        <input
          {...register("email", {
            required: "Please enter email.",
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              message: "Please enter a valid email.",
            },
          })}
          className="sing-page__input"
          placeholder="Email address"
        />
      </label>
      {errors?.email && (
        <span style={{ color: "#F5222D" }}>
          {errors?.email?.message || "Error!"}
        </span>
      )}

      <label className="sing-page__name-input">
        Password
        <input
          {...register("password", {
            required: "Please enter password.",
            minLength: {
              value: 6,
              message: "Your password needs to be at least 6 characters.",
            },
            maxLength: {
              value: 40,
              message: "Your user name must be no more than 20 characters.",
            },
          })}
          className="sing-page__input"
          placeholder="Password"
        />
      </label>
      {errors?.password && (
        <span style={{ color: "#F5222D" }}>
          {errors?.password?.message || "Error!"}
        </span>
      )}

      <Input
        type="submit"
        className="sing-page__button"
        value={"Login"}
      ></Input>
      <p className="sing-page__question">
        Don’t have an account?{" "}
        <Link to={"/sing-up"} className="sing-link">
          Sign Up
        </Link>
        .
      </p>
    </form>
  );
}

export default SignInPage;
