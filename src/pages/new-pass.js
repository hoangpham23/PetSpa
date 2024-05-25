import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
function NewPassword() {
  const [newPass, setNewPass] = useState({
    email: localStorage.getItem("resetPasswordEmail"),
    password: "",
    otp: "",
  });
  const [msg, setMsg] = useState("");
  const confirmPasswordRef = useRef();
  function handleInput(e) {
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const confirmPassword = confirmPasswordRef.current.value;

    // Compare passwords before sending the request
    if (newPass.password !== confirmPassword) {
      setMsg("Passwords do not match. Please try again.");
      return; // Prevent sending the request if passwords don't match
    }
    console.log(typeof newPass.otp);
    console.log(newPass);
    try {
      const response = await axios.put(
        "http://localhost:8090/forgotpassword/verify-otp",
        {
          email: newPass.email,
          password: newPass.password,
          otp: newPass.otp,
        }
      );
      if (response.status === 200) {
        setMsg(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setMsg(error.response.data);
      }
    }
  }
  return (
    <div className="newPass_container">
      <div className="pink-background-rectangle"></div>
      <div className="newPass-form">
        <h1>FORGET PASSWORD?</h1>
        <form action="#">
          <div className="input-box">
            <p>New Password:</p>{" "}
            <input
              type="password"
              placeholder="ENTER YOUR NEW PASSWORD"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <p>Confirm Password:</p>{" "}
            <input
              type="password"
              name="confirmPassword"
              placeholder="ENTER AGAIN YOUR NEW PASSWORD"
              ref={confirmPasswordRef}
            />
          </div>
          <div className="input-box">
            <p>Email OTP:</p>{" "}
            <input
              type="text"
              placeholder="ENTER YOUR EMAIL OTP"
              onChange={handleInput}
              name="otp"
            />
          </div>
          <div className="signUn_btn">
            <input
              type="submit"
              value="UPDATE PASSWORD"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <h2>{msg}</h2>
      </div>
    </div>
  );
}
export default NewPassword;
