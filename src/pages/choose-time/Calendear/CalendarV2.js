import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format, parseISO } from "date-fns";
import "./CalendarV2_style.css";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateCalendar", "DateCalendar"]}
        sx={{ overflow: "auto" }}
      >
        <DemoItem sx={{ overflow: "auto" }}>
          <DateCalendar
            value={selectedDate} // Truyền đối tượng dayjs trực tiếp
            onChange={handleDateChange} // Xử lý khi ngày thay đổi
            className="custom-calendar" // Áp dụng lớp CSS
            sx={{ overflow: "auto", width: "400px", lineHeight: 1 }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
