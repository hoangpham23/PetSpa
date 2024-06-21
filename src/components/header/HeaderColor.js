import React, { useEffect, useState } from "react";
//import "../../pages/home-page/HomeCus_style.css";
// import "../../home-page/HomeGuest_style.css";
import "./HeaderColor_style.css";
function HeaderColor() {
  const [name, setName] = useState("");
  const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
  useEffect(() => {
    const handleScroll = () => {
      let header = document.querySelector(".header");
      if (header !== null) {
        header.classList.toggle("sticky", window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      const account = JSON.parse(accountData);
      setName(account.customerName);
    }
  }, []);
  return (
    <header className="header">
      <div className="header-blue-background-rectangle"></div>
      <div className="header-pink-background-rectangle"></div>
      <div className="navbar-header">
        <nav className="navbar">
          <a href="/home-page">HOMEPAGE</a>
          <div className="dropdown">
            <a href="#service" className="dropbtn">
              SERVICES
            </a>
            <div className="dropdown-content">
              {dataArray.map((service, index) => (
                <a
                  key={index}
                  href={`http://localhost:3000/home-page/${service.serviceName}`}
                >
                  {service.serviceName}
                </a>
              ))}
            </div>
          </div>
          <a href="#">CONTACT</a>
          <a href="/payment-history">HISTORY PAYMENT</a>
          <a href="/sign-in">SIGN OUT</a>
        </nav>
        <p>{name}</p>
      </div>
    </header>
  );
}
export default HeaderColor;
