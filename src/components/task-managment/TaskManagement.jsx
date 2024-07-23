import Task from "../task/Task";
import Wrapper from "../wrapper/Wrapper";
import "./taskManagement.scss";

// icons
import { MdPendingActions } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FcProcess } from "react-icons/fc";
import { MdFileDownloadDone } from "react-icons/md";
import { fetchUsers } from "../../features/users/userSlice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskManagement = () => {
  const user = useSelector((state) => state.users[0]);
  const login = window.localStorage.getItem("login");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {
      console.log("Fetching user data");
      setLoading(true);
      dispatch(fetchUsers(login))
        .unwrap()
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [login, dispatch]);

  const task = useMemo(() => user?.tasks ?? [], [user]);

  const backlog = useMemo(() => task.filter((task) => task.stage === 0), [task]);
  const todo = useMemo(() => task.filter((task) => task.stage === 1), [task]);
  const onGoing = useMemo(() => task.filter((task) => task.stage === 2), [task]);
  const done = useMemo(() => task.filter((task) => task.stage === 3), [task]);

  return (
    <section className="task-management">
      <Wrapper>
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          <div className="backlog box">
            <h3 className="heading">
              <MdPendingActions /> Backlog
            </h3>
            {loading ? (
              <span className="task-loader"></span>
            ) : (
              <ul className="Tasks">
                {backlog.map((task) => (
                  <Task task={task} loginId={login} key={task.id} />
                ))}
              </ul>
            )}
          </div>
          <div className="todo box">
            <h3 className="heading">
              <LuListTodo /> To-do
            </h3>
            {loading ? (
              <span className="task-loader"></span>
            ) : (
              <ul className="Tasks">
                {todo.map((task) => (
                  <Task task={task} loginId={login} key={task.id} />
                ))}
              </ul>
            )}
          </div>
          <div className="onGoing box">
            <h3 className="heading">
              <FcProcess /> On-going
            </h3>
            {loading ? (
              <span className="task-loader"></span>
            ) : (
              <ul className="Tasks">
                {onGoing.map((task) => (
                  <Task task={task} loginId={login} key={task.id} />
                ))}
              </ul>
            )}
          </div>
          <div className="Done box">
            <h3 className="heading">
              <MdFileDownloadDone /> Done
            </h3>
            {loading ? (
              <span className="task-loader"></span>
            ) : (
              <ul className="Tasks">
                {done.map((task) => (
                  <Task task={task} loginId={login} key={task.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default TaskManagement;
