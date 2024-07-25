// hooks
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "../wrapper/Wrapper";

// icons
import { MdPendingActions, MdFileDownloadDone } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FcProcess } from "react-icons/fc";

// redux fetch & update user 
import { updateTaskStage } from "../../features/users/userThunks";
import useFetchUsers from "../hooks/useFetchUsers";

// d&d
import { DragDropContext } from "react-beautiful-dnd";
import DroppableArea from "../droppableArea/DroppableArea";

// styles
import "./taskManagement.scss";

const TaskManagement = () => {
  const login = window.localStorage.getItem("login");
  const { user, loading, error } = useFetchUsers(login);
  const dispatch = useDispatch();

  const task = useMemo(() => user?.tasks ?? [], [user]);
  
  // filter base on stage
  const backlog = useMemo( //backlog
    () => task.filter((task) => task.stage === 0),
    [task]
  );
  const todo = useMemo(() => task.filter((task) => task.stage === 1), [task]); //todo
  const onGoing = useMemo( //ongoing
    () => task.filter((task) => task.stage === 2),
    [task]
  );
  const done = useMemo(() => task.filter((task) => task.stage === 3), [task]); //done

  // on drag & drop update stage
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const draggedTask = task.find((t) => t.id === result.draggableId);

    if (!draggedTask) return;

    dispatch(
      updateTaskStage({
        loginId: login,
        taskId: draggedTask.id,
        newStage: parseInt(destination.droppableId),
      })
    );
  };

  return (
    <section className="task-management">
      <Wrapper>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <span className="task-loader"></span>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
              <DroppableArea
                droppableId="0"
                title="Backlog"
                icon={<MdPendingActions />}
                tasks={backlog}
                login={login}
              />
              <DroppableArea
                droppableId="1"
                title="To-do"
                icon={<LuListTodo />}
                tasks={todo}
                login={login}
              />
              <DroppableArea
                droppableId="2"
                title="On-going"
                icon={<FcProcess />}
                tasks={onGoing}
                login={login}
              />
              <DroppableArea
                droppableId="3"
                title="Done"
                icon={<MdFileDownloadDone />}
                tasks={done}
                login={login}
              />
            </div>
          </DragDropContext>
        )}
      </Wrapper>
    </section>
  );
};

export default TaskManagement;
