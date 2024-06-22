import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";

export default function BarChart2({ report }) {
  const dates = report.map((entry) => entry.date);
  const value = report.map((entry) => entry.totalRevenue);

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
                color: "#FED7DF",
              },
            ]}
            width={1100}
            height={350}
            sx={{
              ".recharts-bar": {
                borderRadius: "20px", // Thiết lập góc bo tròn
              },
              ".recharts-bar-rectangle": {
                rx: "10px", // Làm cho cạnh góc của thanh bar bo tròn
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
