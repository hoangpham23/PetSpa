import HeaderForCus from "../../components/header/header-customer";
import Calendar from "./Calendear/Calendar";
import style from "./ChooseTime_style.module.css";
function ChooseTime() {
  return (
    <div className={style.backGround}>
      <HeaderForCus />
      <h1>Complete your appointment</h1>
      <div className={style.boxInfo}>
        <Calendar />
        <div className={`${style.scheduleContainer} ${style.flexRow}`}>
          <h2 className={style.introduction}>CHOOSE TIME HERE</h2>
          <div className={style.schedule}>
            <div className={`${style.timeSlot} ${style.blue}`}>8:00</div>
            <div className={`${style.timeSlot} ${style.red}`}>9:00</div>
            <div className={`${style.timeSlot} ${style.green}`}>10:00</div>
            <div className={`${style.timeSlot} ${style.green}`}>11:00</div>
            <div className={`${style.timeSlot} ${style.blue}`}>12:00</div>
            <div className={`${style.timeSlot} ${style.blue}`}>13:00</div>
            <div className={`${style.timeSlot} ${style.blue}`}>14:00</div>
            <div className={`${style.timeSlot} ${style.red}`}>15:00</div>
            <div className={`${style.timeSlot} ${style.blue}`}>16:00</div>
            <div className={`${style.timeSlot} ${style.blue}`}>17:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseTime;
