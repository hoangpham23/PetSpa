import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider } from "@mui/material";
import axios from "axios";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import { format } from "date-fns";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#90ABAF",
    color: theme.palette.common.white,
    fontSize: "1.6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
  },
  "&.scheduled": {
    backgroundColor: "#FFC107",
    fontSize: "1.6rem",
  },
  "&.inProgress": {
    backgroundColor: "#1976D2",
    color: "#FFF",
    fontSize: "1.6rem",
  },
  "&.completed": {
    backgroundColor: "#4CAF50",
    fontSize: "1.6rem",
  },
  "&.rescheduled": {
    backgroundColor: "#FFC107",
    fontSize: "1.6rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ appointments, setAppointments }) {
  const handleStatusChange = async (id) => {
    const appointmentToUpdate = appointments.find(
      (appointment) => appointment.appointmentID === id
    );

    let newStatus;
    switch (appointmentToUpdate.status) {
      case "Scheduled":
      case "Rescheduled":
        newStatus = "In Progress";
        break;
      case "In Progress":
        newStatus = "Completed";
        break;
      case "Completed":
        newStatus = "Completed";
        break;
      default:
        newStatus = appointmentToUpdate.status;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8090/manage-appointment",
        {
          appointmentID: appointmentToUpdate.appointmentID,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.appointmentID === id
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        alert("Status updated successfully.");
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No .</StyledTableCell>
            <StyledTableCell align="right">Appointment Time</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Pet Name</StyledTableCell>
            <StyledTableCell align="right">Service</StyledTableCell>

            <StyledTableCell align="right" style={{ boxSizing: "content-box" }}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row, index) => (
            <React.Fragment key={row.appointmentID}>
              {/* Kiểm tra xem có cần thêm Divider không */}
              {index >= 1 &&
                row.appointmentTime !==
                  appointments.at(index - 1).appointmentTime && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={8}>
                      <Divider
                        sx={{ backgroundColor: "#083141", padding: "1px" }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                )}

              <StyledTableRow
                key={row.appointmentID}
                className={row.status.toLowerCase()}
              >
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.appointmentTime.split(" ")[1]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.customerEmail}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.customerName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.customerPhoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{row.petName}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.serviceName}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.status}</StyledTableCell> */}
                <StyledTableCell
                  key={row.appointmentID}
                  align="right"
                  style={{ width: 160 }}
                >
                  <Box sx={{ boxSizing: "content-box" }}>
                    <Button
                      variant="contained"
                      onClick={() => handleStatusChange(row.appointmentID)}
                      style={{
                        backgroundColor:
                          row.status === "Scheduled"
                            ? "#FFC107"
                            : row.status === "In Progress"
                            ? "#1976D2"
                            : row.status === "Completed"
                            ? "#4CAF50"
                            : row.status === "Rescheduled"
                            ? "#FFC107"
                            : null,
                        color:
                          row.status === "In Progress" ? "#FFF" : "inherit",
                        boxSizing: "content-box",
                      }}
                      disabled={row.status === "Completed"}
                    >
                      {row.status}
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
