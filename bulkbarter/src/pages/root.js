// import { Outlet, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
// import Navbar from "../components/Navbar";

import App from "../App";
import SignIn from "./login";
import SignUp from "./signup";
import Dashboard from "./dashboard";
import Trips from "./trips";

export default function Root() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Outlet /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trips" element={<Trips />} />
      </Routes>
    </>
  );
}
