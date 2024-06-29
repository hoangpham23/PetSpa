import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import dayjs from "dayjs";
// import DateRangePickerValue from "../../../components/customCalendar/CustomDateRange";
import { DatePicker, Space } from "antd";
import { Padding } from "@mui/icons-material";
import axios from "axios";
import moment from "moment/moment";
import Grid from "@mui/material/Grid";
const { RangePicker } = DatePicker;

export default function LineChartMonthly() {
  // Generate random data for xAxis and series
  // Generate an array of 100 random numbers between 0 and 10
  const today = dayjs();
  const [startDate, setStartDate] = React.useState(
    formatDate(today.startOf("month"))
  );
  const [endDate, setEndDate] = React.useState(
    formatDate(today.endOf("month"))
  );

  const [value, setValue] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState("");
  const [totalOrder, setTotalOrder] = React.useState("");
  // tự động gửi ngày bắt đầu và hiện tại đến api và sau đó lấy data
  //xAixs: chỉ lấy ngày
  function formatDate(day) {
    if (!dayjs.isDayjs(day)) {
      throw new TypeError("Expected a dayjs object");
    }
    return day.format("YYYY-MM-DD");
  }

  async function getData(startDate, endDate) {
    try {
      const response = await axios.get(
        `http://localhost:8090/weekly-revenue?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(response.data);
      setValue(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getData(startDate, endDate);
  }, []);
  React.useEffect(() => {
    getData(startDate, endDate);
  }, [startDate, endDate]);

  React.useEffect(() => {
    console.log("value", value);
    if (value.length > 0) {
      const xAxis = value.map((item) => dayjs(item.date).format("DD"));
      const series = value.map((item) => item.totalRevenue); // Thay `item.amount` bằng trường dữ liệu thực tế từ API
      setXAxisData(xAxis);
      setSeriesData(series);
      const totalAmount = value.reduce(
        (sum, entry) => sum + parseInt(entry.totalRevenue),
        0
      );
      setTotalAmount(totalAmount);
      const totalOrder = value.reduce(
        (sum, entry) => sum + parseInt(entry.orderCount),
        0
      );
      setTotalOrder(totalOrder);
    }
  }, [value]);

  const handleDateRangeChange = async (dates) => {
    if (dates && dates.length === 2) {
      const start = dates[0];
      const end = dates[1];
      setStartDate(formatDate(start));
      setEndDate(formatDate(end));
      await getData(formatDate(start), formatDate(end));
    }
  };
  // const xAxisData = Array.from({ length: 200 }, (_, index) => index + 1); // Generate [1, 2, 3, ..., 100]
  // const seriesData = Array.from({ length: 200 }, () => Math.random() * 10);
  const [xAxisData, setXAxisData] = React.useState([]);
  const [seriesData, setSeriesData] = React.useState([]);
  return (
    <>
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
        height={350}
      />
      <Box
        sx={{
          margin: "0rem 1rem",
          padding: "1rem 4rem",
          display: "flex",
        }}
      >
        <DateRangePickerValue
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      <Grid container spacing={1} sx={{ margin: "1.5rem 3.5rem" }}>
        <Grid item xs={6} md={6}>
          <Box>
            <Box
              sx={{
                paddingTop: "1.5rem",
                paddingLeft: "1.5rem",
                background: "linear-gradient(180deg, #E0FFFF,#FFF0F5)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "left",
                width: "20rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Box style={{ alignItems: "center" }}>
                <p style={{ fontSize: "1.6rem", paddingTop: "-0.5rem" }}>
                  Total amount
                </p>
                <h2 style={{ padding: "1rem 0rem" }}>$ {totalAmount}</h2>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <Box>
            <Box
              sx={{
                paddingTop: "1.5rem",
                background: "linear-gradient(180deg, #E0FFFF,#FEF1E5)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                width: "20rem",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                marginLeft: "-3.5rem",
              }}
            >
              <Box style={{ alignItems: "center" }}>
                <p style={{ fontSize: "1.6rem", paddingTop: "-0.5rem" }}>
                  Total appointment
                </p>
                <h2 style={{ padding: "1rem 0rem" }}>{totalOrder}</h2>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box style={{ textAlign: "center", margin: "3rem 0rem" }}>
        <p style={{ fontSize: "1.6rem" }}>abcdefghijk@gmail.com</p>
      </Box>
    </>
  );
}

function DateRangePickerValue({ onChange, startDate, endDate }) {
  const defaultRange = [dayjs(startDate), dayjs(endDate)];
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        style={{ padding: "1.5rem 6rem", fontSize: "1.6rem" }}
        defaultValue={defaultRange}
        onChange={onChange}
      />
      {/* <RangePicker picker="month" style={{ padding: "1rem 6rem" }} /> */}
    </Space>
  );
}
