import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  MonthCalendar,
  YearCalendar,
} from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styled from "styled-components";
import DateRangePickerValue from "../../../components/customCalendar/CustomDateRange";

export default function LineChartMonthly() {
  // Generate random data for xAxis and series
  const xAxisData = Array.from({ length: 60 }, (_, index) => index + 1); // Generate [1, 2, 3, ..., 100]
  const seriesData = Array.from({ length: 60 }, () => Math.random() * 10); // Generate an array of 100 random numbers between 0 and 10
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const [value, setValue] = React.useState([startOfMonth, endOfMonth]);
  // tự động gửi ngày bắt đầu và hiện tại đến api và sau đó lấy data
  //xAixs: chỉ lấy ngày
  return (
    <>
      <Box sx={{ margin: "0rem 5rem", paddingTop: "1.5rem", display: "flex" }}>
        <h3>TotalAmount : xxx $</h3>
      </Box>

      <LineChart
        xAxis={[{ data: xAxisData }]} // Use `data` instead of `xAxisData`
        series={[
          {
            data: seriesData, // Use `data` instead of `seriesData`
            showMark: ({ index }) => index % 5 === 0,
            color: "#CFDAFE",
          },
        ]}
        width={500}
        height={300}
      />
      <Box sx={{ margin: "0rem 5rem", paddingTop: "1.5rem", display: "flex" }}>
        <DateRangePickerValue />
      </Box>
    </>
  );
}
