import React, { useState, useEffect } from "react";
import signInPageImg from "../../assets/img/SignInPage2.jpg";
import emailIconImg from "../../assets/img/email_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import style from "./SignIn_style.module.css";
import queryString from "query-string";

// import SignIn from "./signIn";

function SignIn() {
  localStorage.setItem("role", "");
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  function handleInput(event) {
    setAccount({ ...account, [event.target.name]: event.target.value });
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
    console.log(account);
    try {
      const response = await axios.post("http://localhost:8090/sign-in", {
        email: account.email,
        password: account.password,
      });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("account", response.data);
        if (response.data.role === "CUS") {
          localStorage.setItem("role", response.data.role);
          navigate("/home-page");
        }
      }
      console.log(response);
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
        <meta charset="UTF-8 " />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign In Page</title>
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
      </Helmet>
      <div className={style.signIn_container}>
        <div className={style.signIn_page}>
          <div className={style.signIn_img}>
            <img src={signInPageImg} alt="" />
          </div>
          <div className={style.signIn_container}>
            <div className={style.signIn}>
              <div className={style.signIn_form}>
                <div className={style.purple_background_rectangle}></div>
                <h3>SIGN IN</h3>
                <form action="#">
                  <div className={style.input_box}>
                    <p>User Name:</p>{" "}
                    <input
                      type="text"
                      placeholder="ENTER YOUR USER NAME HERE"
                      name="email"
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
                  <div className={style.signIn_box}>
                    <div className={style.forget_btn}>
                      <a
                        href="/forgot-password"
                        className={style.forget_password}
                      >
                        Forget Password?
                      </a>
                    </div>
                    <div>{msg}</div>
                    <div>
                      <input
                        type="submit"
                        value="SIGN IN"
                        className={style.signIn_btn}
                        onClick={handleSubmit}
                      />
                    </div>

                    <div className={style.signIn_Google}>
                      <h4>-----------OR-----------</h4>
                      <div className={style.signIn_Google_container}>
                        <img src={emailIconImg} alt="" />
                        <a
                          href="http://localhost:8090/oauth2/authorization/google"
                          className={style.signIn_google}
                        >
                          Sign In With Your Google Account
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={style.register}>
              <div className={style.pink_background_rectangle}></div>
              <div className={style.register_content}>
                <h4>Do not have account? Register now!</h4>
                <div>
                  <input
                    type="submit"
                    value="SIGN UP"
                    className={style.signUp_btn}
                    onClick={handleSignUp}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
