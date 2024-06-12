import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import Calendar from "./Calendear/Calendar";
import style from "./ChooseTime_style.module.css";
import axios from "axios";
import ChooseTimeBox from "./ChooseTimeBox/ChooseTimeBox";

function ChooseTime() {
  const { addDays, format } = require("date-fns");
  const today = new Date();
  // chỉ nhận lịch trong 3 ngày, tính từ thời điểm hiện tại
  const startDay = format(today, "yyyy-MM-dd");
  const endDay = format(addDays(startDay, 3), "yyyy-MM-dd");
  const [appointments, setAppointments] = useState([]);
  // mảng chứa những appointment đã đầy
  const [isFullSlot, setIsFullSlot] = useState([]);
  // tạo hàm lấy giờ từ 8-17h
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
          const formattedHour = format(hour, "HH:mm:ss.SS");
          //const formattedHour = `${String(hour).padStart(2, "0")}:00:00.00`;
          const appointmentTime = format(
            `${nextDay} ${formattedHour}`,
            "yyyy-MM-dd HH:mm:ss.SS"
          );
          const appointment = {
            time: appointmentTime,
            status: false,
          };

          generateAppointments.push(appointment);
        });
      }

      setAppointments(generateAppointments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    generateAppointment();
  }, []);

  useEffect(() => {
    if (isFullSlot.length > 0) {
      //console.log("hello ");
      const updatedAppointments = appointments.map((appointment) => {
        // let isFull = isFullSlot.some(
        //   (slot) =>
        //     format(slot.appointmentTime, "yyyy-MM-dd") ===
        //     format(appointment.time, "yyyy-MM-dd")
        // );
        let isFull = false;

        isFullSlot.map((slot) => {
          if (
            format(slot.appointmentTime, "yyyy-MM-dd") ===
            format(appointment.time, "yyyy-MM-dd")
          ) {
            const timeString1 = slot.appointmentTime.split(" ")[1];
            console.log(timeString1);
            const timeString2 = slot.appointmentTime.split(" ")[1];
            if (timeString1 === timeString2) {
              isFull = true;
            }
          }
        });
        console.log(isFull); //false
        return { ...appointment, status: isFull };
      });
      isFullSlot.map((slot) => {
        console.log(
          "slot.appointmentTime:",
          typeof slot.appointmentTime,
          slot.appointmentTime
        );
      });
      setAppointments(updatedAppointments);
    }
  }, [isFullSlot]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:8090/appointment/time"
      );
      console.log(response.status);
      if (response.status === 200) {
        // const appointmentTimes = await response.data.map((item) =>
        //   format(item.appointmentTime, "yyyy-MM-dd HH:mm:ss.SS")
        // );
        //console.log("getDataa", response.data);
        setIsFullSlot(response.data);
        //console.log(typeof appointmentTimes[0]);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    console.log("Updated isFullSlot:", isFullSlot);
    console.log("isFullSlot.length:", isFullSlot.length);
    // console.log(typeof isFullSlot.length);
    console.log(appointments);
  }, [isFullSlot]);

  useEffect(() => {
    console.log("isFullSlot data:", isFullSlot);
    // Tiếp tục với phần code của bạn...
  }, [isFullSlot]);
  return (
    <div className={style.backGround}>
      <HeaderForCus />
      <h1>Complete your appointment</h1>
      <div className={style.boxInfo}>
        <Calendar />
        <ChooseTimeBox />
      </div>
    </div>
  );
}

export default ChooseTime;
