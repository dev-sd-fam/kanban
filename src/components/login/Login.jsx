import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../register/register.scss";
import "./login.scss";
import Wrapper from "../wrapper/Wrapper";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const login = window.localStorage.getItem("login");

  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!recaptchaToken) {
        setError(true);
        return;
      }
      axios
        .get("http://localhost:3000/users")
        .then((res) => {
          // check user is already register or not
          const success = res.data.find(
            (el) => el.email === values.email && el.password === values.password
          );

          if (success) {
            window.localStorage.setItem("login", success.id);
            navigate("/");
            resetForm();
          } else {
            setError(true);
          }
        })
        .catch((err) => console.log(err));

      // dispatch(loginUser(values));
    },
  });

  return (
    <section className="sign-in">
      <Wrapper>
        <div className="container flex">
          <h2 className="heading">Login</h2>
          {error && (
            <p className="login-error">
              Please enter valid Email, password & validate recaptcha
            </p>
          )}
          <form className="form-container" onSubmit={formik.handleSubmit}>
            <div className="row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter email..."
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter password..."
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="row">
              <ReCAPTCHA
                sitekey="6LcARhcqAAAAAH_sqTgSxuw_ZMLxOlNKZgqVjhP1"
                onChange={handleRecaptchaChange}
              />
            </div>
            <div className="btn-container flex">
              <button type="submit" className="login btn">
                Login
              </button>
              <span>
                Didn't have an account? <Link to="/register">Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default Login;
