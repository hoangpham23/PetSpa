// import { useEffect, useState } from "react";
// import style from "../ChooseTime_style.module.css";
// import { format, parseISO } from "date-fns";
// function ChooseTimeBox() {
//   // lấy ngày về, so sánh với chuỗi
//   const [selectingDate, setSelectingDate] = useState(
//     localStorage.getItem("selectedDate")
//   );
//   const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
//   const [appointmentsToday, setAppointmentsToday] = useState([]);
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [selecting, setSelecting] = useState(false);
//   useEffect(() => {
//     const updateAppointmentsToday = () => {
//       if (selectingDate) {
//         const filteredAppointments = appointments.filter((appointment) => {
//           return (
//             format(parseISO(appointment.time), "yyyy-MM-dd") === selectingDate
//           );
//         });
//         setAppointmentsToday(filteredAppointments);
//       } else {
//         setAppointmentsToday([]);
//       }
//     };
//     updateAppointmentsToday();
//   }, [selectingDate]);
//   useEffect(() => {
//     console.log("appointmentsToday: ", appointmentsToday);
//   }, [appointmentsToday]);
//   useEffect(() => {
//     console.log(selectedTime);
//   }, [selectedTime]);
//   function handleClick(appointment) {
//     // const time = format(parseISO(appointment.time), "yyyy-MM-dd HH:mm:ss.SSS");
//     // setSelectedTime(...selectedTime, time);
//     const time = format(parseISO(appointment.time), "yyyy-MM-dd HH:mm:ss.SSS");
//     setSelectedTime((prevSelectedTime) => [...prevSelectedTime, time]);
//     localStorage.setItem(
//       "appointmentTimes",
//       JSON.stringify([...selectedTime, time])
//     );
//     setSelecting(true);
//   }
//   function handleDoubleClick(appointment) {
//     setSelectedTime((prevSelectedTime) =>
//       prevSelectedTime.filter((time) => time !== appointment.time)
//     );
//     // Xóa selectedTime từ localStorage
//     localStorage.setItem(
//       "selectedTime",
//       JSON.stringify(selectedTime.filter((time) => time !== appointment.time))
//     );
//   }

//   return (
//     <>
//       <div className={`${style.scheduleContainer} ${style.flexRow}`}>
//         <h2 className={style.introduction}>CHOOSE TIME HERE</h2>
//         {appointmentsToday.length > 0 ? (
//           <div className={style.schedule}>
//             {appointmentsToday.map((appointment, index) => (
//               <div
//                 key={index}
//                 onClick={
//                   appointment.status === false
//                     ? () => {
//                         handleClick(appointment);
//                         //setSelecting(true);
//                       }
//                     : null
//                 }
//                 onDoubleClick={() => handleDoubleClick(appointment)}
//                 className={`${style.timeSlot} ${
//                   appointment.status === true ? style.red : style.blue
//                 }
//                 ${
//                   selecting === true && appointment.status === false
//                     ? style.isSelecting
//                     : style.nonSelecting
//                 } `}
//               >
//                 {format(parseISO(appointment.time), "HH:mm")}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>NO SLOT AVAILABLE</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default ChooseTimeBox;
import { useEffect, useState } from "react";
import style from "../ChooseTime_style.module.css";
import { format, parseISO } from "date-fns";

function ChooseTimeBox() {
  const [selectingDate, setSelectingDate] = useState(
    localStorage.getItem("selectedDate")
  );
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const cartsystem = JSON.parse(localStorage.getItem("cart"));
  const numOfServices = cartsystem.length;
  const [msg, setMsg] = useState("");
  useEffect(() => {
    localStorage.setItem("appointmentTimes", JSON.stringify(selectedTimes));
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

  const handleDoubleClick = (appointment) => {
    setSelectedTimes((prevSelectedTimes) =>
      prevSelectedTimes.filter((time) => time !== appointment.time)
    );
    localStorage.setItem(
      "selectedTimes",
      JSON.stringify(selectedTimes.filter((time) => time !== appointment.time))
    );
  };

  return (
    <div className={`${style.scheduleContainer} ${style.flexRow}`}>
      {/* thêm component ở đâu */}
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
  );
}

export default ChooseTimeBox;
