// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import style from "./Schedule.module.css";
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

// const Schedule_box = ({schedule}) => {

//   let { serviceName } = useParams();
//   const navigate = useNavigate();

//   const handleFeedbackClick = (appointmentID) => {
//     navigate(`/feedback/${appointmentID}`);
//   };

//   return (
//     <div className={style.schedule_item}>
//       <div className={style.time}>
//         <Timeline
//           sx={{
//             [`& .${timelineOppositeContentClasses.root}`]: {
//               flex: 0.2,
//             },
//           }}
//         >
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.schedule.startTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//               <TimelineConnector />
//             </TimelineSeparator>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.endTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//             </TimelineSeparator>
//           </TimelineItem>
//         </Timeline>
//       </div>
//       <div className={style.details}>
//         <p>{schedule.client}</p>
//         <h2 className={style.service}>{schedule.service}</h2>
//         <button className={style.feedback_button} onClick={() => handleFeedbackClick(schedule.appointmentID)}>View Feedback</button>
//       </div>
//     </div>
//   );
// };

// export default Schedule_box;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent, {
//   timelineOppositeContentClasses,
// } from "@mui/lab/TimelineOppositeContent";
// import style from "./Schedule.module.css";

// const Schedule_box = ({ schedule, Schedule_today}) => {
//   const navigate = useNavigate();

//   const handleFeedbackClick = (appointmentID) => {
//     navigate(`/feedback/${appointmentID}`);
//   };

//   return (
//     <div className={style.schedule_item}>
//       {Schedule_today.map()}
//       <div className={style.time}>
//         <Timeline
//           sx={{
//             [`& .${timelineOppositeContentClasses.root}`]: {
//               flex: 0.2,
//             },
//           }}
//         >
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.startTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//               <TimelineConnector />
//             </TimelineSeparator>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.endTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//             </TimelineSeparator>
//           </TimelineItem>
//         </Timeline>
//       </div>
//       <div className={style.details}>
//         <p>{schedule.customerName}</p>
//         <h2 className={style.service}>{schedule.serviceName}</h2>
//         <button
//           className={style.feedback_button}
//           onClick={() => handleFeedbackClick(schedule.appointmentID)}
//         >
//           View Feedback
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Schedule_box;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import TimelineOppositeContent, {
//   timelineOppositeContentClasses,
// } from "@mui/lab/TimelineOppositeContent";
// import style from "./Schedule.module.css";

// const Schedule_box = ({ Schedule_today }) => {
//   const navigate = useNavigate();

//   const handleFeedbackClick = (appointmentID) => {
//     navigate(`/feedback/${appointmentID}`);
//   };
//   console.log(Schedule_today, "neee");
//   return (
//     <div className={style.schedule_item}>
//       {Schedule_today.map((schedule, index) => (
//         <div key={index} className={style.schedule_entry}>
//           <div className={style.time}>
//           <Timeline
//           sx={{
//             [`& .${timelineOppositeContentClasses.root}`]: {
//               flex: 0.2,
//             },
//           }}
//         >
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.startTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//               <TimelineConnector />
//             </TimelineSeparator>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent color="textSecondary">
//               {schedule.endTime}
//             </TimelineOppositeContent>
//             <TimelineSeparator className={style.MuiTimelineItem}>
//               <TimelineDot className={style.MuiTimelineDot} />
//             </TimelineSeparator>
//           </TimelineItem>
//         </Timeline>
//           </div>
//           <div className={style.details}>
//             <p>{schedule.customerName}</p>
//             <h2 className={style.service}>{schedule.serviceName}</h2>
//             <button
//               className={style.feedback_button}
//               onClick={() => handleFeedbackClick(schedule.appointmentID)}
//             >
//               View Feedback
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Schedule_box;


import React from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import style from "./Schedule.module.css";

const Schedule_box = ({ Schedule_today }) => {
  const navigate = useNavigate();

  const handleFeedbackClick = (appointmentID) => {
    navigate(`/staff/viewfeedback/feedback/${appointmentID}`);
  };
  console.log(Schedule_today);

  // Define the time slots for morning and afternoon
  const morningSlots = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00"];
  const afternoonSlots = ["13:00:00", "14:00:00", "15:00:00", "16:00:00"];

  // Create a function to find the schedule item for a specific time slot
  const findScheduleForSlot = (slot) =>
    Schedule_today.find((schedule) => schedule.startTime === slot);

  // Render schedule items for a specific slot
  const renderScheduleItem = (slot) => {
    const schedule = findScheduleForSlot(slot);
    console.log(schedule);
    return schedule ? (
      <div key={slot} className={style.schedule_entry}>
        <div className={style.time}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {schedule.startTime}
              </TimelineOppositeContent>
              <TimelineSeparator className={style.MuiTimelineItem}>
                <TimelineDot className={style.MuiTimelineDot} />
                <TimelineConnector />
              </TimelineSeparator>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {schedule.endTime}
              </TimelineOppositeContent>
              <TimelineSeparator className={style.MuiTimelineItem}>
                <TimelineDot className={style.MuiTimelineDot} />
              </TimelineSeparator>
            </TimelineItem>
          </Timeline>
        </div>
        <div className={style.details}>
          <p>{schedule.customerName}</p>
          <h2 className={style.service}>{schedule.serviceName}</h2>
          <button
            className={style.feedback_button}
            onClick={() => handleFeedbackClick(schedule.appointmentID)}
          >
            View Feedback
          </button>
        </div>
      </div>
    ) : (
      <div key={slot} className={style.schedule_entry_empty}>
        <p>No appointments</p>
      </div>
    );
  };

  return (
    <div className={style.schedule_table}>
      <h2>Morning</h2>
      <div className={style.schedule_row}>
        {morningSlots.map((slot) => renderScheduleItem(slot))}
      </div>
      <h2>Afternoon</h2>
      <div className={style.schedule_row}>
        {afternoonSlots.map((slot) => renderScheduleItem(slot))}
      </div>
    </div>
  );
};

export default Schedule_box;