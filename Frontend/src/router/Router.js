import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/auth/login/Login";
import { Register } from "../pages/auth/register/Register";
import { userLoader } from "../loaders/userLoader";
import { Message } from "../pages/message/Message";
import ProtectedRouteAuth from "../protectedRoutes/ProtectedRouteAuth";
import ProtectedRouteNoAuth from "../protectedRoutes/ProtectedRouteNoAuth";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouteAuth>
            <Login />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRouteAuth>
            <Register />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "message",
        element:<ProtectedRouteNoAuth><Message /></ProtectedRouteNoAuth> ,
      },
    ],
  },
]);
