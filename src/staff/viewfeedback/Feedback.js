import React, { useState, useEffect } from "react";
import style from "./Feedback.module.css";
import service1 from "../../assets/img/service1.jpg";

function Feedback() {
  return (
    <>
      <div className={style.Feedback_container}>
        <div className={style.Pet_infor}></div>
        <div className={style.Feedback_content}>
          <div className={style.display}>
            <h1>CUSTOMER'S FEEDBACK</h1>
          </div>
          <div className={style.Customer_info}>
            <div className={style.Customer_name}>Name</div>
            <div className={style.ava_img}>
              <img src={service1} alt="Avatar" />
            </div>
          </div>
          <div className={style.Customer_feedback}>
            <p>
              “Improvement Needed in Scheduling”: While the service was great,
              the scheduling process was a bit confusing. It would be helpful to
              have a more streamlined booking system online to avoid waiting for
              responses.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
