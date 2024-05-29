import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./pages/sign-in/sign-in.js";
// import "./pages/sign-up/sign-up.js";
import SignIn from "./pages/sign-in/sign-in.js";
import SignUp from "./pages/sign-up/sign-up.js";
import HomePage from "./pages/home-page/home-page.js";
import ForgotPassword from "./pages/forgotpassword/forgot-password.js";
import NewPass from "./pages/newpassword/new-pass.js";
import HomePageForGuest from "./pages/home-page/home-page.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePageForGuest />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/home-page" element={<HomePageForGuest />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/forgot-password/verify-otp" element={<NewPass />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
