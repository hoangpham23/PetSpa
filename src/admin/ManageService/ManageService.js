import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import SideBar from "../../components/side-bar/SideBar";
import styled from "styled-components";
import { experimentalStyled } from "@mui/material/styles";
import styles from "./ManageService_style.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { set } from "date-fns";
import SearchBar from "./SearchBar";
import AddService from "./AddService";
function ManageService() {
  const [data, setData] = useState([]);
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins,sans-serif", // Thay đổi font chữ ở đây
      fontSize: 18, // Cỡ chữ mặc định
    },
  });
  const [create, setCreate] = useState(false);
  const handleCreate = () => setCreate(true);
  const handleCloseCreate = () => setCreate(false);
  async function getData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(" http://localhost:8090/add-service", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <Box sx={{ marginTop: "10rem", marginLeft: "7rem" }}> */}
          <Box sx={{ marginLeft: "2rem" }}>
            {/* tạo button add new service */}
            <Box
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                marginBottom: "5rem",
              }}
            >
              <h1
                style={{
                  marginTop: "6rem",
                  marginBottom: "-2rem",
                  textAlign: "left",
                }}
              >
                List Services
              </h1>
              <Box
                display={"flex"}
                sx={{
                  marginTop: "7rem",
                  marginBottom: "-2rem",
                  // justifyContent: "space-between",
                  height: "4.5rem",
                }}
              >
                <SearchBar data={data} setData={setData} getData={getData} />

                <input
                  type="submit"
                  value="+"
                  className={styles.btn}
                  onClick={handleCreate}
                  style={{ margin: "0px 1rem", fontSize: "1.6rem" }}
                />
                <AddService
                  open={create}
                  handleClose={handleCloseCreate}
                  getData={getData}
                />
              </Box>
            </Box>
            <ResponsiveGrid data={data} setData={setData} />
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default ManageService;
const Item = experimentalStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ResponsiveGrid({ data, setData }) {
  console.log(data, " dataaa");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 3, sm: 3, md: 12 }}
      >
        {data.map((service, index) => (
          <Grid item xs={2} sm={4} md={3} key={index}>
            {/* <Item>xs=2</Item> */}
            <Box
              sx={{
                borderRadius: "20px",
                backgroundColor: "#c2e1e6",
                width: "250px",
                height: "280px",
                padding: "0",
                textAlign: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                marginTop: "1rem",
              }}
            >
              <img
                src={service.imageURL}
                alt="display"
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "2rem",
                  borderRadius: "10px",
                }}
              />
              <p>
                {service.serviceName} ~ {service.price}$
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
