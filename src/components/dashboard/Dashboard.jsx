import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../wrapper/Wrapper";
import "./dashboard.scss";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../../features/users/userThunks";

const Dashboard = () => {
  const user = useSelector((state) => state.users[0]);
  const login = window.localStorage.getItem("login");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      setLoading(true);
      dispatch(fetchUsers(login))
        .unwrap()
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [login, dispatch]);

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
