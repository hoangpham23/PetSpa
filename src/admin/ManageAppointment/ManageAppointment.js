import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import SideBar from "../../components/side-bar/SideBar";
import CustomizedTables from "./Table";
import SearchBar from "./SearchBar";
import axios from "axios";
import * as React from "react";
import styles from "./ManageAppointment_style.module.css";
import LimitMaxSlot from "./LimitMaxSlot";
import UserAuth from "../../hooks/UserAuth";
function ManageAppointment() {
  UserAuth(["AD"]);
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins,sans-serif", // Thay đổi font chữ ở đây
      fontSize: 18, // Cỡ chữ mặc định
    },
  });
  const [appointments, setAppointments] = React.useState([]);
  React.useEffect(() => {
    getAppointmentToday();
  }, []);

  const [openLimitSlotFuncion, setOpenLimitSlotFuncion] = React.useState(false);
  const handleOpenLimitSlotFunction = () => setOpenLimitSlotFuncion(true);
  const handleCloseLimitSlotFunction = () => setOpenLimitSlotFuncion(false);
  async function getAppointmentToday() {
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date().toISOString().split("T")[0];
      const response = await axios.get(
        "http://localhost:8090/manage-appointment",
        {
          params: { date: currentDate },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      console.log(response.data);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else if (response.data && typeof response.data === "object") {
          setAppointments([response.data]);
        }
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "2rem",
        backgroundColor: "#f0f0f0",
        minHeight: "95vh",
        marginTop: "3rem",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, justifyContent: "center" }}
        >
          <Box
            display={"flex"}
            sx={{ justifyContent: "space-between", marginBottom: "4rem" }}
          >
            <h1
              style={{
                marginTop: "6rem",
                marginBottom: "-2rem",
                textAlign: "left",
              }}
            >
              Appointment today
            </h1>
            <Box
              disp
              display={"flex"}
              sx={{
                marginTop: "7rem",
                marginBottom: "-2rem",
                // justifyContent: "space-between",
                height: "4.5rem",
              }}
            >
              <SearchBar
                setAppointments={setAppointments}
                appointments={appointments}
                getAppointmentToday={getAppointmentToday}
              />
              <input
                type="submit"
                value="Appointment limitation"
                className={styles.btn}
                onClick={handleOpenLimitSlotFunction}
                style={{ margin: "0px 1rem", fontSize: "1.6rem" }}
              />
              <LimitMaxSlot
                open={openLimitSlotFuncion}
                handleOpen={handleOpenLimitSlotFunction}
                handleClose={handleCloseLimitSlotFunction}
              />
            </Box>
          </Box>
          <CustomizedTables
            appointments={appointments}
            setAppointments={setAppointments}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default ManageAppointment;
