import Wrapper from "../wrapper/Wrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";

import { useDispatch } from "react-redux";

import "../register/register.scss";
import "./addTask.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { addTask } from "../../features/users/userThunks";

const AddTask = () => {
  const navigate = useNavigate();
  const focusRef = useRef()

  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      taskName: "",
      deadline: "",
      priority: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string()
        .matches(/^.{2,}$/, "Name must be 2-15 characters long")
        .required("Name is Required"),
      deadline: Yup.string()
        .required("Date is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: (values, { resetForm }) => {

      // add to the database
      const loginId = window.localStorage.getItem("login")

      // dispatch to user store
      dispatch(addTask({loginId,values}));

      resetForm();
      navigate("/")

    },
  });

  useEffect(() => {
    focusRef.current.focus()
  }, [])
  

  return (
    <section className="add-task-form">
      <Wrapper>
        <div className="container">
          <h3 className="heading">Add Task</h3>
          <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="row">
              <label htmlFor="taskName">Task Name</label>
              <input
                id="taskName"
                name="taskName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.taskName}
                placeholder="enter task name..."
                ref={focusRef}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="row">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deadline}
                placeholder="enter deadline..."
              />
              {formik.touched.deadline && formik.errors.deadline ? (
                <div className="error">{formik.errors.deadline}</div>
              ) : null}
            </div>
            <div className="row">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priority}
              >
                <option value="" label="Select priority" />
                <option value="low" label="Low" />
                <option value="medium" label="Medium" />
                <option value="high" label="High" />
              </select>
              {formik.touched.priority && formik.errors.priority ? (
                <div className="error">{formik.errors.priority}</div>
              ) : null}
            </div>
            <div className="btn-container flex">
              <button type="submit" className="register btn">
                Add Task
              </button>
              <Link to="/" className="back-home">
                Back to home
              </Link>
            </div>
            {/* {loading && <p>Loading...</p>} */}
            {/* {error && <p>{error}</p>} */}
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default AddTask;
