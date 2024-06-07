import { Helmet } from "react-helmet";
import "./Calendar_style.css";
import { useEffect } from "react";

function Calendar() {
  //there is 3 things need to be solved, the day in the current month : Mon or Tues or Wed,...
  //Previous month
  //Current month
  //Next month
  useEffect(() => {
    const renderCalendar = async () => {
      try {
        const daysTag = document.querySelector(".days"),
          currentDate = document.querySelector(".current-date"),
          prevNextIcon = document.querySelectorAll(".icons span");
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        //list full month of a year
        const fullMonth = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        // const firstDayOfMonth = new Date(month + 1, year, 1).getDay(); // return the day in week
        // const lastDateOfMonth = new Date(month + 1, year, 0).getDate(); // return the last date of month
        // const lastDateOfPreviousMonth = new Date(month, year, 0).getDate();
        // const lastDayOfMonth = new Date(month, year, lastDateOfMonth).getDay();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week of the first day of the month
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Get the last date of the month
        const lastDateOfPreviousMonth = new Date(year, month, 0).getDate(); // Get the last date of the previous month
        const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
        let liTag = "";
        //handle inactive day in a month
        for (let i = firstDayOfMonth; i > 0; i--) {
          liTag += `<li className="inactive">${
            lastDateOfPreviousMonth - i + 1
          }</li>`;
        }
        for (let i = 1; i <= lastDateOfMonth; i++) {
          const isToday =
            i === date &&
            month === new Date.getMonth() &&
            year === new Date.getFullYear()
              ? "active"
              : "";
          liTag += `<li className="${isToday}">${i}</li>`;
        }
        for (let i = lastDayOfMonth; i < 6; i++) {
          liTag += `<li className="inactive"> ${i - lastDayOfMonth + 1}</li>`;
        }
        currentDate.innerText = `${fullMonth[month]} ${year}`;
        daysTag.innerHTML = liTag;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    renderCalendar(); // Call the async function
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
      <div className="wrapper">
        <header>
          <p className="current-date"></p>
          <div className="icons">
            <span id="prev" className="material-symbols-rounded">
              chevron_left
            </span>
            <span id="next" className="material-symbols-rounded">
              chevron_right
            </span>
          </div>
        </header>
        <div className="calendar">
          <ul className="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="days"></ul>
        </div>
      </div>
    </>
  );
}

export default Calendar;
