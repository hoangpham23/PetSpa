import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import Calendar from "./Calendear/Calendar";
import style from "./ChooseTime_style.module.css";
import axios from "axios";
import ChooseTimeBox from "./ChooseTimeBox/ChooseTimeBox";
import Cart from "./CartService/Cart";
import Footer from "../../components/footer/footer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import HeaderColor from "../../components/header/HeaderColor";
function ChooseTime2() {
  const { addDays, format } = require("date-fns");
  const today = new Date();
  // chỉ nhận lịch trong 3 ngày, tính từ thời điểm hiện tại
  const startDay = format(today, "yyyy-MM-dd");

  const endDay = format(addDays(startDay, 3), "yyyy-MM-dd");
  console.log(endDay);
  const [appointments, setAppointments] = useState([]);
  const [isFullSlot, setIsFullSlot] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      const account = JSON.parse(accountData);
      setCustomerID(account.customerID);
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
        localStorage.getItem("selectedTimes") || "[]"
      );
      const cartsystem = JSON.parse(localStorage.getItem("cart"));
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
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    console.log(isFullSlot);
    setIsFullSlot(isFullSlot);
  }, [isFullSlot]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:8090/appointment/time"
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
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    }
  }, [isFullSlot]);
  // so sánh và set trạng thái
  return (
    <>
      <div className={style.backGround}>
        <HeaderColor />
        <h1>Complete your appointment</h1>
        <div className={style.boxInfo}>
          <Calendar />
          <ChooseTimeBox />
          <div className={style.cartContainer} onClick={handleSubmit}>
            <div className={style.nextStepButton}>NEXT STEP &gt;</div>
            <div className={style.cart}>
              <Cart />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ChooseTime2;
