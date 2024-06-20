import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChooseService_style.module.css";
import { Helmet } from "react-helmet";
import service1 from "../../assets/img/service1.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { addDays, format } from "date-fns";
// import service2 from "../../assets/img/service2.jpg";
// import service3 from "../../assets/img/service3.jpg";

function ChooseService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const [displayService, setDisplayService] = useState({
    name: "",
    price: "",
    imageURL: "",
  });
  const today = new Date();
  // chỉ nhận lịch trong 3 ngày, tính từ thời điểm hiện tại
  const startDay = format(today, "yyyy-MM-dd");
  localStorage.setItem(
    "selectedDate",
    format(addDays(startDay, 1), "yyyy-MM-dd")
  );
  localStorage.setItem("appointmentTimes", []);
  localStorage.setItem("selectedTimes", []);
  // lưu các id dịch vụ đã chọn  selectedServices lên localStorage
  // useEffect(() => {
  //   services.map((service) => {
  //     setDisplayService([
  //       ...service,
  //       { name: service.serviceName, price: service.price },
  //     ]);
  //     return;
  // },[]);
  useEffect(() => {
    let idService = [];
    selectedServices.map((service) => {
      idService.push(service.serviceID);
    });
    localStorage.setItem("serviceIds", JSON.stringify(idService));
  }, [selectedServices]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await axios.get("http://localhost:8090/choose-service");
    setServices(response.data);
    console.log(response.data);
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const service = services.find((service) => service.serviceName === name);

    if (checked) {
      setSelectedServices([
        ...selectedServices,
        {
          serviceID: service.serviceID,
          name: service.serviceName,
          price: service.price,
          imageURL: service.imageURl,
        },
      ]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service.name !== name)
      );
    }
  }; // lưu vô localStorage
  function handleSubmit() {
    localStorage.setItem("cart", JSON.stringify(selectedServices));
    console.log(selectedServices);
    console.log("cart ne", localStorage.getItem("cart"));
    navigate("/choose-time");
  }
  useEffect(() => {
    if (services.length > 0) {
      setDisplayService({
        name: services?.at(0)?.serviceName,
        price: services?.at(0)?.price,
        imageURL: services?.at(0)?.imageURl,
      });
    }
  }, [services]);

  useEffect(() => {
    console.log(displayService);
  }, [displayService]);
  function handleDisplay(index) {
    const selectedService = services.at(index);
    setDisplayService({
      name: services.at(index).serviceName,
      price: services.at(index).price,
      imgURL: services.at(index).imageURl,
    });
  }

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
        <h1>CHOOSE SERVICES FOR YOUR PET </h1>
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
                <span
                  className={style.Service}
                  onClick={() => handleDisplay(index)}
                >
                  {service.serviceName}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className={style.service_display}>
          <div className={style.service_img}>
            <img src={displayService.imageURL} alt="Displayed Service" />
          </div>
          <div className={style.service_price}>{displayService.price}$</div>
        </div>
      </section>
      <div className={style.next}>
        <button type="submit" className={style.btn} onClick={handleSubmit}>
          NEXT STEP
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ChooseService;
