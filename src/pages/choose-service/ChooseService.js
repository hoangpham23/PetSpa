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
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const response = await axios.get(
      "http://localhost:8090/appointment/service"
    );
    setServices(response.data);
    console.log(response.data);
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const service = services.find((service) => service.serviceName === name);

    if (checked) {
      setSelectedServices([
        ...selectedServices,
        { name: service.serviceName, price: service.price },
      ]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service !== name)
      );
    }
  }; // lưu vô localStorage
  function handleSubmit() {
    localStorage.setItem("cart", JSON.stringify(selectedServices));
    console.log(selectedServices);
    console.log("cart ne", localStorage.getItem("cart"));
  }
  function handleDisplay(serviceName) {}

  document.querySelectorAll(".service_img img").forEach((img) => {
    img.addEventListener("click", function () {
      const checkbox = this.closest(".service_container").querySelector(
        'input[type="checkbox"]'
      );
      checkbox.checked = !checkbox.checked;
    });
  });

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
          {services.map((service, index) => (
            <div className={style.service_container} key={index}>
              <input
                type="checkbox"
                id={`service${index}`}
                name={service.serviceName}
                className={style.custom_checkbox}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`service${index}`} className={style.custom_label}>
                <span className={style.tickbox}></span>
                <span className={style.Service}>{service.serviceName}</span>
              </label>
            </div>
          ))}
        </div>
        <div className={style.service_display}>
          <div className={style.service_img}>
            <img src={service1} alt="Displayed Service" />
          </div>
          <div className={style.service_price}></div>
        </div>
      </section>
      <div className={style.next}>
        <button type="submit" className={style.btn} onClick={handleSubmit}>
          NEXT STEP
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

export default ChooseService;
