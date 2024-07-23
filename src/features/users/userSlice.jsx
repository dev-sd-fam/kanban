import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// fetch login user data
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (id) => {
  const response = await axios.get(`http://localhost:3000/users/${id}`);
  return response.data;
});

// add task for login user
export const addTask = createAsyncThunk(
  "user/addTask",
  async ({ loginId, values }) => {
    // Fetch the current user data
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    const newTask = {
      id: uuidv4(),
      stage: 0,
      ...values,
    };

    // Update the user's tasks
    const updatedTasks = [...user.tasks, newTask];

    // Send the updated user data back to the server
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });

    return response.data;
  }
);

// update task stage for login user
export const updateTaskStage = createAsyncThunk(
  "user/updateTaskStage",
  async ({ loginId, taskId, newStage}) => {
    // Fetch the current user data
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    // Update the user's tasks
    const updatedTasks = user.tasks.map(task =>
      task.id === taskId ? { ...task, stage: newStage } : task
    );
    console.log(updatedTasks);

    // Send the updated user data back to the server
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks,
    });

    return response.data;
  }
);


// delete task for login user
export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async ({ loginId, taskId}) => {
    // Fetch the current user data
    const userResponse = await axios.get(
      `http://localhost:3000/users/${loginId}`
    );
    const user = userResponse.data;

    // Update the user's tasks
    const updatedTasks = user.tasks.filter((task)=> task.id !== taskId)

    // Send the updated user data back to the server
    const response = await axios.put(`http://localhost:3000/users/${loginId}`, {
      ...user,
      tasks: updatedTasks
    });

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [action.payload];
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // Find and update the user in the state
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTaskStage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStage.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.loading = false;
      })
      .addCase(updateTaskStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// *** Action creators are generated for each case reducer function
export default userSlice.reducer;
