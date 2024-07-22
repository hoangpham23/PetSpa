import React, { useState, useEffect } from "react";
import signInPageImg from "../../assets/img/SignInPage2.jpg";
import emailIconImg from "../../assets/img/email_icon.png";
import { useNavigate, useLocation, json } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import styles from "./SignIn_style.module.css";
import queryString from "query-string";
import $ from "jquery";
// import SignIn from "./signIn";
import Cookies from "js-cookie";

function SignIn() {
  Cookies.remove("customerData");
  localStorage.clear();
  sessionStorage.setItem("role", "");
  sessionStorage.setItem("account", "");
  sessionStorage.setItem("resetPasswordEmail", "");
  sessionStorage.setItem("customerID", "");
  const [account, setAccount] = useState({
    customerID: "",
    customerName: "",
    email: "",
    password: "",
    role: "",
    numberOfPets: "",
    phoneNumber: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  function handleInput(event) {
    setAccount((account) => ({
      ...account,
      [event.target.name]: event.target.value,
    }));
  }
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (queryParams.error === "email_exists") {
      // Access data from the query parameters and set it to mess state
      setMsg("Email is already exist");
    }
  }, [location]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/sign-in", {
        email: account.email,
        password: account.password,
      });
      console.log(account);
      if (response.status === 200) {
        const updatedAccount = {
          ...account,
          customerID: response.data.customerID,
          role: response.data.role,
          customerName: response.data.customerName,
          numberOfPets: response.data.numberOfPets,
          phoneNumber: response.data.phoneNumber,
        };
        console.log(updatedAccount);
        setAccount(updatedAccount);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("account", JSON.stringify(updatedAccount));
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("customerID", response.data.customerID);
        if (response.data.employeeID) {
          sessionStorage.setItem("employeeID", response.data.employeeID);
        }
        sessionStorage.setItem(
          "accountSession",
          JSON.stringify(updatedAccount)
        );
        sessionStorage.setItem(
          "accountID",
          JSON.stringify(response.data.customerID)
        );
        sessionStorage.setItem("token", response.data.token);

        if (response.data.role === "CUS") {
          navigate("/home-page");
        } else if (response.data.role === "AD") {
          navigate("/dashboard");
        } else if (response.data.role === "EM") {
          navigate("/timetable");
        }
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response && error.response.status === 401) {
        setMsg("Invalid email or password");
      }
    }
  }
  function handleSignUp() {
    navigate("/sign-up");
  }
  return (
    <>
      <Helmet>
        <title>Sign In Page</title>
        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
        /> */}
      </Helmet>
      <div className={styles.wrapperSignup}>
        <main className={styles.mainContent}>
          <div className={styles.signIn_container}>
            <div className={styles.signIn_page}>
              <div className={styles.signIn_img}>
                <img src={signInPageImg} alt="" />
              </div>
              <div className={styles.signIn_container}>
                <div className={styles.signIn}>
                  <div className={styles.signIn_form}>
                    <h3>SIGN IN</h3>
                    <form action="#">
                      <div className={styles.input_box}>
                        <p>Gmail:</p>{" "}
                        <input
                          type="text"
                          placeholder="ENTER YOUR GMAIL HERE"
                          name="email"
                          onChange={handleInput}
                        />
                      </div>
                      <div className={styles.input_box}>
                        <p>Password:</p>{" "}
                        <input
                          type="password"
                          placeholder="ENTER YOUR PASSWORD HERE"
                          name="password"
                          onChange={handleInput}
                        />
                      </div>
                      <div className={styles.signIn_box}>
                        <div className={styles.msg}>{msg}</div>
                        <div className={styles.forget_btn}>
                          <a
                            href="/forgot-password"
                            className={styles.forget_password}
                          >
                            Forget Password?
                          </a>
                        </div>
                        <div>
                          <input
                            type="submit"
                            value="SIGN IN"
                            className={styles.signIn_btn}
                            onClick={handleSubmit}
                          />
                        </div>

                        <div className={styles.signIn_Google}>
                          <h4>-----------OR-----------</h4>
                          <div className={styles.signIn_Google_container}>
                            <img src={emailIconImg} alt="" />
                            <a
                              href="http://localhost:8090/oauth2/authorization/google"
                              className={styles.signIn_google}
                            >
                              Sign In With Your Google Account
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={styles.register}>
                  <div className={styles.pink_background_rectangle}></div>
                  <div className={styles.register_content}>
                    <h4>Do not have account? Register now!</h4>
                    <div>
                      <input
                        type="submit"
                        value="SIGN UP"
                        className={styles.signUp_btn}
                        onClick={handleSignUp}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
