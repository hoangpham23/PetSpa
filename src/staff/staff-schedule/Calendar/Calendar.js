import React, { useState, useEffect, useCallback } from "react";
import style from "./Calendar.module.css";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [startOfWeek, setStartOfWeek] = useState(new Date());

  const formatDate = useCallback((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as yyyy-mm-dd
  }, []);

  useEffect(() => {
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay() + 1);
    setStartOfWeek(currentWeekStart);
    setSelectedDate(formatDate(today)); // Initialize selectedDate as today's date
  }, [formatDate, setSelectedDate]);
  useEffect(() => {
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay() + 1);
    setStartOfWeek(currentWeekStart);
    setSelectedDate(formatDate(today)); // Initialize selectedDate as today's date
  }, []);

  const handlePrevWeek = () => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(newStartOfWeek);
  };

  const handleNextWeek = () => {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(newStartOfWeek);
  };

  const handleClick = (index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const formattedDate = formatDate(date); // Format before setting
    setSelectedDate(formattedDate); // Update selectedDate with formatted value
  };

  useEffect(() => {
    console.log(selectedDate, "formatted selectedDate"); // Log the formatted date
  }, [selectedDate]);

  return (
    <>
      <div className={style.today}>
        <p>
          {new Date(selectedDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className={style.week_calendar}>
        <button className={style.nav_button} onClick={handlePrevWeek}>
          &#9664;
        </button>
        {Array.from({ length: 7 }, (_, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          return (
            <div
              key={index}
              className={`${style.day} ${
                date.toDateString() === new Date(selectedDate).toDateString()
                  ? style.active
                  : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <p>{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
              <p>{date.getDate()}</p>
            </div>
          );
        })}
        <button className={style.nav_button} onClick={handleNextWeek}>
          &#9654;
        </button>
      </div>
    </>
  );
};

export default Calendar;
