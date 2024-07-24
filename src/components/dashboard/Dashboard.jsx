import Wrapper from "../wrapper/Wrapper";
import "./dashboard.scss";
import { useMemo } from "react";
import useFetchUsers from "../hooks/useFetchUsers";

const Dashboard = () => {
  const login = window.localStorage.getItem("login");
  const { user, loading, error } = useFetchUsers(login);

  const tasks = useMemo(() => user?.tasks ?? [], [user]);

  const createdTask = tasks.length;
  const completedTask = tasks.filter((task) => task.stage === 3).length;
  const pendingTask = tasks.filter((task) =>
    [0, 1, 2].includes(task.stage)
  ).length;

  return (
    <section className="dashboard">
      <Wrapper>
        <ul className="grid">
          <li className="blue">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span>Created Task {createdTask}</span>
            )}
          </li>
          <li className="green">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span>Completed Task {completedTask}</span>
            )}
          </li>
          <li className="red">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span>Pending Task {pendingTask}</span>
            )}
          </li>
        </ul>
      </Wrapper>
    </section>
  );
};

export default Dashboard;
