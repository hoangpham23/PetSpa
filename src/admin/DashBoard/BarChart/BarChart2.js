import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
//import { ResponsiveChartContainer } from "@mui/x-charts";

export default function BarChart2({ report }) {
  // const dates = report.map((entry) => entry.date);
  const value = report.map((entry) => entry.totalRevenue);
  const dates = report.map((entry) => {
    const fullDate = new Date(entry.date);
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0 nên cộng thêm 1)
    return `${day}-${month}`;
  });
  return (
    <>
      <Box sx={{ alignItems: "center", justifyContent: "center" }}>
        <br></br>

        <Box>
          <BarChart
            //xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
            xAxis={[{ scaleType: "band", data: dates }]}
            series={[
              {
                data: value,
                //color: "#FED7DF",
                //color: "#E3D1E3",
                color: "#C2E1E6",
              },
            ]}
            width={600}
            height={395}
            sx={{
              ".recharts-bar": {
                borderRadius: "20px", // Thiết lập góc bo tròn
              },
              ".recharts-bar-rectangle": {
                rx: "10px", // Làm cho cạnh góc của thanh bar bo tròn
              },
              // width: "100%",
            }}
            style={{ borderRadius: "20px", border: "1px solid black" }}
          />
        </Box>
      </Box>
    </>
  );
}
