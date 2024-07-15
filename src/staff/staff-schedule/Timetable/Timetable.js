import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
import Schedule_box from "../Schedule/Schedule_box";


const Timetable = () => {
  let { serviceName } = useParams();

  const [schedule, setSchedule] = useState([]);
useEffect(()=>(console.log(schedule)),[schedule])
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8090/employee/schedule?employeeID=19&date=2024-06-20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setSchedule(response.data);
        console.log(response.data);
      }
      
      
      console.log(
        // response.data[0].schedule
        //   .filter
          // (schedule) => (
          //   schedule.startTime === "09:00:00" ||
          //   schedule.startTime === "10:00:00" ||
          //   schedule.startTime === "11:00:00" ||
          //   schedule.startTime === "12:00:00")
          // ()
      );
       // console.log(
      //   [8, 9, 10, 11, 12].map((hour) => {
      //     const schedule = response.data[0].schedule.find((item) =>
      //       item.time.startsWith(`${hour}:`)
      //     );
      //     return (
      //       schedule
      //     );
      //   })
      // );
        
      } catch (error) {
        console.log(error);
      }
      
     
    })();
  }, []);

  return (
    <>
      <Calendar />
      
      <Schedule_box schedules={schedule} />
    </>
  );
};

export default Timetable;
