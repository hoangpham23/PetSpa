import React from "react";
import "../../pages/home-page/HomeGuest_style.css";
function HeaderForGuest() {
  return (
    <header className="header">
      <div className="navbar-header">
        <nav className="navbar">
          <a href="#">HOMEPAGE</a>
          <div className="dropdown">
            <a href="#service" className="dropbtn">
              SERVICES
            </a>
            <div className="dropdown-content">
              <a href="#">Service 1</a>
              <a href="#">Service 2</a>
              <a href="#">Service 3</a>
            </div>
          </div>
          <a href="#contact">CONTACT</a>
          <a href="/sign-in">SIGN IN</a>
        </nav>
        <p>Name</p>
      </div>
    </header>
  );
}
export default HeaderForGuest;
