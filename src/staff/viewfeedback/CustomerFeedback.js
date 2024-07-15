import React, { useState, useEffect } from "react";
import style from "./Feedback.module.css";
import service1 from "../../assets/img/service1.jpg";
import arrow from "../../assets/img/left-arrow.png";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';


function CustomerFeedback() {
  const [feedback, setFeedback] = useState({});
  const { appointmentID } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/timetable`);
  };

  useEffect(() => {
    (async () => {
      const response = await axios;
      const feedback = {
        customerName: "",
        dogName: "",
        feedback: "",
        appointmentTime: "",
        imgURL: "",
      };
      setFeedback(feedback);
    })();
  }, []);
  return (
    <>
      <div className={style.wrapper}>
        <main className={style.mainContent}>
          <div className={style.Feedback_container}>
            <div className={style.Pet_infor}>
              <div className={style.arrow}>
                <img src={arrow} alt="Arrow" onClick={handleBackClick}/>
              </div>
              <div className={style.Service_img}>
                <img src={feedback.imgURL} alt="Avatar" />
              </div>
              <div className={style.pet_name}>
                <h1>{feedback.dogName}</h1>
              </div>
            </div>
            <div className={style.Feedback_content}>
              <div className={style.time}>
                <p>{feedback.appointmentTime}</p>
              </div>
              <div className={style.display}>
                <h1>CUSTOMER'S FEEDBACK</h1>
              </div>
              <div className={style.Customer_info}>
                <div className={style.Customer_name}>
                  <p>{feedback.customerName}</p>
                </div>
                <div className={style.ava_img}>
                  <img src={service1} alt="Avatar" />
                </div>
              </div>
              <div className={style.Customer_feedback}>
                <p>{feedback.feedback}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CustomerFeedback;
