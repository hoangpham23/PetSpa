import React, { useState } from "react";
import "../style/SignIn_style2.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignIn2() {
  const [post, setPost] = useState({
    email: "",
    password: "",
  });
  function handleInput(event) {
    setPost({ ...post, [event.target.name]: event.target.value });
  }
  const [isLoggin, setIsLogin] = useState(false);
  const [mess, setMess] = useState();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(post);
    try {
      const response = await axios.post("http://localhost:8090/sign-in", {
        email: post.email,
        password: post.password,
      });

      console.log(response);
      if (response && response.status === 200) {
        setIsLogin(true);
        navigate("/home-page");
      } else {
        console.error(
          "Login failed with status:",
          response ? response.status : "No response"
        );
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setMess(error.response.data);
    }
  }
  const navigate = useNavigate();
  const handleChangePage = () => {
    navigate("/sign-up");
  };
  return (
    <>
      <div class="signIn_page">
        <div class="signIn-img">
          <img src="../img/SignInPage.jpg" alt="" />
        </div>
        <div class="signIn_container">
          <div class="signIn">
            <div class="purple-background-rectangle"></div>
            <h3>SIGN IN</h3>
            <div class="signIn-form">
              <form action="#">
                <div class="input-box">
                  <p>Email :</p>{" "}
                  <input
                    type="text"
                    placeholder="ENTER YOUR EMAIL HERE"
                    name="email"
                    onChange={handleInput}
                  />
                </div>
                <div class="input-box">
                  <p>Password :</p>{" "}
                  <input
                    type="password"
                    placeholder="ENTER YOUR PASSWORD HERE"
                    name="password"
                    onChange={handleInput}
                  />
                </div>
                <div class="signIn-box">
                  <div class="forget_btn">
                    <a
                      href="/forgotpassword"
                      class="forget-password"
                      //   onClick={navigate("/forget-password")}
                    >
                      Forget Password?
                    </a>
                  </div>
                  <div>{mess}</div>
                  <div class="signIn_btn">
                    <input
                      type="submit"
                      value="SIGN IN"
                      class="signIn-btn"
                      onClick={handleSubmit}
                    />
                  </div>
                  <div class="signIn_Google">
                    <h4>-----------OR-----------</h4>
                    <div class="signIn_Google_container">
                      <img src="../img/email_icon.jpg" alt="" />
                      <a href="#" class="signIn-google">
                        Sign In With Your Google Account
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="register">
            <div class="pink-background-rectangle"></div>
            <div class="register-content">
              <h4>Do not have account? Register now!</h4>
              <div class="signUp_btn">
                <input
                  type="submit"
                  value="SIGN UP"
                  class="signUp-btn"
                  onClick={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn2;
