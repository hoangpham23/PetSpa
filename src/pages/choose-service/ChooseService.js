import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChooseService_style.module.css";
import { Helmet } from "react-helmet";
import service1 from "../../assets/img/service1.jpg";
// import service2 from "../../assets/img/service2.jpg";
// import service3 from "../../assets/img/service3.jpg";

function ChooseService() {
  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <HeaderForCus />

      <div className={style.Ask}>
        <h1>DO YOU WANT TO ADD OTHER SERVICES?</h1>
      </div>

      <section className={style.service} id="service">
        <div className={style.service_checklist}>
          <div className={style.service_container}>
            <input
              type="checkbox"
              id="service1"
              name="service1"
              className={style.custom_checkbox}
            />
            <label htmlFor="service1" className={style.custom_label}>
              <span class={style.tickbox}></span>
              <span className={style.Service}>SERVICE 1</span>
            </label>
          </div>

          <div className={style.service_container}>
            <input
              type="checkbox"
              id="service2"
              name="service2"
              className={style.custom_checkbox}
            />
            <label htmlFor="service2" className={style.custom_label}>
              <span class={style.tickbox}></span>
              <span className={style.Service}>SERVICE 2</span>
            </label>
          </div>

          <div className={style.service_container}>
            <input
              type="checkbox"
              id="service3"
              name="service3"
              className={style.custom_checkbox}
            />
            <label htmlFor="service3" className={style.custom_label}>
              <span class={style.tickbox}></span>
              <span className={style.Service}>SERVICE 3</span>
            </label>
          </div>
        </div>
        <div className={style.service_display}>
          <div className={style.service_img}>
            <img src={service1} alt="Displayed Service" />
          </div>
          <div className={style.service_price}></div>
        </div>
      </section>
      <div className={style.next}>
        <button type="submit" className={style.btn}>
          NEXT STEP
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

export default ChooseService;
