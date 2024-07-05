import React, { useState, useEffect } from "react";
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

const Schedule = () => {
  // Function to calculate schedule_endtime
  const calculateEndTime = (startTime) => {
    const [hour, minute] = startTime.split(":");
    const start = new Date();
    start.setHours(parseInt(hour, 10));
    start.setMinutes(parseInt(minute, 10));

    const end = new Date(start.getTime() + 60 * 60 * 1000); // Add 1 hour in milliseconds

    const endHour = end.getHours().toString().padStart(2, "0");
    const endMinute = end.getMinutes().toString().padStart(2, "0");

    return `${endHour}:${endMinute}`;
  };

  // Filter schedules for morning and afternoon
  const morningSchedules = schedules.filter(
    (schedule) => schedule.period === "MORNING"
  );
  const afternoonSchedules = schedules.filter(
    (schedule) => schedule.period === "AFTERNOON"
  );

  return (
    <>
      <Calendar />
      <div className={style.schedule}>
        <table className={style.schedule_table}>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>MORNING</td>
              {[8, 9, 10, 11].map((hour) => {
                const schedule = morningSchedules.find((item) =>
                  item.time.startsWith(`${hour}:`)
                );
                return (
                  <td key={hour}>
                    {schedule && (
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
                                {schedule.time}
                              </TimelineOppositeContent>
                              <TimelineSeparator  className={style.MuiTimelineItem}>
                                <TimelineDot className={style.MuiTimelineDot}/>
                                <TimelineConnector />
                              </TimelineSeparator>
                            </TimelineItem>
                            <TimelineItem >
                              <TimelineOppositeContent color="textSecondary">
                                {calculateEndTime(schedule.time)}
                              </TimelineOppositeContent>
                              <TimelineSeparator  className={style.MuiTimelineItem} >
                                <TimelineDot className={style.MuiTimelineDot}/>
                              </TimelineSeparator>
                            </TimelineItem>
                          </Timeline>
                        </div>
                        <div className={style.details}>
                          <p>{schedule.client}</p>
                          <h2 className={style.service}>{schedule.service}</h2>
                          <button className={style.feedback_button}>
                            View Feedback
                          </button>
                        </div>
                      </div>
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
                                {schedule.time}
                              </TimelineOppositeContent>
                              <TimelineSeparator className={style.MuiTimelineItem}>
                                <TimelineDot  className={style.MuiTimelineDot}/>
                                <TimelineConnector />
                              </TimelineSeparator>
                            </TimelineItem>
                            <TimelineItem>
                              <TimelineOppositeContent color="textSecondary">
                                {calculateEndTime(schedule.time)}
                              </TimelineOppositeContent>
                              <TimelineSeparator className={style.MuiTimelineItem}>
                                <TimelineDot  className={style.MuiTimelineDot} />
                              </TimelineSeparator>
                            </TimelineItem>
                          </Timeline>
                        </div>
                        <div className={style.details}>
                          <p>{schedule.client}</p>
                          <h2 className={style.service}>{schedule.service}</h2>
                          <button className={style.feedback_button}>
                            View Feedback
                          </button>
                        </div>
                      </div>
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
