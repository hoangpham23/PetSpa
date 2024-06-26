import axios from "axios";
import { useRef, useState } from "react";
import style from "./NewPass_style.module.css";
import { Navigate, useNavigate } from "react-router-dom";
function NewPass() {
  const [newPass, setNewPass] = useState({
    email: localStorage.getItem("resetPasswordEmail"),
    password: "",
    otp: "",
  });
  const [msg, setMsg] = useState("");
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  function handleInput(e) {
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (newPass.password === "" || newPass.otp === "") {
      setMsg("Please fill in all fields.");
      return;
    }

    const confirmPassword = confirmPasswordRef.current.value;

    // Compare passwords before sending the request
    if (newPass.password !== confirmPassword) {
      setMsg("Passwords do not match. Please try again.");
      return; // Prevent sending the request if passwords don't match
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8090/forgotpassword/verify-otp",
        {
          email: newPass.email,
          password: newPass.password,
          otp: newPass.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMsg("Sucessfully update password");
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setMsg(error.response.data);
      }
    }
  }
  async function handleSendOtp() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/forgotpassword",
        {
          email: localStorage.getItem("resetPasswordEmail"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMsg("Successfully resend otp");
      }
      console.log(msg);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setMsg("This account does not exist");
      }
    }
  }

  return (
    <div className={style.newPass_container}>
      <div className={style.pink_background_rectangle}></div>
      <div className={style.newPass_form}>
        <h1>FORGET PASSWORD?</h1>
        <form action="#">
          <div className={style.input_box}>
            <p>New Password:</p>{" "}
            <input
              type="password"
              placeholder="ENTER YOUR NEW PASSWORD"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className={style.input_box}>
            <p>Confirm Password:</p>{" "}
            <input
              type="password"
              placeholder="ENTER AGAIN YOUR NEW PASSWORD"
              ref={confirmPasswordRef}
            />
          </div>
          <div className={style.input_box}>
            <p>Email OTP:</p>{" "}
            <input
              type="number"
              placeholder="ENTER YOUR EMAIL OTP"
              onChange={handleInput}
              name="otp"
            />
          </div>
          <h2>{msg}</h2>
          <br></br>
          <div className={style.signUn_btn}>
            <input
              type="submit"
              value="UPDATE PASSWORD"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
          <br></br>
          <div className={style.signUn_btn}>
            <input
              type="submit"
              value="RESEND OTP"
              className="btn"
              onClick={handleSendOtp}
            />
          </div>
        </form>
        <br></br>
      </div>
    </div>
  );
}
export default NewPass;
