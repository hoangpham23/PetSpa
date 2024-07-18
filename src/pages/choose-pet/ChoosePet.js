// import axios from "axios";
// import { useEffect, useState } from "react";
// import HeaderForCus from "../../components/header/header-customer";
// import { Helmet } from "react-helmet";
// import { useNavigate, useParams } from "react-router-dom";
// import Footer from "../../components/footer/footer";
// import HeaderColor from "../../components/header/HeaderColor";
// import UserAuth from "../../hooks/UserAuth";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepConnector from "@mui/material/StepConnector";
// import stepperStyle from "./Stepper_style.module.css";
// import style from "./ChoosePet_style.module.css";

import axios from "axios";
import UserAuth from "../../hooks/UserAuth";
import HeaderColor from "../../components/header/HeaderColor";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import stepperStyle from "./Stepper_style.module.css";
import style from "./ChoosePet_style.module.css";

function ChoosePet() {
  const [customerID, setCustomerID] = useState("");
  const [isCustomerIDSent, setIsCustomerIDSent] = useState(false);
  const [petData, setPetData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const steps = ["Choose Pet", "Choose Services", "Choose Time","Payment"];
  const [activeStep, setActiveStep] = useState(0);

  UserAuth(["CUS"]);
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("account"));
    if (customer) {
      setCustomerID(customer.customerID);
      //setIsCustomerIDSent(true);
    }
  }, []);
  useEffect(() => {
    // Gọi handleData chỉ khi customerID đã được gửi đi
    if (customerID && !isCustomerIDSent) {
      handleData();
      // Cập nhật trạng thái đã gửi customerID
    }
  }, [customerID]);
  async function handleData() {
    const token = localStorage.getItem("token");
    console.log(customerID);
    const response = await axios.post(
      "http://localhost:8090/choose-pet",
      {
        customerID: customerID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.status);
    console.log(customerID);
    if (response.status === 200) {
      setIsCustomerIDSent(true);
      console.log("data", response.data);
      setPetData(response.data);
      console.log(petData);
    }
  }
  function handleSubmit(petID) {
    localStorage.setItem("petID", petID);
    navigate("/appointment/service");
  }
  return (
    <>
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
          <div
            className={style.PetInfo_container}
            onClick={() => {
              navigate("/appointment/service");
            }}
          >
            <h1>CHOOSE PET FOR SERVICES</h1>
            {petData.map((pet, index) => (
              <div
                key={index}
                className={style.PetInfo_box}
                onClick={() => handleSubmit(pet.id)}
              >
                <p>PET {index + 1}</p>
                <p>NAME: {pet.petName}</p>
                <p>WEIGHT (KG): {pet.weight}</p>
              </div>
            ))}
          </div>

          <div className={style.add}>
            <input
              type="submit"
              value="ADD PET"
              className={style.btn}
              onClick={() => {
                navigate("/info-pet");
              }}
            />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default ChoosePet;
