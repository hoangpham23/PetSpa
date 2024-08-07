// export default ChooseTimeBox;
import { useEffect, useState } from "react";
import style from "../ChooseTime_style.module.css";
import { format, parseISO } from "date-fns";
import moment from "moment";

function ChooseTimeBox() {
  const [selectingDate, setSelectingDate] = useState(
    sessionStorage.getItem("selectedDate") || ""
  );
  useEffect(() => {
    console.log(selectingDate, "sele");
    setSelectingDate(sessionStorage.getItem("selectedDate") || "");
  }, []);

  // useEffect(() => {
  //   const storedSelectedDate = sessionStorage.getItem("selectedDate");
  //   if (storedSelectedDate) {
  //     setSelectingDate(storedSelectedDate);
  //   }
  // }, [sessionStorage.getItem("selectedDate")]);
  const appointments = JSON.parse(
    sessionStorage.getItem("appointments") || "[]"
  );

  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState(
    JSON.parse(sessionStorage.getItem("selectedTimes") || "[]")
  );
  const cartsystem = JSON.parse(sessionStorage.getItem("cart") || "[]");
  const numOfServices = cartsystem.length || "";
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function formatAppointmentTimes() {
      const formattedAppointmentTimes = selectedTimes.map((time) =>
        moment(time.time).format("YYYY-MM-DD HH:mm:ss.SSS")
      );
      sessionStorage.setItem(
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
  // useEffect(() => {
  //   const updateAppointmentsToday = () => {
  //     if (selectingDate) {
  //       const filteredAppointments = appointments.filter((appointment) => {
  //         return (
  //           format(parseISO(appointment.time), "yyyy-MM-dd") === selectingDate
  //         );
  //       });
  //       setAppointmentsToday(filteredAppointments);
  //     } else {
  //       setAppointmentsToday([]);
  //     }
  //   };
  //   updateAppointmentsToday();
  // }, [selectingDate]);
  useEffect(() => {
    const updateAppointmentsToday = () => {
      if (selectingDate) {
        const filteredAppointments = appointments.filter((appointment) => {
          return (
            format(parseISO(appointment.time), "yyyy-MM-dd") === selectingDate
          );
        });
        // Update only if appointmentsToday has changed
        setAppointmentsToday((prevAppointmentsToday) => {
          if (
            JSON.stringify(prevAppointmentsToday) !==
            JSON.stringify(filteredAppointments)
          ) {
            return filteredAppointments;
          }
          return prevAppointmentsToday;
        });
      } else {
        setAppointmentsToday([]);
      }
    };
    updateAppointmentsToday();
  }, [selectingDate, appointments]);

  useEffect(() => {
    // Hàm này sẽ được gọi khi tab của người dùng trở nên hiển thị (visible) trở lại
    const handleVisibilityChange = () => {
      // Kiểm tra nếu tab hiện tại đang hiển thị
      if (document.visibilityState === "visible") {
        // Tải lại trang khi tab trở nên hiển thị
        window.location.reload();
      }
    };

    // Thêm một sự kiện để lắng nghe khi tab của người dùng thay đổi trạng thái hiển thị
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Hàm này sẽ được gọi khi component bị gỡ bỏ khỏi DOM hoặc khi useEffect được chạy lại
    // Nó sẽ xóa bỏ sự kiện lắng nghe, giúp tránh rò rỉ bộ nhớ
    return () => {
      // Xóa bỏ sự kiện lắng nghe khi component không còn cần thiết
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    console.log("appointmentsToday: ", appointmentsToday);
  }, [appointmentsToday]);

  useEffect(() => {
    console.log(selectedTimes);
  }, [selectedTimes]);
  useEffect(() => {
    console.log(selectingDate);
  }, [selectingDate]);
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
    sessionStorage.setItem("selectedTimes", JSON.stringify(selectedTimes));
  }, [selectedTimes]);

  return (
    <>
      <div className={style.displayTime}>
        <div class={style.timeDisplay}>
          <div class={style.timeContent}>
            <p>Selecting</p>
            <div class={style.timeColor1}></div>
          </div>
          <div class={style.timeContent}>
            <p>Available</p>
            <div class={style.timeColor2}></div>
          </div>
          <div class={style.timeContent}>
            <p>Full</p>
            <div class={style.timeColor3}></div>
          </div>
        </div>
        <div className={`${style.scheduleContainer} ${style.flexRow}`}>
          {/* thêm component ở đây*/}
          {/* <h2 className={style.introduction}>CHOOSE TIME HERE</h2> */}
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
          <h3 style={{ marginTop: "2rem" }}>{msg}</h3>
        </div>
      </div>
    </>
  );
}

export default ChooseTimeBox;
