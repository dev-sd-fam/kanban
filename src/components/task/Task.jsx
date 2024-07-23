import "./Task.scss";

// icons
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateTaskStage, deleteTask } from "../../features/users/userSlice";

const Task = ({ task, loginId }) => {
  const { taskName, deadline, priority, id, stage } = task;
  console.log(stage);
  const dispatch = useDispatch();

  const handlePrevStage = () => {
    stage > 0 &&
      dispatch(updateTaskStage({ loginId, taskId: id, newStage: stage - 1 }));
  };

  const handleNextStage = () => {
    stage < 3 &&
      dispatch(updateTaskStage({ loginId, taskId: id, newStage: stage + 1 }));
  };

  const handleTaskDelete = () => {
    dispatch(deleteTask({loginId, taskId: id}))
  }

  return (
    <li className={`task ${priority}`}>
      <div className="buttons updation-btn">
        <button className="btn edit" title="edit">
          <CiEdit />
        </button>
        <button className="btn delete" title="delete" onClick={handleTaskDelete}>
          <MdDeleteForever />
        </button>
      </div>
      <h3 className="title">{taskName}</h3>
      <span>{stage}</span>
      <div className="content flex">
        <span className={`priority ${priority}`}>{priority}</span>
        <span className="deadline">{deadline}</span>
      </div>
      <div className="flex buttons">
        <button
          className={`btn left ${stage == 0 && "hidden"}`}
          onClick={handlePrevStage}
          title="prev"
        >
          <FaHandPointLeft />
        </button>

        <button
          className={`btn right ${stage == 3 && "hidden"}`}
          onClick={handleNextStage}
          title="next"
        >
          <FaHandPointRight />
        </button>
      </div>
    </li>
  );
};

export default Task;
