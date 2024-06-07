import axios from "axios";
import style from "../forgotpassword/ForgetPass_style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
function VerifyOtpSignUp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleInput = (event) => {
    setOtp(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/sign-up/verify-otp",
        { otp: otp }
      );
      if (response.status === 200) {
        setMsg("Sucessfully sign up");
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setMsg("Invalid Otp");
      }
    }
    console.log("Otp submitted:", otp);
  }
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
      <div className={style.newPass_container}>
        <div className={style.pink_background_rectangle}></div>
        <div className={style.newPass_form}>
          <h1>Check your mail, we have sent otp </h1>
          <form action="#">
            <div className={style.input_box}>
              <p>OTP:</p>{" "}
              <input
                type="text"
                placeholder="ENTER OTP"
                onChange={handleInput}
              />
            </div>
            <div className={style.signUn_btn}>
              <input
                type="submit"
                value="SIGN UP"
                className="btn"
                onClick={handleSubmit}
              />
            </div>
          </form>

          {/* Khum bít làm sao cho 2 cái icon này chồng lên nhau hết huhu */}
          <div className={style.backToPrevious}>
            <input
              type="submit"
              value=""
              className="btn"
              onClick={navigate("/sign-up")}
            />
            <span
              className="material-symbols-outlined"
              onClick={navigate("/sign-up")}
            >
              arrow_back
            </span>
          </div>
        </div>

        {msg}
      </div>
    </>
  );
}

export default VerifyOtpSignUp;
