import { Input } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/user-slice";
import "./pages.scss";

function NewAccountPage() {
  const [stateCheckbox, setStateCheckbox] = useState(false);
  const [nameEmailError, setNameEmailError] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = (value) => {
    const userData = {
      user: {
        username: value.username,
        email: value.email,
        password: value.password,
      },
    };
    const path = "users";

    dispatch(fetchUser({ userData, path })).then((value) => {
      if (value.meta.requestStatus === "fulfilled") {
        navigate("/", { replace: true });
        setNameEmailError(false);
      }
      if (value.meta.requestStatus === "rejected") {
        setNameEmailError(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="sing-page">
      <p className="sing-page__header">Create new account</p>

      <label className="sing-page__name-input">
        Username
        <input
          {...register("username", {
            required: "Please enter a value.",
            pattern: {
              value: /^[a-z][a-z0-9]*$/,
              message: "You can only use lowercase English letters and numbers",
            },
            minLength: {
              value: 3,
              message: "Your user name needs to be at least 3 characters.",
            },
            maxLength: {
              value: 20,
              message: "Your user name must be no more than 20 characters.",
            },
          })}
          className="sing-page__input"
          placeholder="Username"
        />
      </label>
      {nameEmailError ? (
        <span style={{ color: "#F5222D" }}>Name or email already taken!</span>
      ) : null}

      {errors?.username && (
        <span style={{ color: "#F5222D" }}>
          {errors?.username?.message || "Error!"}
        </span>
      )}

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
      {nameEmailError ? (
        <span style={{ color: "#F5222D" }}>Name or email already taken!</span>
      ) : null}
      {errors?.email && (
        <span style={{ color: "#F5222D" }}>
          {errors?.email?.message || "Error!"}
        </span>
      )}

      <label className="sing-page__name-input">
        Password
        <input
          {...register("password", {
            required: "Please enter a value.",
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

      <label className="sing-page__name-input">
        Repeat Password
        <input
          {...register("repeatPassword", {
            required: "Please enter password.",
            validate: (value) => value === getValues("password"),
          })}
          className="sing-page__input"
          placeholder="Password"
        />
      </label>
      {errors?.repeatPassword && (
        <span style={{ color: "#F5222D" }}>
          {errors?.repeatPassword?.message || "Passwords must match."}
        </span>
      )}

      <div>
        <input
          type="checkbox"
          className="checkbox-sing-up"
          checked={stateCheckbox}
          {...register("checkbox", {
            onChange: (e) => setStateCheckbox(e.target.checked),
            validate: (value) => value === true,
          })}
        ></input>
        I agree to the processing of my personal information
      </div>

      {errors?.checkbox && (
        <span style={{ color: "#F5222D" }}>
          {errors?.checkbox?.message ||
            "Give consent to the processing of personal data."}
        </span>
      )}

      <Input
        type="submit"
        className="sing-page__button"
        value={"Create"}
      ></Input>
      <p className="sing-page__question">
        Already have an account?{" "}
        <Link className="sing-link" to={"/sing-in"}>
          Sign In
        </Link>
        .
      </p>
    </form>
  );
}

export default NewAccountPage;
