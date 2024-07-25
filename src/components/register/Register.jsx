import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

// icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Wrapper from "../wrapper/Wrapper";

// style
import "./register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const login = window.localStorage.getItem("login");

  useEffect(() => {
    // if login then navigate to home
    if (login) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^(?!.* {3})[a-zA-Z ]{2,20}$/,
          "Name must be 2-20 characters long"
        )
        .required("Name is Required"),
      userName: Yup.string()
        .matches(/^[a-zA-Z0-9]{2,10}$/, "UserName must be 2-10 characters")
        .required("Username is Required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("Email is Required"),
      phoneNumber: Yup.string()
        .matches(
          /^(?:\+91|91)?[789]\d{9}$/,
          "It must be a valid 10-digit number"
        )
        .required("Phone number is Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 char")
        .required("Password is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // add to the database
      axios
        .post(`http://localhost:3000/users`, { ...values, tasks: [] })
        .then(() => {
          resetForm();
          navigate("/login");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <section className="sign-up">
      <Wrapper>
        <div className="container flex">
          <h2 className="heading">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="enter name..."
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="row">
              <label htmlFor="userName">Username</label>
              <input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                placeholder="enter username..."
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error">{formik.errors.userName}</div>
              ) : null}
            </div>
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                placeholder="enter phone number..."
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="error">{formik.errors.phoneNumber}</div>
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
                placeholder="enter password..."
              />
              <span className="eye" onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>

              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="btn-container flex">
              <button type="submit" className="register btn">
                Register
              </button>
              <span>
                Already have account ? <Link to="/login">Sign In</Link>
              </span>
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default Register;
