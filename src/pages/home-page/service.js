import { useNavigate } from "react-router-dom";
import "./HomeGuest_style.css";
import { useState } from "react";
import { Helmet } from "react-helmet";
function Service() {
  const navigate = useNavigate();
  const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
  console.log(dataArray);
  function showService() {
    console.log(dataArray + "service");
  }
  function handleNavigate(item) {
    console.log(`${item.serviceName}`);
    navigate(`/home-page/${item.serviceName}`);
  }

  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />

        {/* Swipper css */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </Helmet>

      <section className="service">
        <div className="service_div">
          <div className="service_display">
            {dataArray.map((item, index) => (
              <div className="service_container" key={index}>
                <div
                  className="service_img"
                  onClick={() => handleNavigate(item)}
                >
                  <img src={item.imageURL} alt="" />
                </div>
                <div className="service_name">{item.serviceName}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;