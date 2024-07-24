import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchUsers, updateTaskStage } from "../../features/users/userSlice";
import Wrapper from "../wrapper/Wrapper";
import DroppableArea from "../droppableArea/DroppableArea";
import { MdPendingActions, MdFileDownloadDone } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FcProcess } from "react-icons/fc";
import "./taskManagement.scss";

const TaskManagement = () => {
  const user = useSelector((state) => state.users[0]);
  const login = window.localStorage.getItem("login");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // check if login then fetch users
    if (login) {
      setLoading(true);
      dispatch(fetchUsers(login))
        .unwrap()
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [login, dispatch]);

  // filter base on stage
  const task = useMemo(() => user?.tasks ?? [], [user]);

  const backlog = useMemo(
    () => task.filter((task) => task.stage === 0),
    [task]
  );
  const todo = useMemo(() => task.filter((task) => task.stage === 1), [task]);
  const onGoing = useMemo(
    () => task.filter((task) => task.stage === 2),
    [task]
  );
  const done = useMemo(() => task.filter((task) => task.stage === 3), [task]);

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
        newStage: parseInt(destination.droppableId, 10),
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
