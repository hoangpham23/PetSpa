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
import InfoPet from "./pages/info-pet/InfoPet.js";
import ChooseService from "./pages/choose-service/ChooseService.js";
import ChooseTime2 from "./pages/choose-time/ChooseTime.js";
import Payment from "./pages/payment/Payment.js";
import SuccessfullyPayment from "./pages/payment/SuccessfullyPayment.js";
import DashBoard from "./admin/DashBoard/DashBoard.js";
import PaymentHistory from "./pages/paymentHistory/PaymentHistory.js";
import NoAccessPermission from "./components/noAccessPermission/NoAccessPermission.js";
import ManageStaffAccount from "./admin/ManageStaffAccount/ManageStaffAccount.js";
import EditStaffAccount from "./admin/ManageStaffAccount/SampleSideBar";
import ManageAppointment from "./admin/ManageAppointment/ManageAppointment.js";
import ManageService from "./admin/ManageService/ManageService.js";
import Schedule from './staff/staff-schedule/Schedule/Schedule';
import Schedule_draft from './staff/staff-schedule/Schedule/Schedule_draft.js';
import Schedule_box from './staff/staff-schedule/Schedule/Schedule_box.js';
import Timetable from './staff/staff-schedule/Timetable/Timetable.js';

const schedules = [
  {
    time: "9:00",
    client: "Ms. Lisa",
    service: "HAIR CUT SPA SERVICE",
    period: "MORNING",
  },
  {
    time: "10:00",
    client: "Ms. Jenny",
    service: "NAIL CUT SPA SERVICE",
    period: "MORNING",
  },
  {
    time: "12:00",
    client: "Ms. Jenny",
    service: "NAIL CUT SPA SERVICE",
    period: "MORNING",
  },
  {
    time: "13:00",
    client: "Ms. Lisa",
    service: "HAIR WASH SPA SERVICE",
    period: "AFTERNOON",
  },
  {
    time: "16:00",
    client: "Ms. July",
    service: "NAIL CUT SPA SERVICE",
    period: "AFTERNOON",
  },
];


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
        <Route path="/choose-time" element={<ChooseTime2 />}></Route>
        <Route path="/home-page/:serviceName" element={<ServiceInfo />}></Route>
        <Route path="/customer-info" element={<CustomerInfo />}></Route>
        <Route path="/choose-pet" element={<ChoosePet />}></Route>
        <Route path="/info-pet" element={<InfoPet />}></Route>
        <Route path="/appointment/service" element={<ChooseService />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route
          path="/successfully-payment"
          element={<SuccessfullyPayment />}
        ></Route>
        <Route path="/payment-history" element={<PaymentHistory />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route
          path="/no-access-permission"
          element={<NoAccessPermission />}
        ></Route>
        <Route path="/manage-staff" element={<ManageStaffAccount />}></Route>
        <Route
          path="/manage-appointment"
          element={<ManageAppointment />}
        ></Route>
        <Route path="/manage-services" element={<ManageService />}></Route>
        <Route path="/staff/staff-schedule/schedule" element={<Schedule schedules={schedules} />}></Route>
        <Route path="/staff/staff-schedule/schedule_draft" element={<Schedule_draft />}></Route>
        <Route path="/staff/staff-schedule/Timetable" element={<Timetable />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
