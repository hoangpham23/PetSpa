import React, { useRef, useState } from "react";
import style from "./SignUp_style.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  const [mess, setMess] = useState("");
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    if (
      info.customerName === "" ||
      info.password === "" ||
      info.phoneNumber === "" ||
      info.email === ""
    ) {
      setMess("Please fill in all fields.");
      return;
    }
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
      if (response.status === 200) {
        navigate("/sign-up/verify-otp");
        // http://localhost:8090/sign-up/verify-otp
      }

      // if (response.status === 201) {
      //   setMess("SUCCESSFULLY SIGN UP");
      //   setTimeout(() => {
      //     navigate("/sign-in");
      //   }, 3000);
      // }
      console.log(response);
    } catch (error) {
      console.log(error);
      console.log(typeof info.phoneNumber);
      if (error && error.response.status === 409) {
        setMess("Email is already in use");
      }
    }
  }
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign Up Page</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="./SignUp_style.css" />
      </Helmet>
      <div className={style.wrapperSignup}>
        <div className={style.background}>
          <main className={style.mainContent}>
            <div className={style.signUp_container}>
              <div className={style.pink_background_rectangle}></div>
              <div className={style.signUp_form}>
                <h1>SIGN UP</h1>
                <form action="#">
                  <div className={style.input_box}>
                    <p>User Name:</p>{" "}
                    <input
                      type="text"
                      placeholder="ENTER YOUR USER NAME HERE"
                      name="customerName"
                      onChange={handleInput}
                    />
                  </div>
                  <div className={style.input_box}>
                    <p>Password:</p>{" "}
                    <input
                      type="password"
                      placeholder="ENTER YOUR PASSWORD HERE"
                      name="password"
                      onChange={handleInput}
                    />
                  </div>
                  <div className={style.input_box}>
                    <p>Confirm Password:</p>{" "}
                    <input
                      type="password"
                      placeholder="ENTER AGAIN YOUR PASSWORD HERE"
                      ref={confirmPasswordRef}
                      onChange={handleInput}
                    />
                  </div>
                  <div className={style.input_box}>
                    <p>Phone:</p>{" "}
                    <input
                      type="number"
                      placeholder="ENTER YOUR PHONE NUMBER HERE"
                      name="phoneNumber"
                      onChange={handleInput}
                    />
                  </div>
                  <div className={style.input_box}>
                    <p>Email:</p>{" "}
                    <input
                      type="email"
                      placeholder="ENTER YOUR EMAIL HERE"
                      name="email"
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Continue"
                      className={style.btn}
                      onClick={handleSubmit}
                    />
                  </div>
                </form>{" "}
                <br></br>
                <h4>{mess}</h4>
                <br></br>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default SignUp;
