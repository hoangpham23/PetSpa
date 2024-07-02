import { Grid, ThemeProvider, createTheme, styled } from "@mui/material";
import SideBar from "../../components/side-bar/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DataRow from "./DataRow/DataRow";
import BarChart2 from "./BarChart/BarChart2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import axios from "axios";
import LineChartMonthly from "./LineChart/LineChartMonthly";

function getOffsetFromLocalStorage() {
  // Lấy giá trị offset từ localStorage
  const offset = localStorage.getItem("offset");
  // Nếu không có giá trị trong localStorage, mặc định là 0
  return offset ? parseInt(offset, 10) : 0;
}

function DashBoard() {
  //  Prepare data to send

  const offset = getOffsetFromLocalStorage();
  // khi nhấn vào mũi tên thì nó sẽ cập nhật offset
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState([]);
  useEffect(() => {
    console.log(offset);
    console.log("s", startDate);
    console.log(endDate);
    console.log(report);
  }, [offset, startDate, endDate, report]);
  useEffect(() => {
    localStorage.setItem("offset", 0);
  }, []);
  useEffect(() => {
    async function init() {
      const { startOfWeek, endOfWeek } = await getStartAndEndOfWeek(0);
      await getData(startOfWeek, endOfWeek);
    }
    init();
  }, []);
  function getStartAndEndOfWeek(offset) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // get current day of the week (0-6), where 0 is Sunday and 6 is Saturday
    const startOfWeek = new Date(today); // create a copy of today's date

    // Calculate the start of the week (Monday)
    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - offset * 7 + 1
    );
    startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);
    endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day

    setStartDate(startOfWeek.toISOString().split("T")[0]);
    setEndDate(endOfWeek.toISOString().split("T")[0]);
    return {
      startOfWeek: startOfWeek.toISOString().split("T")[0],
      endOfWeek: endOfWeek.toISOString().split("T")[0],
    };
  }

  async function handleClick(action) {
    let offset = parseInt(localStorage.getItem("offset"), 10) || 0;
    if (action === "Previous") {
      offset += 1;
    } else if (action === "Next") {
      if (offset === 0) {
        return;
      }
      offset -= 1;
    }
    localStorage.setItem("offset", offset.toString());

    const { startOfWeek, endOfWeek } = await getStartAndEndOfWeek(offset);
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
    getData(startOfWeek, endOfWeek);
  }
  async function getData(startOfWeek, endOfWeek) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/weekly-revenue?startDate=${startOfWeek}&endDate=${endOfWeek}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setReport(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins,sans-serif", // Thay đổi font chữ ở đây
      fontSize: 18, // Cỡ chữ mặc định
    },
  });
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "2rem",
        // backgroundColor: "#f0f0f0",
        //background: "linear-gradient(150deg, white, #023047)",
        //background: "linear-gradient(185deg, white, #7FA3B2)",
        // background: "linear-gradient(190deg, white,#FBE2E4)",
        //backgroundImage: `url(${dbg})`,
        background: "linear-gradient(125deg, white,#E3D1E3)",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box sx={{ marginBottom: "3rem", marginTop: "3rem" }}>
                    <DataRow report={report} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "2rem",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        display: "flex",
                        paddingTop: "2rem",
                        paddingLeft: "10rem",
                      }}
                    >
                      <p sx={{ fontSize: "1.6rem" }}>Pet Spa's weekly income</p>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        <ChevronLeftIcon
                          name="Previous"
                          onClick={() => handleClick("Previous")}
                          sx={{
                            fontSize: "4rem",
                          }}
                        />
                      </Box>
                      <BarChart2 report={report} />
                      <Box>
                        <ChevronRightIcon
                          name="Next"
                          onClick={() => handleClick("Next")}
                          sx={{ fontSize: "4rem" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5} md={5}>
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "2rem",
                    height: "80vh",

                    marginTop: "3rem",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <LineChartMonthly />
                  {/* <BasicRangeShortcuts /> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={12}></Grid>

              {/* <BasicRangeShortcuts /> */}
            </Grid>
          </Grid>

          {/* DATA ROW
            <Grid item xs={7} md={7}>
              <Box sx={{ marginBottom: "6rem", marginTop: "5rem" }}>
                <DataRow report={report} />
              </Box>
            </Grid>
            <Grid item xs={5} md={5}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "2rem",
                }}
              >
                <DataRow report={report} />
              </Box>
            </Grid>
          </Grid>
          
          <Grid container spacing={2}>
            <Grid item xs={7} md={7}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "2rem",
                  // width: au,
                }}
              >
                <Box
                  sx={{
                    justifyContent: "flex-start",
                    display: "flex",
                    paddingTop: "2rem",
                    paddingLeft: "10rem",
                  }}
                >
                  <p sx={{ fontSize: "1.6rem" }}>Pet Spa's weekly income</p>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <ChevronLeftIcon
                      name="Previous"
                      onClick={() => handleClick("Previous")}
                      sx={{ fontSize: "4rem" }}
                    />
                  </Box>
                  <BarChart2 report={report} />
                  <Box>
                    <ChevronRightIcon
                      name="Next"
                      onClick={() => handleClick("Next")}
                      sx={{ fontSize: "4rem" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}></Grid>
          </Grid> */}
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default DashBoard;
