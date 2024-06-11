import { Helmet } from "react-helmet";
import "./Calendar_style.css";
import { useEffect } from "react";

function Calendar() {
   //there is 3 things need to be solved, the day in the current month : Mon or Tues or Wed,...
  //Previous month
  //Current month
  //Next month
  useEffect(() => {
    // const daysTag = document.querySelector(".days"),
    //   currentDate = document.querySelector(".current-date"),
    //   prevNextIcon = document.querySelectorAll(".icons span");
    // let date = new Date();
    // let month = date.getMonth();
    // let year = date.getFullYear();
    // const renderCalendar = async () => {
    //   try {
    //     //list full month of a year
    //     const fullMonth = [
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //       "August",
    //       "September",
    //       "October",
    //       "November",
    //       "December",
    //     ];
    //     // const firstDayOfMonth = new Date(month + 1, year, 1).getDay(); // return the day in week
    //     // const lastDateOfMonth = new Date(month + 1, year, 0).getDate(); // return the last date of month
    //     // const lastDateOfPreviousMonth = new Date(month, year, 0).getDate();
    //     // const lastDayOfMonth = new Date(month, year, lastDateOfMonth).getDay();
    //     const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week of the first day of the month
    //     const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Get the last date of the month
    //     const lastDateOfPreviousMonth = new Date(year, month, 0).getDate(); // Get the last date of the previous month
    //     const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    //     let liTag = "";
    //     //handle inactive day in a month
    //     for (let i = firstDayOfMonth; i > 0; i--) {
    //       liTag += `<li class="inactive">${
    //         lastDateOfPreviousMonth - i + 1
    //       }</li>`;
    //     }
    //     for (let i = 1; i <= lastDateOfMonth; i++) {
    //       const isToday =
    //         i === date.getDate() &&
    //         month === new Date.getMonth() &&
    //         year === new Date.getFullYear()
    //           ? "active"
    //           : "";
    //       liTag += `<li class="${isToday}">${i}</li>`;
    //     }
    //     for (let i = lastDayOfMonth; i < 6; i++) {
    //       liTag += `<li class="inactive"> ${i - lastDayOfMonth + 1}</li>`;
    //     }
    //     currentDate.innerText = `${fullMonth[month]} ${year}`;
    //     daysTag.innerHTML = liTag;
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // renderCalendar(); // Call the async function
    // prevNextIcon.forEach((icon) => {
    //   // getting prev and next icons
    //   icon.addEventListener("click", () => {
    //     // adding click event on both icons
    //     // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    //     month = icon.id === "prev" ? month - 1 : month + 1;
    //     if (month < 0 || month > 11) {
    //       // if current month is less than 0 or greater than 11
    //       // creating a new date of current year & month and pass it as date value
    //       date = new Date(year, month, new Date().getDate());
    //       year = date.getFullYear(); // updating current year with new date year
    //       month = date.getMonth(); // updating current month with new date month
    //     } else {
    //       date = new Date(); // pass the current date as date value
    //     }
    //     renderCalendar(); // calling renderCalendar function
    //   });
    // });
    const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span");

    // getting new date, current year and month
    let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();

    // storing full name of all months in array
    const months = [
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

    const renderCalendar = () => {
      let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(
          currYear,
          currMonth,
          lastDateofMonth
        ).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
      let liTag = "";

      for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday =
          i === date.getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear()
            ? "active"
            : "";
        liTag += `<li class="${isToday}">${i}</li>`;
      }

      for (let i = lastDayofMonth; i < 6; i++) {
        // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
      }
      currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
      daysTag.innerHTML = liTag;
    };
    renderCalendar();

    prevNextIcon.forEach((icon) => {
      // getting prev and next icons
      icon.addEventListener("click", () => {
        // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
          // if current month is less than 0 or greater than 11
          // creating a new date of current year & month and pass it as date value
          date = new Date(currYear, currMonth, new Date().getDate());
          currYear = date.getFullYear(); // updating current year with new date year
          currMonth = date.getMonth(); // updating current month with new date month
        } else {
          date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
      });
    });
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
