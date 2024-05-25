import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./pages/sign-in.js";
import "./pages/sign-in2.js";
import "./pages/sign-up.js";
import "./pages/home-page.js";
import "./pages/forget-password.js";
import "./pages/new-pass.js";
import SignIn from "./pages/sign-in.js";
import SignUp from "./pages/sign-up.js";
import HomePage from "./pages/home-page.js";
import ForgetPassword from "./pages/forget-password.js";
import SignIn2 from "./pages/sign-in2.js";
import NewPassword from "./pages/new-pass.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in2" element={<SignIn2 />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/forgotpassword/verify-otp" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
