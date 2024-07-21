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
import HeaderColor from "../../components/header/HeaderColor";
import UserAuth from "../../hooks/UserAuth";
// import service2 from "../../assets/img/service2.jpg";
// import service3 from "../../assets/img/service3.jpg";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import stepperStyle from "./Stepper_style.module.css";

function ChooseService() {
  UserAuth(["CUS"]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const [displayService, setDisplayService] = useState({
    name: "",
    price: "",
    imageURL: "",
  });
  const today = new Date();
  const steps = ["Choose Pet", "Choose Services", "Choose Time", "Payment"];
  const [activeStep, setActiveStep] = useState(1);
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
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8090/choose-service", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setServices(response.data);
    console.log(response.data);
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const service = services.find((service) => service.serviceName === name);
    setDisplayService({
      name: service.serviceName,
      price: service.price,
      imageURL: service.imageURl,
    });
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
    console.log("selecting", displayService);
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
        <title>Choose Service</title>
      </Helmet>
      <HeaderColor />
      <div className={style.wrapper}>
        <main className={style.mainContent}>
          <Box sx={{ width: "100%", mt: 8 }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ padding: "2rem", borderRadius: "10px" }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    classes={{
                      label: stepperStyle.stepLabel,
                      iconContainer: stepperStyle.stepIconContainer,
                    }}
                    style={{
                      transform: "scale(3)",
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <br /> <br /> <br />
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
                  <label
                    htmlFor={`service${index}`}
                    className={style.custom_label}
                  >
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
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default ChooseService;
