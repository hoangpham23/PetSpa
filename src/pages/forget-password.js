import React, { useState } from "react";
import "../style/ForgetPass_style.css";
import axios from "axios";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/forgotpassword",
        { email: email }
      );
      if (response.status === 200) {
        setMsg(response.data);
        setIsSent(true);
        localStorage.setItem("resetPasswordEmail", email);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setMsg(error.response.data);
      }
    }
    console.log("Email submitted:", email);
  }
  return (
    <div className="newPass_container">
      <div className="pink-background-rectangle"></div>
      <div className="newPass-form">
        <h1>FORGET PASSWORD?</h1>
        <form action="#">
          <div className="input-box">
            <p>Email:</p>{" "}
            <input
              type="text"
              placeholder="ENTER YOUR EMAIL"
              onChange={handleInput}
            />
          </div>
          <div className="signUn_btn">
            <input
              type="submit"
              value="SEND EMAIL OTP"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <br />
        <h2>{msg}</h2>
        <br />
        {isSent && (
          <h3>
            <a href="/forgotpassword/verify-otp">click here to continue</a>
          </h3>
        )}
        ;
      </div>
    </div>
  );
}
export default ForgetPassword;
