import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../task/Task";

const DroppableArea = ({ droppableId, title, icon, tasks, login }) => {
  return (
    <Droppable droppableId={droppableId.toString()}>
      {(provided) => (
        <div
          className={`${title.toLowerCase()} box`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3 className="heading">
            {icon} {title}
          </h3>
          {tasks.length > 0 ? (
            <>
              <ul className="tasks">
                {tasks.map((task, index) => (
                  <Task
                    index={index}
                    task={task}
                    loginId={login}
                    key={task.id}
                  />
                ))}
              </ul>
              {provided.placeholder}
            </>
          ) : (
            <span className="empty">No Task added in {title} stage...</span>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableArea;
