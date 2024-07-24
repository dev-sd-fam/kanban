// styling import
import "./sass/reset.scss";
import "./sass/global.scss";

import Main from "./layout/Main";
import Home from "./pages/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import AddTask from "./components/addTask/AddTask";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import UpdateTask from "./components/updateTask/UpdateTask";

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
          errorElement: <Error />,
        },
        {
          path: "add-task",
          element: <AddTask />,
          errorElement: <Error />,
        },
        {
          path: "update-task/:id",
          element: <UpdateTask />,
          errorElement: <Error />,
        },
        {
          path: "register",
          element: <Register />,
          errorElement: <Error />,
        },
        {
          path: "login",
          element: <Login />,
          errorElement: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
