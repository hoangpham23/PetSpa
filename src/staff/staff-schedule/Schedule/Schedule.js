import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from "./Schedule.module.css";
// import Calendar from "../Calendar/Calendar";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent, {
//   timelineOppositeContentClasses,
// } from "@mui/lab/TimelineOppositeContent";
import Schedule_box from "./Schedule_box";


const Schedule = ({schedules}) => {

  let { serviceName } = useParams();
  // const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    // Thêm các trường dữ liệu mới từ lịch làm việc
    startTime: "",
    endTime: "",
    customerName: "",
  });

  // useEffect(() => {
  //   getData();
  // }, []); 

  // async function getData() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`http://localhost:8090/employee/schedule?serviceName=${serviceName}`);
  //     if (response.status === 200) {
  //       const schedule = response.data;
  //       console.log(schedule);
  //       const updatedServiceData = {
  //         ...serviceData,
  //         startTime: schedule.startTime,
  //         endTime: schedule.endTime,
  //         customerName: schedule.customerName,
  //       };
  //       setServiceData(updatedServiceData);
  //     } else {
  //       console.log("Lịch làm việc không tồn tại cho dịch vụ này.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu lịch làm việc:", error);
  //   }
  // }

  // Function to calculate schedule_endtime
  // const calculateEndTime = (startTime) => {
  //   const [hour, minute] = startTime.split(":");
  //   const start = new Date();
  //   start.setHours(parseInt(hour, 10));
  //   start.setMinutes(parseInt(minute, 10));

  //   const end = new Date(start.getTime() + 60 * 60 * 1000);

  //   const endHour = end.getHours().toString().padStart(2, "0");
  //   const endMinute = end.getMinutes().toString().padStart(2, "0");

  //   return `${endHour}:${endMinute}`;
  // };

  // Filter schedules for morning and afternoon

  const morningSchedules = schedules.filter(
    (schedule) => schedule.period === "MORNING"
  );
  const afternoonSchedules = schedules.filter(
    (schedule) => schedule.period === "AFTERNOON"
  );

  return (
    <>
      <div className={style.schedule}>
        <table className={style.schedule_table}>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>MORNING</td>
              {[8, 9, 10, 11, 12].map((hour) => {
                const schedule = morningSchedules.find((item) =>
                  item.time.startsWith(`${hour}:`)
                );
                return (
                  <td key={hour}>
                    {schedule && (
                      <Schedule_box schedule={schedule}/>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>AFTERNOON</td>
              {[13, 14, 15, 16].map((hour) => {
                const schedule = afternoonSchedules.find((item) =>
                  item.time.startsWith(`${hour}:`)
                );
                return (
                  <td key={hour}>
                    {schedule && (
                      <Schedule_box schedule={schedule}/>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Schedule;
