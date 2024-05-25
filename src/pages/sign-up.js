import React, { useRef, useState } from "react";
import "../style/SignUp_style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [info, setInfo] = useState({
    customerName: "",
    password: "",
    phoneNumber: "",
    email: "",
  });
  function handleInput(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [mess, setMess] = useState("");
  const confirmPasswordRef = useRef();
  async function handleSubmit(event) {
    event.preventDefault();
    const confirmPassword = confirmPasswordRef.current.value;
    if (info.password !== confirmPassword) {
      setMess("Passwords do not match. Please try again.");
      return; // Prevent sending the request if passwords don't match
    }
    try {
      const response = await axios.post("http://localhost:8090/sign-up", {
        customerName: info.customerName,
        password: info.password,
        phoneNumber: info.phoneNumber,
        email: info.email,
      });

      if (response.status === 201) {
        setIsRegistered(true);
        setMess("SUCCESSFULLY SIGN UP");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      console.log(typeof info.phoneNumber);
      setMess(error.response.data);
    }
  }
  return (
    <div className="signUp_container">
      <div className="pink-background-rectangle"></div>
      <div className="signUp-form">
        <h1>SIGN UP</h1>
        <form action="#">
          <div className="input-box">
            <p>User Name:</p>{" "}
            <input
              type="text"
              placeholder="ENTER YOUR USER NAME HERE"
              name="customerName"
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <p>Password:</p>{" "}
            <input
              type="password"
              placeholder="ENTER YOUR PASSWORD HERE"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <p>Confirm Password:</p>{" "}
            <input
              type="password"
              placeholder="ENTER AGAIN YOUR PASSWORD HERE"
              ref={confirmPasswordRef}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <p>Phone:</p>{" "}
            <input
              type="text"
              placeholder="ENTER YOUR PHONE NUMBER HERE"
              name="phoneNumber"
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <p>Email:</p>{" "}
            <input
              type="text"
              placeholder="ENTER YOUR EMAIL HERE"
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="signUn_btn">
            <input
              type="submit"
              value="SIGN UP"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <h2>{mess}</h2>
      </div>
    </div>
  );
}
export default SignUp;
