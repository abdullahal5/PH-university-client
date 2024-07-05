import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
