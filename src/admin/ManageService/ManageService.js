import {
  Box,
  Button,
  CssBaseline,
  Divider,
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
import * as React from "react";
import EditAndDeleteService from "./EditAndDeleteService";
import UserAuth from "../../hooks/UserAuth";
import { Helmet } from "react-helmet";
function ManageService() {
  UserAuth(["AD"]);
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
      const token = sessionStorage.getItem("token");
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
    <>
      <Helmet>
        <title>Manage Services</title>
      </Helmet>
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
              <ResponsiveGrid data={data} setData={setData} getData={getData} />
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default ManageService;

function ResponsiveGrid({ data, setData, getData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedService, setSelectedService] = useState(null);
  console.log(data, " dataaa");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 3, sm: 3, md: 12 }}
      >
        {data.map((service, index) => (
          <React.Fragment key={service.seriveID}>
            {index > 0 && service.status !== data.at(index - 1).status && (
              <Grid item xs={12} md={12}>
                <Divider
                  sx={{
                    backgroundColor: "#083141",
                    padding: "1px",
                    marginY: "1rem",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={2} sm={4} md={3} key={index}>
              {service.status === "INACTIVE" ? (
                <Box
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#DCDCDC",
                    width: "250px",
                    height: "150px",
                    padding: "0",
                    textAlign: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                    marginTop: "1rem",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    handleOpen();
                    setSelectedService(service);
                  }}
                >
                  <Box>
                    <p style={{ fontSize: "1.2rem" }}>
                      This service is inactive
                    </p>
                    <p>
                      {service.serviceName} ~ {service.price}$
                    </p>
                  </Box>
                </Box>
              ) : (
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
                  onClick={() => {
                    handleOpen();
                    setSelectedService(service);
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
                    onClick={() => {
                      handleOpen();
                      setSelectedService(service);
                    }}
                  />
                  <p>
                    {service.serviceName} - {service.price}$
                  </p>
                </Box>
              )}
            </Grid>
          </React.Fragment>
        ))}
        <EditAndDeleteService
          open={open}
          handleClose={handleClose}
          service={selectedService}
          getData={getData}
        />
      </Grid>
    </Box>
  );
}
