import { useEffect, useState } from "react";
import style from "../ChooseTime_style.module.css";
import { format, parseISO } from "date-fns";
function ChooseTimeBox() {
  // lấy ngày về, so sánh với chuỗi
  const [selectingDate, setSelectingDate] = useState(
    localStorage.getItem("selectedDate")
  );
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selecting, setSelecting] = useState(false);
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
    console.log(selectedTime);
  }, [selectedTime]);
  function handleClick(appointment) {
    // const time = format(parseISO(appointment.time), "yyyy-MM-dd HH:mm:ss.SSS");
    // setSelectedTime(...selectedTime, time);
    const time = format(parseISO(appointment.time), "yyyy-MM-dd HH:mm:ss.SSS");
    setSelectedTime((prevSelectedTime) => [...prevSelectedTime, time]);
    localStorage.setItem(
      "appointmentTimes",
      JSON.stringify([...selectedTime, time])
    );
    setSelecting(false);
  }
  function handleDoubleClick(appointment) {
    setSelectedTime((prevSelectedTime) =>
      prevSelectedTime.filter((time) => time !== appointment.time)
    );
    // Xóa selectedTime từ localStorage
    localStorage.setItem(
      "selectedTime",
      JSON.stringify(selectedTime.filter((time) => time !== appointment.time))
    );
  }

  return (
    <>
      <div className={`${style.scheduleContainer} ${style.flexRow}`}>
        <h2 className={style.introduction}>CHOOSE TIME HERE</h2>
        {appointmentsToday.length > 0 ? (
          <div className={style.schedule}>
            {appointmentsToday.map((appointment, index) => (
              <div
                key={index}
                onClick={
                  appointment.status === false
                    ? () => {
                        handleClick(appointment);
                        //setSelecting(true);
                      }
                    : null
                }
                onDoubleClick={() => handleDoubleClick(appointment)}
                className={`${style.timeSlot} ${
                  appointment.status === true ? style.red : style.blue
                } 
                ${
                  selecting === true && appointment.status === false
                    ? style.isSelecting
                    : style.nonSelecting
                } `}
              >
                {format(parseISO(appointment.time), "HH:mm")}
              </div>
            ))}
          </div>
        ) : (
          <p>NO SLOT AVAILABLE</p>
        )}
      </div>
    </>
  );
}

export default ChooseTimeBox;
