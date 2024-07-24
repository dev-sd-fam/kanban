import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

import ReCAPTCHA from "react-google-recaptcha";

// icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// style
import "../register/register.scss";
import "./login.scss";
import Wrapper from "../wrapper/Wrapper";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const login = window.localStorage.getItem("login");

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

  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [navigate]);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <section className="sign-in">
      <Wrapper>
        <div className="container flex">
          <h2 className="heading">Login</h2>
          {error && (
            <p className="login-error">Please enter valid Email, password & validate recaptcha</p>
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
                placeholder="enter email..."
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
                type={show ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="enter password...."
              />
              <span className="eye" onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
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
                Didn' have account ? <Link to="/register">Signup</Link>
              </span>
            </div>

            {/* {loading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default Login;
