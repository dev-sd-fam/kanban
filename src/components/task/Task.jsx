import "./Task.scss"

// icons
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Task = ({task}) => {
  const {taskName, deadline, priority, id} = task;

  return (
    <li className={`task ${priority}`}>
      <div className="buttons updation-btn">
        <button className="btn edit" title="edit"><CiEdit/></button>
        <button className="btn delete" title="delete"><MdDeleteForever/></button>
      </div>
      <h3 className="title">{taskName}</h3>
      <div className="content flex">
        <span className={`priority ${priority}`}>{priority}</span>
        <span className="deadline">{deadline}</span>
      </div>
      <div className="flex buttons">
        <button className="btn left" title="prev"><FaHandPointLeft/></button>
        <button className="btn right" title="next"><FaHandPointRight/></button>
      </div>
    </li>
  )
}

export default Task