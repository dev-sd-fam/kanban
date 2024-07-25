import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Fetch login user data
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (id) => {
  const response = await axios.get(`http://localhost:3000/users/${id}`);
  return response.data;
});

// Add task for login user
export const addTask = createAsyncThunk(
  "user/addTask",
  async ({ loginId, values }) => {
    // login user data
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;
 
    const newTask = { id: uuidv4(), stage: 0, ...values };   // new task
    const updatedTasks = [...user.tasks, newTask];  //old task + new created task
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });
    return { loginId, user: response.data };
  }
);

// update task stage for login user
export const updateTaskStage = createAsyncThunk(
  "user/updateTaskStage",
  async ({ loginId, taskId, newStage }) => {
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    // Update the tasks directly within the thunk
    const updatedTasks = user.tasks.map((task) =>
      task.id === taskId ? { ...task, stage: newStage } : task
    );

    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });
    return { loginId, user: response.data };
  }
);

// delete task for login user
export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async ({ loginId, taskId }) => {
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    // check id is matching with db. if match then removed
    const updatedTasks = user.tasks.filter((task) => task.id !== taskId);
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });
    return { loginId, user: response.data };
  }
);

// update the task
export const updateTask = createAsyncThunk(
  "user/updateTask",
  async ({ loginId, taskId, values }) => {
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    // Update the specific task
    const updatedTasks = user.tasks.map((task) =>
      task.id === taskId ? { ...task, ...values } : task
    );

    // Send the updated user data to the server
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });

    return response.data;
  }
);
