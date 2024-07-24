import Wrapper from "../wrapper/Wrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import "../register/register.scss";
import "../addTask/addTask.scss";
import { Link } from "react-router-dom";
import { updateTask } from "../../features/users/userThunks";
import useFetchUsers from "../hooks/useFetchUsers";

const UpdateTask = () => {
  const { id } = useParams();
  const login = window.localStorage.getItem("login");
  const { user, loading, error } = useFetchUsers(login);

  const dispatch = useDispatch();

  const task = user?.tasks.find((task) => task.id === id);

  const navigate = useNavigate();
  const focusRef = useRef();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskName: task?.taskName || "",
      deadline: task?.deadline || "",
      priority: task?.priority || "",
      id,
    },
    validationSchema: Yup.object({
      taskName: Yup.string()
        .matches(/^.{2,}$/, "Name must be 2-15 characters long")
        .required("Name is Required"),
      deadline: Yup.string().required("Date is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateTask({ loginId: login, taskId: id, values }))
        .unwrap()
        .then(() => {
          resetForm();
          navigate("/");
        });
    },
  });

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [task]);

  return (
    <section className="add-task-form">
      <Wrapper>
        <div className="container">
          <h3 className="heading">Update Task</h3>
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
                placeholder="Enter task name..."
                ref={focusRef}
              />
              {formik.touched.taskName && formik.errors.taskName ? (
                <div className="error">{formik.errors.taskName}</div>
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
                placeholder="Enter deadline..."
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
                Update Task
              </button>
              <Link to="/" className="back-home">
                Back to home
              </Link>
            </div>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default UpdateTask;
