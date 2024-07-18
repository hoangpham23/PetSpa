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

// import React, { useState }  from "react";
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
//     navigate(`/staff/viewfeedback/feedback/${appointmentID}`);
//   };
//   console.log(Schedule_today);

//   // Define the time slots for morning and afternoon
//   const morningSlots = [
//     "08:00:00",
//     "09:00:00",
//     "10:00:00",
//     "11:00:00",
//     "12:00:00",
//   ];
//   const afternoonSlots = [
//     "13:00:00",
//     "14:00:00",
//     "15:00:00",
//     "16:00:00",
//     "17:00:00",
//   ];

//   // Create a function to find the schedule item for a specific time slot
//   const findScheduleForSlot = (slot) =>
//     Schedule_today.find((schedule) => schedule.startTime === slot);

//   // Render schedule items for a specific slot
//   const renderScheduleItem = (slot) => {
//     const schedule = findScheduleForSlot(slot);
//     console.log(schedule);
//     return schedule ? (
//       <div key={slot} className={style.schedule_item}>
//         <div className={style.time}>
//           <Timeline
//             sx={{
//               [`& .${timelineOppositeContentClasses.root}`]: {
//                 flex: 0.2,
//               },
//             }}
//           >
//             <TimelineItem>
//               <TimelineOppositeContent color="textSecondary">
//                 {schedule.startTime}
//               </TimelineOppositeContent>
//               <TimelineSeparator className={style.MuiTimelineItem}>
//                 <TimelineDot className={style.MuiTimelineDot} />
//                 <TimelineConnector />
//               </TimelineSeparator>
//             </TimelineItem>
//             <TimelineItem>
//               <TimelineOppositeContent color="textSecondary">
//                 {schedule.endTime}
//               </TimelineOppositeContent>
//               <TimelineSeparator className={style.MuiTimelineItem}>
//                 <TimelineDot className={style.MuiTimelineDot} />
//               </TimelineSeparator>
//             </TimelineItem>
//           </Timeline>
//         </div>
//         <div className={style.details}>
//           <p>{schedule.customerName}</p>
//           <h2 className={style.service}>{schedule.serviceName}</h2>
//           <button
//             className={style.feedback_button}
//             onClick={() => handleFeedbackClick(schedule.appointmentID)}
//           >
//             View Feedback
//           </button>
//         </div>
//       </div>
//     ) : (
//       <div key={slot}>
//         <div className={style.schedule_entry_empty}>
//           <p>No appointments</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className={style.schedule}>
//         <table className={style.schedule_table}>
//           <thead></thead>
//           <tbody>
//             <tr className={style.row}>
//               <td className={style.filter}>MORNING</td>
//               {morningSlots.map((slot) => renderScheduleItem(slot))}
//             </tr>
//             <tr className={style.row}>
//               <td className={style.filter}>AFTERNOON</td>
//               {afternoonSlots.map((slot) => renderScheduleItem(slot))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Schedule_box;

import React, { useState }  from "react";
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
import { Button, Box } from "@mui/material";
import axios from "axios";


const Schedule_box = ({ Schedule_today, setAppointments }) => {
  const navigate = useNavigate();

  const handleFeedbackClick = (appointmentID) => {
    navigate(`/staff/viewfeedback/feedback/${appointmentID}`);
  };

  // Define the time slots for morning and afternoon
  const morningSlots = [
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
  ];
  const afternoonSlots = [
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
  ];

  // Create a function to find the schedule item for a specific time slot
  const findScheduleForSlot = (slot) =>
    Schedule_today.find((schedule) => schedule.startTime === slot);

  // Function to handle status change
  const handleStatusChange = async (id) => {
    const appointmentToUpdate = Schedule_today.find(
      (appointment) => appointment.appointmentID === id
    );
    console.log(appointmentToUpdate)

    let newStatus;
    switch (appointmentToUpdate.status) {
      case "Scheduled":
      case "Rescheduled":
        newStatus = "In Progress";
        break;
      case "In Progress":
        newStatus = "Completed";
        break;
      case "Completed":
        newStatus = "Completed";
        break;
      default:
        newStatus = appointmentToUpdate.status;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8090/manage-appointment",
        {
          appointmentID: appointmentToUpdate.appointmentID,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.appointmentID === id
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        alert("Status updated successfully.");
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Render schedule items for a specific slot
  const renderScheduleItem = (slot) => {
    const schedule = findScheduleForSlot(slot);
    return schedule ? (
      <div key={slot} className={style.schedule_item}>
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
          <Box sx={{ boxSizing: "content-box" }}>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(schedule.appointmentID)}
              style={{
                backgroundColor:
                  schedule.status === "Scheduled"
                    ? "#FFC107"
                    : schedule.status === "In Progress"
                    ? "#1976D2"
                    : schedule.status === "Completed"
                    ? "#4CAF50"
                    : schedule.status === "Rescheduled"
                    ? "#FFC107"
                    : null,
                color:
                  schedule.status === "In Progress" ? "#FFF" : "inherit",
                boxSizing: "content-box",
              }}
              disabled={schedule.status === "Completed"}
            >
              {schedule.status}
            </Button>
          </Box>
        </div>
      </div>
    ) : (
      <div key={slot}>
        <div className={style.schedule_entry_empty}>
          <p>No appointments</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={style.schedule}>
        <table className={style.schedule_table}>
          <thead></thead>
          <tbody>
            <tr className={style.row}>
              <td className={style.filter}>MORNING</td>
              {morningSlots.map((slot) => renderScheduleItem(slot))}
            </tr>
            <tr className={style.row}>
              <td className={style.filter}>AFTERNOON</td>
              {afternoonSlots.map((slot) => renderScheduleItem(slot))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Schedule_box;
