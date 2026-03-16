import { createBrowserRouter } from "react-router-dom";
import Signin from "./component/SignIn";
import Header from "./component/Header";
import Dashboard from "./routes/Dashboard";
import Signup from "./component/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);
