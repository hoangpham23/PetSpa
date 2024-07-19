import React, { useState } from "react";
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

  const morningSlots = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00"];
  const afternoonSlots = ["13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];

  const findScheduleForSlot = (slot) =>
    Schedule_today.find((schedule) => schedule.startTime === slot);

  const handleStatusChange = async (id) => {
    const appointmentToUpdate = Schedule_today.find(
      (appointment) => appointment.appointmentID === id
    );

    let newStatus;
    switch (appointmentToUpdate.appointmentStatus) {
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
        newStatus = appointmentToUpdate.appointmentStatus;
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
              ? { ...appointment, appointmentStatus: newStatus }
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
                  schedule.appointmentStatus === "Scheduled"
                    ? "#FFC107"
                    : schedule.appointmentStatus === "In Progress"
                    ? "#1976D2"
                    : schedule.appointmentStatus === "Completed"
                    ? "#4CAF50"
                    : schedule.appointmentStatus === "Rescheduled"
                    ? "#FFC107"
                    : null,
                color:
                  schedule.appointmentStatus === "In Progress" ? "#FFF" : "inherit",
                boxSizing: "content-box",
              }}
              disabled={schedule.appointmentStatus === "Completed"}
            >
              {schedule.appointmentStatus}
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

