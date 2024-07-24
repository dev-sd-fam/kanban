import React, { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import TaskManagement from "../components/task-managment/TaskManagement";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userThunks";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = window.localStorage.getItem("login");
  
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    if (login) {
      dispatch(fetchUsers(login));
    } else {
      navigate("/login");
    }
  }, [login, dispatch, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {window.localStorage.getItem("login") && (
        <>
          <Dashboard />
          <TaskManagement />
        </>
      )}
    </>
  );
};

export default Home;
