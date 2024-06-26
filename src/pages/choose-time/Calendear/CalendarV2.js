import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format, parseISO } from "date-fns";
import "./CalendarV2_style.css";
import { Box } from "@mui/material";

export default function DateCalendarValue() {
  const initialSelectedDate = localStorage.getItem("selectedDate");
  const parsedDate = initialSelectedDate
    ? dayjs(parseISO(initialSelectedDate))
    : dayjs();
  const [selectedDate, setSelectedDate] = React.useState(parsedDate);

  const handleDateChange = (newDate) => {
    if (newDate) {
      setSelectedDate(newDate);
      const storedSelectedDate = localStorage.getItem("selectedDate");
      if (storedSelectedDate !== newDate.format("YYYY-MM-DD")) {
        // Nếu có thay đổi, lưu ngày mới vào localStorage và thực hiện reload trang
        localStorage.setItem("selectedDate", newDate.format("YYYY-MM-DD"));
        window.location.reload();
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        border: "10px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        width: "47rem",
        height: "47rem",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DateCalendar", "DateCalendar"]}
          sx={{ overflow: "hidden" }}
        >
          <DemoItem sx={{ overflow: "auto" }}>
            <DateCalendar
              value={selectedDate} // Truyền đối tượng dayjs trực tiếp
              onChange={handleDateChange} // Xử lý khi ngày thay đổi
              className="custom-calendar" // Áp dụng lớp CSS
              sx={{
                overflow: "auto",
                width: "400px",
                lineHeight: 1,
                fontSize: "1.5rem",
              }}
              views={["day"]}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
