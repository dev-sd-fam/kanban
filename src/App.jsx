// styling import
import "./sass/reset.scss";
import "./sass/global.scss";

import Main from "./layout/Main";
import Home from "./pages/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTask from "./components/addTask/AddTask";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import UpdateTask from "./components/updateTask/UpdateTask";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: "add-task",
          element: (
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          ),
        },
        {
          path: "update-task/:id",
          element: (
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
