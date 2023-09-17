import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  // Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";
import Root from "./pages/root";
import Dashboard from "./pages/dashboard";
import Trips from "./pages/trips";

const router = createBrowserRouter([
  {
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: `/`,
        element: <App />,
      },
      {
        path: `/signup`,
        element: <SignUp />,
      },
      {
        path: `/signin`,
        element: <SignIn />,
      },
      {
        path: `/dashboard`,
        element: <Dashboard />,
      },
      {
        path: `/trips`,
        element: <Trips />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
