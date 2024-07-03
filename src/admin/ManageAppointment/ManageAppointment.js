import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import SideBar from "../../components/side-bar/SideBar";
import styled from "styled-components";
import CustomizedTables from "./Table";

function ManageAppointment() {
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
          <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
            <h1
              style={{
                marginTop: "6rem",
                marginBottom: "3rem",
                textAlign: "left",
              }}
            >
              Appointment today
            </h1>
          </Box>
          <CustomizedTables />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default ManageAppointment;
