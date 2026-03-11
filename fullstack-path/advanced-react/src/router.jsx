import { createBrowserRouter } from "react-router-dom";
import Signin from "./component/SignIn";
import Header from "./component/Header";
import Dashboard from "./routes/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
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
