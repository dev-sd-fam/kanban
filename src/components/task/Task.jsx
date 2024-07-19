import "./Task.scss"

// icons
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Task = () => {
  return (
    <li className="task">
      <div className="buttons updation-btn">
        <button className="btn edit" title="edit"><CiEdit/></button>
        <button className="btn delete" title="delete"><MdDeleteForever/></button>
      </div>
      <h3 className="title">Title</h3>
      <div className="content flex">
        <span className="priority">High</span>
        <span className="deadline">12/07/2024</span>
      </div>
      <div className="flex buttons">
        <button className="btn left" title="prev"><FaHandPointLeft/></button>
        <button className="btn right" title="next"><FaHandPointRight/></button>
      </div>
    </li>
  )
}

export default Task