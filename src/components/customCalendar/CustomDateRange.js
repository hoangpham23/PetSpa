// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

// export default function DateRangePickerValue() {
//   const today = dayjs();
//   const startOfMonth = formatDate(today.startOf("month"));
//   const endOfMonth = formatDate(today.endOf("month"));
//   const [value, setValue] = React.useState([startOfMonth, endOfMonth]);
//   const [lineData, setLineData] = React.useState("[]");
//   function formatDate(day) {
//     if (!dayjs.isDayjs(day)) {
//       throw new TypeError("Expected a dayjs object");
//     }
//     return day.format("YYYY-MM-DD");
//   }
//   const handleDateChange = (newValue) => {
//     if (newValue && newValue[0] && newValue[1]) {
//       const formattedStart = formatDate(dayjs(newValue[0]));
//       const formattedEnd = formatDate(dayjs(newValue[1]));
//       setValue([formattedStart, formattedEnd]);
//     }
//   };
//   React.useEffect(() => {
//     console.log("value ne", value);
//   }, [value]);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
//         <DemoItem component="DateRangePicker">
//           <DateRangePicker
//             value={[dayjs(value[0]), dayjs(value[1])]}
//             onChange={handleDateChange}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import React from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const DateRangePickerValue = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker picker="month" />
  </Space>
);
export default DateRangePickerValue;
