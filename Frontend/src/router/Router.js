import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/auth/login/Login";
import { Register } from "../pages/auth/register/Register";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path : "/register",
        element : <Register/>
      },
    ],
  },
]);
