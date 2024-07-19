import Task from "../task/Task";
import Wrapper from "../wrapper/Wrapper";
import "./taskManagement.scss";

// icons
import { MdPendingActions } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FcProcess } from "react-icons/fc";
import { MdFileDownloadDone } from "react-icons/md";

const TaskManagement = () => {
  return (
    <section className="task-management">
      <Wrapper>
        <div className="container">
          <div className="backlog box">
            <h3 className="heading"><MdPendingActions/> Backlog</h3>
            <ul className="Tasks">
              <Task />
              <Task />
              <Task />
            </ul>
          </div>
          <div className="todo box">
            <h3 className="heading"><LuListTodo/> To-do</h3>
            <ul className="Tasks">
              <Task />
              <Task />
            </ul>
          </div>
          <div className="onGoing box">
            <h3 className="heading"><FcProcess/> onGoing</h3>
            <ul className="Tasks">
              <Task />
              <Task />
            </ul>
          </div>
          <div className="Done box">
            <h3 className="heading"><MdFileDownloadDone/> Done</h3>
            <ul className="Tasks">
              <Task />
              <Task />
              <Task />
              <Task />
            </ul>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default TaskManagement;
