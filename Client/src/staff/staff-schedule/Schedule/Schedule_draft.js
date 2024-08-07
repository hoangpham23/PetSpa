import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar_draft from "../Calendar/Calendar_draft";

const Schedule_draft = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    getSchedule(date);
  };

  const getSchedule = async (selectedDate) => {
    try {
    //   const employeeID = localStorage.getItem("employeeID");
    const employeeID = 19; // Gán giá trị cố định cho employeeID

      const formattedDate = selectedDate.toISOString().split("T")[0]; // Định dạng thành yyyy-MM-dd
      const response = await axios.get(
        `http://localhost:8090/employee/schedule?employeeID=${employeeID}&date=${formattedDate}`
      );
      if (response.status === 200) {
        setScheduleData(response.data);
      } else {
        console.log("Lịch làm việc không tồn tại cho ngày này.");
        setScheduleData([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch làm việc:", error);
    }
  };

  return (
    <div>
      <Calendar_draft onSelectDate={handleDateSelect} />
      <h2>Schedule for {selectedDate.toLocaleDateString("en-US")}</h2>
      <ul>
        {scheduleData.map((item) => (
          <li key={item.id}>
            {item.startTime} - {item.endTime}: {item.customerName} - {item.serviceName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule_draft;

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
// import { Button, Box } from "@mui/material";
// import axios from "axios";


// const Schedule_box = ({ Schedule_today, setAppointments }) => {
//   const navigate = useNavigate();

//   const handleFeedbackClick = (appointmentID) => {
//     navigate(`/staff/viewfeedback/feedback/${appointmentID}`);
//   };

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

//   const updateStatus = async (newStatus) => {
//     try {
//         const response = await axios.post('http://localhost:8090/manage-appointment', { appointmentStatus: newStatus });
//         if (response.status === 200 && response.data) {
//             console.log(response.data);  // Bạn có thể kiểm tra giá trị phản hồi ở đây
//             if (response.data !== "Status has been updated to null") {
//                 // Xử lý cập nhật trạng thái thành công
//             } else {
//                 // Xử lý tình huống khi phản hồi không mong muốn
//                 console.error("Unexpected response: Status has been updated to null");
//             }
//         } else {
//             // Xử lý khi phản hồi không phải là 200
//             console.error(`Error: ${response.statusText}`);
//         }
//     } catch (error) {
//         // Xử lý lỗi từ Axios
//         console.error(error);
//     }
// };
  
//   const handleStatusChange = async (id) => {
//     const appointmentToUpdate = Schedule_today.find(
//       (appointment) => appointment.appointmentID === id
//     );
//     console.log(appointmentToUpdate);
  
//     let newStatus;
//     switch (appointmentToUpdate.appointmentStatus) {
//       case "Scheduled":
//       case "Rescheduled":
//         newStatus = "In Progress";
//         break;
//       case "In Progress":
//         newStatus = "Completed";
//         break;
//       case "Completed":
//         newStatus = "Completed";
//         break;
//       default:
//         newStatus = appointmentToUpdate.appointmentStatus;
//     }
  
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         "http://localhost:8090/manage-appointment",
//         {
//           appointmentID: appointmentToUpdate.appointmentID,
//           status: newStatus,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       console.log(id);

//       if (response.status === 200) {
//         setAppointments((prevAppointments) =>
//           prevAppointments.map((appointment) =>
//             appointment.appointmentID === id
//               ? { ...appointment, status: newStatus }
//               : appointment
//           )
//         );

//         alert("Status updated successfully.");
//       } else {
//         alert("Failed to update status. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status. Please try again.");
//     }
//   };

//   // Render schedule items for a specific slot
//   const renderScheduleItem = (slot) => {
//     const schedule = findScheduleForSlot(slot);
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
//           <Box sx={{ boxSizing: "content-box" }}>
//             <Button
//               variant="contained"
//               onClick={() => handleStatusChange(schedule.appointmentID)}
//               style={{
//                 backgroundColor:
//                   schedule.appointmentStatus === "Scheduled"
//                     ? "#FFC107"
//                     : schedule.appointmentStatus === "In Progress"
//                     ? "#1976D2"
//                     : schedule.appointmentStatus === "Completed"
//                     ? "#4CAF50"
//                     : schedule.appointmentStatus === "Rescheduled"
//                     ? "#FFC107"
//                     : null,
//                 color:
//                   schedule.appointmentStatus === "In Progress" ? "#FFF" : "inherit",
//                 boxSizing: "content-box",
//               }}
//               disabled={schedule.status === "Completed"}
//             >
//               {schedule.appointmentStatus}
//             </Button>
//           </Box>
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
