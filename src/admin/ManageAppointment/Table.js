import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { KeyboardReturnOutlined } from "@mui/icons-material";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    id: 1,
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 24,
    protein: 6.0,
    status: "Completed",
  },
  // Các appointment khác
];

export default function CustomizedTables() {
  const [appointments, setAppointments] = React.useState(rows);

  React.useEffect(() => {
    getAppointmentToday();
  }, []);

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
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }
  //   const handleStatusChange = async (id) => {
  //     // Find the appointment to be updated
  //     const appointmentToUpdate = appointments.find(
  //       (appointment) => appointment.appointmentID === id
  //     );

  //     // Prepare the new status based on the current status
  //     let newStatus;
  //     switch (appointmentToUpdate.status) {
  //       case "Scheduled":
  //       case "Rescheduled":
  //         newStatus = "In Progress";
  //         break;
  //       case "In Progress":
  //         newStatus = "Completed";
  //         break;
  //       case "Completed":
  //         newStatus = "Completed";
  //         break;
  //       default:
  //         newStatus = appointmentToUpdate.status;
  //     }

  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.put(
  //         "http://localhost:8090/manage-appointment",
  //         {
  //           appointmentID: appointmentToUpdate.appointmentID,
  //           status: newStatus,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // If the API call is successful, update the state
  //       if (response.status === 200) {
  //         const updatedAppointments = appointments.map((appointment) => {
  //           if (appointment.appointmentID === id) {
  //             return { ...appointment, status: newStatus };
  //           }
  //           return appointment;
  //         });
  //         setAppointments(updatedAppointments);
  //         alert("Status updated successfully.");
  //       } else {
  //         alert("Failed to update status. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error updating status:", error);
  //       alert("Failed to update status. Please try again.");
  //     }
  //   };
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
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Pet Name</StyledTableCell>
            <StyledTableCell align="right">Service</StyledTableCell>

            <StyledTableCell align="right" style={{ boxSizing: "content-box" }}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row, index) => (
            <StyledTableRow
              key={row.appointmentID}
              className={row.status.toLowerCase()}
            >
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.appointmentTime}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.customerName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.petName}</StyledTableCell>
              <StyledTableCell align="right">{row.serviceName}</StyledTableCell>
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
                      color: row.status === "In Progress" ? "#FFF" : "inherit",
                      boxSizing: "content-box",
                    }}
                  >
                    {row.status}
                  </Button>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
