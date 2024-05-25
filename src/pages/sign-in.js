import React, { useState } from "react";
import "../style/SignIn_style.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
function SignIn() {
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
    <div className="signIn_container">
      <div className="signIn">
        <div className="purple-background-rectangle"></div>
        <h1>SIGN IN</h1>
        <div className="signIn-form">
          {/* Form start from here */}
          <form action="#">
            <div className="input-box">
              <p>Your email:</p>
              <input
                type="text"
                placeholder="ENTER YOUR EMAIL HERE"
                name="email"
                onChange={handleInput}
              />
            </div>
            <div className="input-box">
              <p>Password:</p>
              <input
                type="password"
                placeholder="ENTER YOUR PASSWORD HERE"
                name="password"
                onChange={handleInput}
              />
            </div>
            <div>
              <p>Forgot password</p>
            </div>
            <div>{mess}</div>
            <div className="signIn_btn">
              <input
                type="submit"
                value="SIGN IN"
                className="btn"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="register">
        <div className="pink-background-rectangle"></div>
        <div className="register-content">
          <h4>Do not have account? Register now!</h4>
          <div className="signUp_btn">
            <input
              type="submit"
              value="SIGN UP"
              className="btn"
              onClick={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSignIn = async (event) => {
//     event.preventDefault();

//     const post = {
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post("http://localhost:8090/sign-in", post, {
//         headers: {
//           "Content-Type": "application/JSON",
//         },
//       });
//       if (response.status === 200) {
//         // Redirect to home page on successful login
//         console.log(response.data);
//         navigate("/home-page");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMessage("Invalid password or password. Please try again.");
//       } else {
//         console.error("Login failed:", error);
//         setErrorMessage(
//           "An error occurred during login. Please try again later."
//         );
//       }
//     }
//   };

//   return (
//     <div className="signIn_container">
//       <div className="signIn">
//         <div className="purple-background-rectangle"></div>
//         <h1>SIGN IN</h1>
//         <div className="signIn-form">
//           <form onSubmit={handleSignIn}>
//             <div className="input-box">
//               <p>User Name:</p>
//               <input
//                 type="text"
//                 placeholder="ENTER YOUR USER NAME HERE"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="input-box">
//               <p>Password:</p>
//               <input
//                 type="password"
//                 placeholder="ENTER YOUR PASSWORD HERE"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="signIn_btn">
//               <input type="submit" value="SIGN IN" className="btn" />
//             </div>
//           </form>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </div>
//       </div>
//       <div className="register">
//         <div className="pink-background-rectangle"></div>
//         <div className="register-content">
//           <h4>Do not have account? Register now!</h4>
//           <div className="signUp_btn">
//             <input
//               type="button"
//               value="SIGN UP"
//               className="btn"
//               onClick={() => navigate("/sign-up")}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn
