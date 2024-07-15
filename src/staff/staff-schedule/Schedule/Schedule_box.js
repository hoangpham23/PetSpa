import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Schedule.module.css";
import Calendar from "../Calendar/Calendar";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

const Schedule_box = ({schedule}) => {

  let { serviceName } = useParams();
  const navigate = useNavigate();

  const handleFeedbackClick = (appointmentID) => {
    navigate(`/feedback/${appointmentID}`);
  };

  return (
    <div className={style.schedule_item}>
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
              {schedule.schedule.startTime}
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
        <p>{schedule.client}</p>
        <h2 className={style.service}>{schedule.service}</h2>
        <button className={style.feedback_button} onClick={() => handleFeedbackClick(schedule.appointmentID)}>View Feedback</button>
      </div>
    </div>
  );
};

export default Schedule_box;
