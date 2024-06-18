import React, { useEffect } from "react";
//import "../../pages/home-page/HomeCus_style.css";
// import "../../home-page/HomeGuest_style.css";
import "./HeaderColor_style.css";
function HeaderColor() {
  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".header");
      header.classList.toggle("sticky", window.scrollY > 100);
    };
  });

  return (
    <header className="header">
      <div className="header-blue-backgroud-rectangle"></div>
      <div className="header-pink-backgroud-rectangle"></div>
      <div className="navbar-header">
        <nav className="navbar">
          <a href="#">HOMEPAGE</a>
          <a href="#">SERVICES</a>
          <a href="#">CONTACT</a>
          <a href="#">HISTORY PAYMENT</a>
          <a href="/sign-in">SIGN OUT</a>
        </nav>
        <p>Name</p>
      </div>
    </header>
  );
}
export default HeaderColor;