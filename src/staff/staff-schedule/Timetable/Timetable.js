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
  // const formatDate = useCallback((date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`; // Format as yyyy-mm-dd
  // }, []);
  // useEffect(() => {
  //   const today = new Date();
  //   setSelectedDate(formatDate(today)); // Initialize selectedDate as today's date
  // }, []);

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/employee/schedule?employeeID=${localStorage.getItem("employeeID")}&date=${selectedDate}`,
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

  return (
    <>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  />
      <Schedule_box Schedule_today={Schedule_today}/>
    </>
  );
};

export default Timetable;