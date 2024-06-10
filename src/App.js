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
// import HomePageForGuest from "./pages/home-page/home-page.js";
import Calendar from "./pages/choose-time/Calendear/Calendar.js";
import ChooseTime from "./pages/choose-time/choose-time.js";
import VerifyOtpSignUp from "./pages/sign-up/verifyOtpSignUp.js";
import ServiceInfo from "./pages/service-info/ServiceInfo.js";
import CustomerInfo from "./pages/customer-info/Customer-info.js";
import ChoosePet from "./pages/choose-pet/ChoosePet.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-up/verify-otp" element={<VerifyOtpSignUp />}></Route>
        <Route path="/home-page" element={<HomePage />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/forgot-password/verify-otp" element={<NewPass />}></Route>
        <Route path="/choose-time" element={<ChooseTime />}></Route>
        <Route
          path="/service-info/:serviceName"
          element={<ServiceInfo />}
        ></Route>
        <Route path="/customer-info" element={<CustomerInfo />}></Route>
        <Route path="/choose-pet" element={<ChoosePet />}></Route>
      </Routes>
    </Router>
  );
}

export default App;