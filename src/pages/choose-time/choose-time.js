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
        <div className={style.timeInfo}>
          <h2 className={style.introduction}>CHOOSE TIME HERE</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default ChooseTime;
