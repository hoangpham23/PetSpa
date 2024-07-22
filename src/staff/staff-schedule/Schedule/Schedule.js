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
 
  // let { serviceName } = useParams();
  // const navigate = useNavigate();

  // const handleFeedbackClick = (appointmentID) => {
  //   navigate(`/feedback/${appointmentID}`);
  // };

  // console.log(schedule);

  // const morningSchedules = schedules.filter(
  //   (schedule) => schedule.period === "MORNING"
  // );
  // const afternoonSchedules = schedules.filter(
  //   (schedule) => schedule.period === "AFTERNOON"
  // );

  // return (
  //   <>
  //     <div className={style.schedule}>
  //       <table className={style.schedule_table}>
  //         <thead>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td>MORNING</td>
  //             {[8, 9, 10, 11, 12].map((hour) => {
  //               const schedule = morningSchedules.find((item) =>
  //                 item.time.startsWith(`${hour}:`)
  //               );
  //               return (
  //                 <td key={hour}>
  //                   {schedule && (
  //                     <Schedule_box schedule={schedule}/>
  //                   )}
  //                 </td>
  //               );
  //             })}
  //           </tr>
  //           <tr>
  //             <td>AFTERNOON</td>
  //             {[13, 14, 15, 16].map((hour) => {
  //               const schedule = afternoonSchedules.find((item) =>
  //                 item.time.startsWith(`${hour}:`)
  //               );
  //               return (
  //                 <td key={hour}>
  //                   {schedule && (
  //                     <Schedule_box schedule={schedule}/>
  //                   )}
  //                 </td>
  //               );
  //             })}
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );
};

export default Schedule;
