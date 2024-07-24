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
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;
    const newTask = { id: uuidv4(), stage: 0, ...values };
    const updatedTasks = [...user.tasks, newTask];
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });
    return { loginId, user: response.data };
  }
);

// Utility function to update tasks
const updateTasks = (tasks, taskId, updateFn) => {
  return tasks.map((task) => (task.id === taskId ? updateFn(task) : task));
};

// update task stage for login user
export const updateTaskStage = createAsyncThunk(
  "user/updateTaskStage",
  async ({ loginId, taskId, newStage }) => {
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    const updatedTasks = updateTasks(user.tasks, taskId, (task) => ({
      ...task,
      stage: newStage,
    }));

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

    // Send the updated user data back to the server
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });

    return response.data;
  }
);
