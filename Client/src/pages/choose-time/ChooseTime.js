import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import Calendar from "./Calendear/Calendar";
import CalendarV2 from "./Calendear/Calendar";

import style from "./ChooseTime_style.module.css";
import axios from "axios";
import ChooseTimeBox from "./ChooseTimeBox/ChooseTimeBox";
import Cart from "./CartService/Cart";
import Footer from "../../components/footer/footer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import HeaderColor from "../../components/header/HeaderColor";
import DateCalendarValue from "./Calendear/CalendarV2";
import UserAuth from "../../hooks/UserAuth";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import stepperStyle from "./Stepper_style.module.css";
import { Helmet } from "react-helmet";
import { WifiFind } from "@mui/icons-material";
function ChooseTime2() {
  UserAuth(["CUS"]);
  const navigate = useNavigate();
  const { addDays, format } = require("date-fns");
  const today = new Date();
  // chỉ nhận lịch trong 3 ngày, tính từ thời điểm hiện tại
  let startDay = format(today, "yyyy-MM-dd");
  const endDay = format(addDays(startDay, 3), "yyyy-MM-dd");
  console.log(endDay);
  const [appointments, setAppointments] = useState([]);
  const [isFullSlot, setIsFullSlot] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const steps = ["Choose Pet", "Choose Services", "Choose Time", "Payment"];
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const accountData = sessionStorage.getItem("account");
    if (accountData) {
      const account = JSON.parse(accountData);
      setCustomerID(account.customerID);
    }
    console.log();
  }, []);
  useEffect(() => {
    if (
      !Array.isArray(JSON.parse(sessionStorage.getItem("cart"))) ||
      sessionStorage.getItem("cart").length === 0
    ) {
      navigate("/choose-pet");
    }
  }, []);
  function getHours() {
    const hours = [];
    for (let i = 8; i <= 17; i++) {
      hours.push(i);
    }
    return hours;
  }
  function generateAppointment() {
    try {
      let generateAppointments = [];
      for (let i = 1; i <= 3; i++) {
        const nextDay = format(addDays(today, i), "yyyy-MM-dd");
        const hours = getHours();

        hours.forEach((hour) => {
          //const formattedHour = format(hour, "HH:mm:ss.SS");
          const formattedHour = `${String(hour).padStart(2, "0")}:00:00`;
          const appointmentTime = {
            time: format(`${nextDay} ${formattedHour}`, "yyyy-MM-dd HH:mm:ss"),
            status: false,
          };

          generateAppointments.push(appointmentTime);
        });
      }
      setAppointments(generateAppointments);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    try {
      const selectedTimes = JSON.parse(
        sessionStorage.getItem("selectedTimes") || "[]"
      );
      const cartsystem = JSON.parse(sessionStorage.getItem("cart"));
      const numOfServices = cartsystem.length;
      if (selectedTimes.length === numOfServices) {
        navigate("/payment");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    generateAppointment();
  }, []);
  useEffect(() => {
    console.log(appointments);
    sessionStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    console.log(isFullSlot);
    setIsFullSlot(isFullSlot);
  }, [isFullSlot]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    async function getData() {
      const response = await axios.get(
        "http://localhost:8090/appointment/time",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setIsFullSlot(response.data);
        //console.log(typeof appointmentTimes[0]);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    if (isFullSlot.length > 0) {
      const updatedAppointments = appointments.map((appointment) => {
        // Kiểm tra mỗi appointment có trong isFullSlot hay không và set status
        const isFull = isFullSlot.some(
          (slot) => slot.appointmentTime === appointment.time
        );
        return { ...appointment, status: isFull };
      });
      setAppointments(updatedAppointments);
      sessionStorage.setItem(
        "appointments",
        JSON.stringify(updatedAppointments)
      );
    }
  }, [isFullSlot]);
  // so sánh và set trạng thái
  return (
    <>
      <Helmet>
        <title>Choose Time</title>
      </Helmet>
      <div className={style.backGround}>
        <HeaderColor />
        <Box sx={{ width: "100%", mt: 0, mb: 2 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ padding: "2rem", borderRadius: "10px", mt: "2rem" }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  classes={{
                    label: stepperStyle.stepLabel,
                    iconContainer: stepperStyle.stepIconContainer,
                  }}
                  style={{
                    transform: "scale(3)",
                    marginTop: "3rem",
                    index: "11",
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <br />

        <div className={style.boxInfo}>
          {/* <CalendarV2 /> */}
          <DateCalendarValue />
          <ChooseTimeBox />
          <div className={style.cartContainer} onClick={handleSubmit}>
            <div className={style.nextStepButton}>NEXT STEP &gt;</div>
            <div className={style.cart}>
              <Cart />
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default ChooseTime2;
