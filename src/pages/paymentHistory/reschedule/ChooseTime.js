import { Box, Button, Grid, Modal, createTheme } from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Paper from "@mui/material/Paper";
import { addDays, format, parseISO } from "date-fns";
import { ThemeProvider } from "styled-components";
// import styles from "../../choose-time/ChooseTime_style.module.css";
import styles from "./Reschedule_style.module.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ChooseTime({
  openChooseTime,
  handleCloseChooseTime,
  selectedServices,
  handleClose,
  getDataUpcoming,
}) {
  const today = new Date();
  let startDay = format(today, "yyyy-MM-dd");
  const endDay = format(addDays(startDay, 3), "yyyy-MM-dd");
  // console.log(startDay, endDay);
  const [selectedDate, setSelectedDate] = React.useState(
    format(addDays(today, 1), "yyyy-MM-dd")
  );
  const [appointments, setAppointments] = React.useState([]);
  const [isFullSlot, setIsFullSlot] = React.useState([]);
  const [selectedTimes, setSelectedTimes] = React.useState([]);
  function getHours() {
    const hours = [];
    for (let i = 8; i <= 17; i++) {
      hours.push(i);
    }
    return hours;
  }
  function generateAppointment() {
    try {
      let generateAppointments = [];
      for (let i = 1; i <= 3; i++) {
        const nextDay = format(addDays(today, i), "yyyy-MM-dd");
        const hours = getHours();

        hours.forEach((hour) => {
          //const formattedHour = format(hour, "HH:mm:ss.SS");
          const formattedHour = `${String(hour).padStart(2, "0")}:00:00`;
          const appointmentTime = {
            time: format(`${nextDay} ${formattedHour}`, "yyyy-MM-dd HH:mm:ss"),
            status: false,
          };

          generateAppointments.push(appointmentTime);
        });
      }
      setAppointments(generateAppointments);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    generateAppointment();
  }, []);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    async function getData() {
      const response = await axios.get(
        "http://localhost:8090/appointment/time",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setIsFullSlot(response.data);
        //console.log(typeof appointmentTimes[0]);
      }
    }
    getData();
  }, []);
  React.useEffect(() => {
    if (isFullSlot.length > 0) {
      const updatedAppointments = appointments.map((appointment) => {
        // Kiểm tra mỗi appointment có trong isFullSlot hay không và set status
        const isFull = isFullSlot.some(
          (slot) => slot.appointmentTime === appointment.time
        );
        return { ...appointment, status: isFull };
      });
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    }
  }, [isFullSlot]);
  // React.useEffect(() => {
  //   console.log(appointments);
  //   console.log(isFullSlot);
  // }, [appointments, isFullSlot]);
  async function handleSubmit() {
    try {
      if (selectedServices.length !== selectedTimes.length) {
        return;
      }
      const appointmentID = selectedServices.map(
        (service) => service.appointmentID
      );
      console.log(appointmentID, "apapappap");

      const appointmentTime = selectedTimes.map((time) => time.time);
      console.log(appointmentTime, "apapappap");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/appointment/reschedule",
        { appointmentID: appointmentID, appointmentTime: appointmentTime },
        //{ appointmentID, appointmentTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        handleCloseChooseTime();
        handleClose();
        getDataUpcoming();
        alert("Update successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      {/* <ThemeProvider theme={theme}> */}
      <Modal
        open={openChooseTime}
        onClose={handleCloseChooseTime}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "110rem",
            height: "70rem",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            margin: "0rem 0rem",
          }}
        >
          {/* for girid */}
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4} lg={4}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                    width: "350px",
                    height: "380px",
                  }}
                >
                  <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box sx={{ padding: "0rem 2rem" }}>
                  {/* <h2 style={{ fontSize: "2rem" }}>ChooseTime</h2> */}
                  <ChooseTimeBox
                    selectedDate={selectedDate}
                    appointments={appointments}
                    selectedServices={selectedServices}
                    selectedTimes={selectedTimes}
                    setSelectedTimes={setSelectedTimes}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4} sx={{ alignItems: "start" }}>
                <Box sx={{ justifyContent: "center" }}>
                  <Box sx={{ margin: "0rem 0rem" }}>
                    <h1
                      style={{
                        fontSize: "3.2rem",
                        color: "#3f51b5",
                        textAlign: "center",
                      }}
                    >
                      List Service
                    </h1>
                  </Box>
                  <Box sx={{ margin: "0rem 5rem" }}>
                    <ul style={{ padding: "3rem 0rem", listStyleType: "none" }}>
                      {selectedServices.map((service) => (
                        <li
                          key={service.appointmentID}
                          style={{
                            marginBottom: "1rem",
                            fontSize: "1.6rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {service.serviceName}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      sx={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "#3f51b5",
                        justifyContent: "center",
                        textAlign: "end",
                        color: "white",
                        fontSize: "1.6rem",
                        "&:hover": {
                          backgroundColor: "#303f9f",
                        },
                      }}
                    >
                      Save Change
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}
const customCalendarStyle = {
  typography: {
    fontFamily: ["Poppins", "sans-serif"],
    fontSize: "1.4rem",
  },
  "& .MuiTypography-root": {
    fontFamily: ["Poppins", "sans-serif"],
    fontSize: "1.4rem",
  },
  "& .MuiPickersDay-dayWithMargin": {
    fontFamily: ["Poppins", "sans-serif"],
    fontSize: "1.2rem", // Adjust the font size for day elements
  },
  "& .MuiPickersCalendarHeader-labelContainer": {
    fontSize: "1.2rem", // Chỉnh kích thước font lớn hơn
  },
};

// function calendar
function Calendar({ selectedDate, setSelectedDate }) {
  const [value, setValue] = React.useState(dayjs(selectedDate || "2022-04-17"));

  React.useEffect(() => {
    console.log("selectedDate: ", selectedDate);
  }, [selectedDate]);
  const handleDateChange = (newValue) => {
    setValue(newValue);
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    // You can add any additional logic here to handle the date change, e.g., calling a callback function.
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      style={{ width: "400px", fontSize: "1.4rem" }}
      sx={customCalendarStyle}
    >
      <DateCalendar
        value={value}
        onChange={handleDateChange}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        sx={customCalendarStyle}
      />
    </LocalizationProvider>
  );
}
// funtion choose Time
function ChooseTimeBox({
  selectedDate,
  appointments,
  selectedServices,
  selectedTimes,
  setSelectedTimes,
}) {
  // CHANGE THE STATE EVERYTIME TIHE SELECTEDATE CHANGE
  const [appointmentsToday, setAppointmentsToday] = React.useState([]);
  //const [selectedTimes, setSelectedTimes] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const numOfServices = selectedServices.length;
  React.useEffect(() => {
    console.log("today", appointmentsToday);
  }, [appointmentsToday]);
  React.useEffect(() => {
    const updateAppointmentsToday = () => {
      if (selectedDate) {
        const filteredAppointments = appointments.filter((appointment) => {
          return (
            format(parseISO(appointment.time), "yyyy-MM-dd") === selectedDate
          );
        });
        setAppointmentsToday(filteredAppointments);
      } else {
        setAppointmentsToday([]);
      }
    };
    updateAppointmentsToday();
  }, [selectedDate]);

  const handleClick = (appointment) => {
    const formattedAppointmentTime = format(
      new Date(appointment.time),
      "yyyy-MM-dd HH:mm:ss.SSS"
    );

    const isAlreadySelected = selectedTimes.some(
      (selected) =>
        format(new Date(selected.time), "yyyy-MM-dd HH:mm:ss.SSS") ===
        formattedAppointmentTime
    );

    if (appointment.status === true) {
      return; // Prevent selection if appointment is not available
    }

    const formattedAppointment = {
      ...appointment,
      time: formattedAppointmentTime,
    };

    setSelectedTimes((prevSelectedTimes) => {
      if (isAlreadySelected) {
        // Remove appointment from selectedTimes if already selected
        return prevSelectedTimes.filter(
          (selected) =>
            format(new Date(selected.time), "yyyy-MM-dd HH:mm:ss.SSS") !==
            formattedAppointmentTime
        );
      } else {
        // Add appointment to selectedTimes if not already selected
        return [...prevSelectedTimes, formattedAppointment];
      }
    });
  };
  React.useEffect(() => {
    console.log(selectedTimes);
    if (selectedTimes.length !== numOfServices) {
      setMsg("Please select enough slot of service !!! ");
    } else if (selectedTimes.length === numOfServices) {
      setMsg(" ");
    }
  }, [selectedTimes]);
  return (
    <>
      <div className={styles.displayTime}>
        <div className={styles.timeDisplay}>
          <div className={styles.timeContent}>
            <p>Selecting</p>
            <div className={styles.timeColor1}></div>
          </div>
          <div className={styles.timeContent}>
            <p>Available</p>
            <div className={styles.timeColor2}></div>
          </div>
          <div className={styles.timeContent}>
            <p>Full</p>
            <div className={styles.timeColor3}></div>
          </div>
        </div>
        <div className={`${styles.scheduleContainer} ${styles.flexRow}`}>
          {/* thêm component ở đây*/}
          {/* <h2 className={styles.introduction}>CHOOSE TIME HERE</h2> */}
          {appointmentsToday.length > 0 ? (
            <div className={styles.schedule}>
              {appointmentsToday.map((appointment, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(appointment)}
                  className={`${styles.timeSlot} ${
                    appointment.status ? styles.red : styles.blue
                  } ${
                    selectedTimes.some(
                      (selected) =>
                        format(
                          new Date(selected.time),
                          "yyyy-MM-dd HH:mm:ss.SSS"
                        ) ===
                        format(
                          new Date(appointment.time),
                          "yyyy-MM-dd HH:mm:ss.SSS"
                        )
                    )
                      ? styles.isSelecting
                      : ""
                  }`}
                  style={{
                    border: selectedTimes.some(
                      (selected) =>
                        format(
                          new Date(selected.time),
                          "yyyy-MM-dd HH:mm:ss.SSS"
                        ) ===
                        format(
                          new Date(appointment.time),
                          "yyyy-MM-dd HH:mm:ss.SSS"
                        )
                    )
                      ? "2px solid #000"
                      : "none",
                  }}
                >
                  {format(parseISO(appointment.time), "HH:mm")}
                </div>
              ))}
            </div>
          ) : (
            <p>NO SLOT AVAILABLE</p>
          )}
          <h3 style={{ paddingTop: "1rem" }}>{msg}</h3>
        </div>
      </div>
    </>
  );
}
