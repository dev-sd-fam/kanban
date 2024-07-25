import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./sass/reset.scss";
import "./sass/global.scss";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Error from "./pages/Error";
import Loader from "./components/loader/Loader";

// Lazy load components
const Main = React.lazy(() => import("./layout/Main"));
const Home = React.lazy(() => import("./pages/Home"));
const Register = React.lazy(() => import("./components/register/Register"));
const Login = React.lazy(() => import("./components/login/Login"));
const AddTask = React.lazy(() => import("./components/addTask/AddTask"));
const UpdateTask = React.lazy(() =>
  import("./components/updateTask/UpdateTask")
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Main />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "add-task",
          element: (
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <AddTask />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "update-task/:id",
          element: (
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <UpdateTask />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
