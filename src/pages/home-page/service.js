import { useNavigate } from "react-router-dom";
import "./HomeGuest_style.css";
import { useState } from "react";
function Service() {
  const navigate = useNavigate();
  const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
  console.log(dataArray);
  function showService() {
    console.log(dataArray + "service");
  }
  function handleNavigate(item) {
    console.log(`${item.serviceName}`);
    navigate(`/service-info/${item.serviceName}`);
  }
  return (
    <div>
      <section className="service">
        <div className="service-btn">
          <input type="button" value="SHOW ALL" className="btn" />
        </div>
        <div className="service-display">
          {dataArray.map((item, index) => (
            <div className="service-container" key={index}>
              <div className="service-border"></div>
              <div className="service-img" onClick={() => handleNavigate(item)}>
                <img src={item.imageURL} alt="" />
              </div>
              <div className="service_name">{item.serviceName}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Service;
