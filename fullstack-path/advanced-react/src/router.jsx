import { createBrowserRouter } from "react-router-dom";
import Signin from "./component/SignIn";
import Header from "./component/Header";
import Dashboard from "./routes/Dashboard";
import Signup from "./component/Signup";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./component/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Header />
        <Dashboard />
      </ProtectedRoute>

    ),
  },
]);
