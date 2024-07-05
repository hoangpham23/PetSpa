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
