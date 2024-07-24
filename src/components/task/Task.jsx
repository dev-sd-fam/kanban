import "./Task.scss";

// icons
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { deleteTask, updateTaskStage } from "../../features/users/userThunks";

const Task = ({ index, task, loginId }) => {
  const { taskName, deadline, priority, id, stage } = task;
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
    let result = confirm(`Do you want to delete ${taskName} task`);
    if (result === true) {
      dispatch(deleteTask({ loginId, taskId: id }));
    }
  };

  const isPrevHidden = stage === 0;
  const isNextHidden = stage === 3;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={`task ${priority}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="buttons updation-btn">
            <Link
              to={`/update-task/${id}`}
              className="btn edit"
              title="Edit task"
            >
              <CiEdit />
            </Link>
            <button
              className="btn delete"
              title="Delete task"
              onClick={handleTaskDelete}
            >
              <MdDeleteForever />
            </button>
          </div>
          <h3 className="title">{taskName}</h3>
          <div className="content flex">
            <span className={`priority ${priority}`}>{priority}</span>
            <span className="deadline">{deadline}</span>
          </div>
          <div className="flex buttons">
            <button
              className={`btn left ${isPrevHidden ? "hidden" : ""}`}
              onClick={handlePrevStage}
              title="Previous stage"
              aria-label="Move to previous stage"
            >
              <FaHandPointLeft />
            </button>

            <button
              className={`btn right ${isNextHidden ? "hidden" : ""}`}
              onClick={handleNextStage}
              title="Next stage"
              aria-label="Move to next stage"
            >
              <FaHandPointRight />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
