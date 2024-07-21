import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Footer from "../../components/footer/footer";
import HeaderColor from "../../components/header/HeaderColor";
import UserAuth from "../../hooks/UserAuth";
import Grid from "@mui/material/Grid";
import Reschedule from "./reschedule/Reschedule";
import { Helmet } from "react-helmet";

function PaymentHistory() {
  UserAuth(["CUS"]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [listService, setListService] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getData(event) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/payment-history",
        { customerID: localStorage.getItem("customerID") },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPaymentHistory(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCompleted(paymentHistory.completed);
    setUpcoming(paymentHistory.upcoming);
  }, [paymentHistory]);
  useEffect(() => {
    console.log(listService);
  }, [listService]);
  useEffect(() => {
    console.log(upcoming, "upcoming ne");
  }, [upcoming]);
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Box>
        <HeaderColor />
      </Box>

      <Box minHeight={"71vh"} sx={{ margin: "9rem 6rem" }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <h1 style={{ marginBottom: "2rem" }}>Completed</h1>
            <TableComplete completed={completed} />
          </Grid>
          <Grid item xs={12} md={6}>
            <h1 style={{ marginBottom: "2rem" }}>Upcoming</h1>
            <TableUpcoming
              upcoming={upcoming}
              handleOpen={handleOpen}
              setListService={setListService}
            />
          </Grid>
          <Reschedule
            open={open}
            handleClose={handleClose}
            listService={listService}
            getDataUpcoming={getData}
          />
        </Grid>
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
}

export default PaymentHistory;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#90ABAF",
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Poppins, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E3ECE9",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableComplete({ completed }) {
  if (!completed || completed.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>No completed payments found.</div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 300, maxWidth: "100%" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>No. </StyledTableCell>
            <StyledTableCell align="right">Payment Time</StyledTableCell>
            <StyledTableCell align="right">Pet Name</StyledTableCell>
            <StyledTableCell align="right">List Service</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completed.map((completed, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                <span style={{ marginRight: "10px" }}>
                  {format(new Date(completed.paymentTime), "dd/MM/yyyy")}
                </span>
                <span>{format(new Date(completed.paymentTime), "HH:mm")}</span>
              </StyledTableCell>
              <StyledTableCell align="right">
                {completed.petName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {completed.listService.map((service, index) => (
                  <span key={index}>
                    {service.serviceName} - [
                    {format(service.appointmentTime, "dd/MM/yyyy")} -{" "}
                    {format(service.appointmentTime, "HH:mm")}]<br></br>
                  </span>
                ))}
              </StyledTableCell>
              <StyledTableCell align="right">
                {completed.amount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const StyledTableUpcomingCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#083141",
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Poppins, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
  },
}));

const StyledTableUpcomingRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#D7E0E4",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableUpcoming({ upcoming, handleOpen, setListService }) {
  if (!upcoming || upcoming.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>No upcoming appointments found.</div>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableUpcomingCell>No. </StyledTableUpcomingCell>
            <StyledTableUpcomingCell align="right">
              Payment Time
            </StyledTableUpcomingCell>
            <StyledTableUpcomingCell align="right">
              Pet Name
            </StyledTableUpcomingCell>
            <StyledTableUpcomingCell align="right">
              List Service
            </StyledTableUpcomingCell>
            <StyledTableUpcomingCell align="right">
              Amount
            </StyledTableUpcomingCell>
            <StyledTableUpcomingCell align="right"></StyledTableUpcomingCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcoming.map((upcoming, index) => {
            const canReschedule = upcoming.listService.every(
              (service) => service.appointmentStatus === "Scheduled"
            );
            return (
              <StyledTableUpcomingRow key={index}>
                <StyledTableUpcomingCell component="th" scope="row">
                  {index + 1}
                </StyledTableUpcomingCell>
                <StyledTableUpcomingCell align="right">
                  <span style={{ marginRight: "10px" }}>
                    {format(new Date(upcoming.paymentTime), "dd/MM/yyyy")}
                  </span>
                  <span>{format(new Date(upcoming.paymentTime), "HH:mm")}</span>
                </StyledTableUpcomingCell>
                <StyledTableUpcomingCell align="right">
                  {upcoming.petName}
                </StyledTableUpcomingCell>
                <StyledTableUpcomingCell align="right">
                  {upcoming.listService.map((service, index) => (
                    <span key={index}>
                      {service.serviceName} - [
                      {format(new Date(service.appointmentTime), "dd/MM/yyyy")}{" "}
                      - {format(new Date(service.appointmentTime), "HH:mm")}]
                      <br></br>
                    </span>
                  ))}
                </StyledTableUpcomingCell>
                <StyledTableUpcomingCell align="right">
                  {upcoming.amount}
                </StyledTableUpcomingCell>
                <StyledTableUpcomingCell align="right">
                  <Button
                    variant="text"
                    sx={{
                      backgroundColor: canReschedule ? "#668C9B" : "#B0BEC5",
                      "&:hover": {
                        backgroundColor: canReschedule ? "#55727B" : "#B0BEC5",
                      },
                      padding: "1rem 1rem",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => {
                      if (canReschedule) {
                        handleOpen();
                        setListService(upcoming.listService);
                      }
                    }}
                    disabled={!canReschedule}
                  >
                    Reschedule
                  </Button>
                  {canReschedule || (
                    <p
                      style={{
                        fontSize: "1rem",
                        textAlign: "center",
                        fontWeight: "200",
                      }}
                    >
                      you only can reschedule once
                    </p>
                  )}
                </StyledTableUpcomingCell>
              </StyledTableUpcomingRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
