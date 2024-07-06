import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import style from "./Schedule.module.css";
import Calendar from "../Calendar/Calendar";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent, {
//   timelineOppositeContentClasses,
// } from "@mui/lab/TimelineOppositeContent";
// import Schedule_box from "./Schedule_box";
import Schedule from "../Schedule/Schedule";

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

const Timetable = () => {

  let { serviceName } = useParams();

  const [serviceData, setServiceData] = useState({
    // Thêm các trường dữ liệu mới từ lịch làm việc
    startTime: "",
    endTime: "",
    serviceName:"",
    customerName: "",
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
        await getData(); 
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state // Chỉ gọi getData một lần khi component được mount

  async function getData() {
    try {
    //   const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8090/employee/schedule?serviceName=${serviceName}`);
      if (response.status === 200) {
        const schedule = response.data;
        console.log(schedule); // Kiểm tra dữ liệu trả về từ API
        const updatedServiceData = {
          ...serviceData,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          customerName: schedule.customerName,
        };
        setServiceData(updatedServiceData);
      } else {
        console.log("Lịch làm việc không tồn tại cho dịch vụ này.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch làm việc:", error);
    }
  }

  return (
    <>
      <Calendar />
      <Schedule schedules={schedules}/>
    </>
  );
};

export default Timetable;
