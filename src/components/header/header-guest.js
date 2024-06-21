import React, { useEffect } from "react";
import "../../pages/home-page/HomeGuest_style.css";
function HeaderForGuest() {
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
    console.log(dataArray, " neee");
  }, [dataArray]);
  return (
    <header className="header">
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

          <a href="#contact">CONTACT</a>
          <a href="/sign-in">SIGN IN</a>
        </nav>
        <p>GUEST</p>
      </div>
    </header>
  );
}
export default HeaderForGuest;
