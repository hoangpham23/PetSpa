import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ForgetPass_style.module.css";
import { Helmet } from "react-helmet";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/forgotpassword",
        { email: email }
      );
      if (response.status === 200) {
        setMsg("OTP has sent to your email");
        setIsSent(true);
        localStorage.setItem("resetPasswordEmail", email);
        navigate("/forgot-password/verify-otp");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setMsg("This account does not exist");
      }
    }
    console.log("Email submitted:", email);
  }
  return (
    <>
      <Helmet>
        <title>Forget Password Page</title>
      </Helmet>
      <div className={style.newPass_container}>
        <div className={style.pink_background_rectangle}></div>
        <div className={style.newPass_form}>
          <h1>FORGET PASSWORD?</h1>
          <form action="#">
            <div className={style.input_box}>
              <p>Email:</p>{" "}
              <input
                type="text"
                placeholder="ENTER YOUR EMAIL"
                onChange={handleInput}
              />
            </div>
            <p className={style.msg}>{msg}</p>

            <div className={style.sendOTP}>
              <input
                type="submit"
                value="SEND EMAIL OTP"
                className="btn"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
