import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  addTask,
  updateTaskStage,
  deleteTask,
  updateTask,
} from "./userThunks";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

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
      .addCase(addTask.fulfilled, (state, action) => {
        const { loginId, user } = action.payload;
        state.users = state.users.map((u) => (u.id === loginId ? user : u));
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
        const { loginId, user } = action.payload;
        state.users = state.users.map((u) => (u.id === loginId ? user : u));
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
        const { loginId, user } = action.payload;
        state.users = state.users.map((u) => (u.id === loginId ? user : u));
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
