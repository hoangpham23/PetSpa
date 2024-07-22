import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "../Calendar/Calendar";
import Schedule_box from "../Schedule/Schedule_box";

const Timetable = () => {
  
  const [feedback, setFeedback] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [Schedule_today, setSchedule_today] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchSchedule = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/employee/schedule?employeeID=${sessionStorage.getItem("employeeID")}&date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSchedule(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch schedule data
  useEffect(() => {
    fetchSchedule();
  }, [selectedDate]);

  // Update Schedule_today based on selected date
  useEffect(() => {
    if (selectedDate) {
      const filteredSchedule = schedule.find(
        (item) => item.workDate === selectedDate
      );
      if (filteredSchedule) {
        setSchedule_today(filteredSchedule.schedule);
      } else {
        setSchedule_today([]); // Clear the schedule if no match
      }
    }
  }, [selectedDate, schedule]);
console.log(Schedule_today,"Test");
  return (
    <>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  />
      <Schedule_box Schedule_today={Schedule_today} setAppointments={setSchedule_today} selectedDate={selectedDate}/>
    </>
  );
};

export default Timetable;