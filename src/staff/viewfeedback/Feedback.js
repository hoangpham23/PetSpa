import React, { useState, useEffect } from "react";
import style from "./Feedback.module.css";
import service1 from "../../assets/img/service1.jpg";
import service2 from "../../assets/img/service2.jpg";
import arrow from "../../assets/img/left-arrow.png";

function Feedback() {
  return (
    <>
      <div className={style.wrapper}>
        <main className={style.mainContent}>
          <div className={style.Feedback_container}>
            <div className={style.Pet_infor}>
              <div className={style.arrow}>
                <img src={arrow} alt="Arrow" />
              </div>
              <div className={style.Service_img}>
                <img src={service2} alt="Avatar" />
              </div>
              <div className={style.pet_name}>
                <h1>PET'S NAME</h1>
              </div>
            </div>
            <div className={style.Feedback_content}>
              <div className={style.display}>
                <h1>CUSTOMER'S FEEDBACK</h1>
              </div>
              <div className={style.Customer_info}>
                <div className={style.Customer_name}>
                  <p>Name</p>
                </div>
                <div className={style.ava_img}>
                  <img src={service1} alt="Avatar" />
                </div>
              </div>
              <div className={style.Customer_feedback}>
                <p>
                  “Improvement Needed in Scheduling”: While the service was
                  great, the scheduling process was a bit confusing. It would be
                  helpful to have a more streamlined booking system online to
                  avoid waiting for responses.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Feedback;
