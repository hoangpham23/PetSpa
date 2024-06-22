import { Box, Grid } from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

function DataRow({ report }) {
  // lấy dữ liệu ra
  const totalAmount = report.reduce(
    (sum, entry) => sum + parseInt(entry.totalRevenue),
    0
  );
  const totalOrder = report.reduce(
    (sum, entry) => sum + parseInt(entry.orderCount),
    0
  );
  const totalCustomer = report.reduce(
    (sum, entry) => sum + parseInt(entry.customerCount),
    0
  );

  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      paddingLeft={"10rem"}
      paddingRight={"10rem"}
    >
      {/* Biểu đồ tròn 1 */}
      <Grid item xs={4}>
        <Box
          sx={{
            // textAlign: "center",
            backgroundColor: "white",
            borderRadius: "1.7rem",
            display: "flex",
            justifyContent: "center",
            //backgroundColor: "#FFF0F3",
            // backgroundColor: "#FAF8CA",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            paddingY: 2,
          }}
        >
          <Box>
            <p style={{ fontSize: "1.6rem" }}>Total amount</p>
            <h2>${totalAmount}</h2>
          </Box>
          <Box sx={{ marginLeft: "10rem" }}>
            <InsightsIcon
              sx={{
                fontSize: "5rem",
                //alignItems: "center",
                fontWeight: "3",
                color: "rgba(0, 0, 0, 0.3)",
              }}
            />
          </Box>
        </Box>
      </Grid>
      {/* Biểu đồ tròn 2 */}
      <Grid item xs={4}>
        <Box
          sx={{
            // textAlign: "center",
            backgroundColor: "white",
            borderRadius: "1.7rem",
            display: "flex",
            justifyContent: "center",
            //backgroundColor: "#FFF0F3",
            // backgroundColor: "#FAF8CA",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            paddingY: 2,
          }}
        >
          <Box>
            <p style={{ fontSize: "1.6rem" }}>Appointments</p>
            <h2>{totalOrder}</h2>
          </Box>
          <Box sx={{ marginLeft: "10rem" }}>
            <EventAvailableOutlinedIcon
              sx={{
                fontSize: "5rem",
                alignItems: "center",
                color: "rgba(0, 0, 0, 0.3)",
              }}
            />
          </Box>
        </Box>
      </Grid>
      {/* Biểu đồ tròn 3 */}

      <Grid item xs={4}>
        <Box
          sx={{
            // textAlign: "center",
            backgroundColor: "white",
            borderRadius: "1.7rem",
            display: "flex",
            justifyContent: "center",
            //backgroundColor: "#FFF0F3",
            // backgroundColor: "#FAF8CA",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            paddingY: 2,
          }}
        >
          <Box>
            <p style={{ fontSize: "1.6rem" }}>Customer ordered</p>
            <h2>{totalCustomer}</h2>
          </Box>
          <Box sx={{ marginLeft: "10rem" }}>
            <AccountBoxOutlinedIcon
              sx={{
                fontSize: "5rem",
                alignItems: "center",
                color: "rgba(0, 0, 0, 0.3)",
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DataRow;
