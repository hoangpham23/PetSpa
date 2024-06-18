// export default ChooseTimeBox;
import { useEffect, useState } from "react";
import style from "../ChooseTime_style.module.css";
import { format, parseISO } from "date-fns";
import moment from "moment";

function ChooseTimeBox() {
  const [selectingDate, setSelectingDate] = useState(
    localStorage.getItem("selectedDate")
  );
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState(
    JSON.parse(localStorage.getItem("selectedTimes") || "[]")
  );
  const cartsystem = JSON.parse(localStorage.getItem("cart"));
  const numOfServices = cartsystem.length;
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function formatAppointmentTimes() {
      const formattedAppointmentTimes = selectedTimes.map((time) =>
        moment(time.time).format("YYYY-MM-DD HH:mm:ss.SSS")
      );
      localStorage.setItem(
        "appointmentTimes",
        JSON.stringify(formattedAppointmentTimes)
      );
    }
    formatAppointmentTimes();
  }, [selectedTimes]);
  useEffect(() => {
    console.log(numOfServices);
    if (selectedTimes.length !== numOfServices) {
      setMsg("Please select enough slot of service !!! ");
    } else if (selectedTimes.length === numOfServices) {
      setMsg(" ");
    }
  }, [selectedTimes]);
  useEffect(() => {
    const updateAppointmentsToday = () => {
      if (selectingDate) {
        const filteredAppointments = appointments.filter((appointment) => {
          return (
            format(parseISO(appointment.time), "yyyy-MM-dd") === selectingDate
          );
        });
        setAppointmentsToday(filteredAppointments);
      } else {
        setAppointmentsToday([]);
      }
    };
    updateAppointmentsToday();
  }, [selectingDate]);

  useEffect(() => {
    console.log("appointmentsToday: ", appointmentsToday);
  }, [appointmentsToday]);

  useEffect(() => {
    console.log(selectedTimes);
  }, [selectedTimes]);

  const handleClick = (appointment) => {
    const isAlreadySelected = selectedTimes.some(
      (selected) => selected.time === appointment.time
    );
    if (appointment.status === true) {
      return;
    }
    if (isAlreadySelected) {
      setSelectedTimes((prevSelectedTimes) =>
        prevSelectedTimes.filter(
          (selected) => selected.time !== appointment.time
        )
      );
    } else {
      setSelectedTimes((prevSelectedTimes) => [
        ...prevSelectedTimes,
        appointment,
      ]);
    }
  };
  useEffect(() => {
    localStorage.setItem("selectedTimes", JSON.stringify(selectedTimes));
  }, [selectedTimes]);

  return (
    <>
      <div className={`${style.scheduleContainer} ${style.flexRow}`}>
        {/* thêm component ở đây*/}

        <h2 className={style.introduction}>CHOOSE TIME HERE</h2>
        {appointmentsToday.length > 0 ? (
          <div className={style.schedule}>
            {appointmentsToday.map((appointment, index) => (
              <div
                key={index}
                onClick={() => handleClick(appointment)}
                className={`${style.timeSlot} ${
                  appointment.status ? style.red : style.blue
                } ${
                  selectedTimes.some(
                    (selected) => selected.time === appointment.time
                  )
                    ? style.isSelecting
                    : ""
                }`}
                style={{
                  border: selectedTimes.some(
                    (selected) => selected.time === appointment.time
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
        <h3>{msg}</h3>
      </div>
    </>
  );
}

export default ChooseTimeBox;
