import Footer from "../../components/footer/footer";
import HeaderForCus from "../../components/header/header-customer";
import Paypal from "../../assets/img/PayPal New 2023.svg";
import VNPay from "../../assets/img/vnpay-seeklogo.svg";
import "./Payment_style.css";
import Cart from "../choose-time/CartService/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderColor from "../../components/header/HeaderColor";
import UserAuth from "../../hooks/UserAuth";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import stepperStyle from "./Stepper_style.module.css";

function Payment() {
  UserAuth(["CUS"]);
  const [customerID, setCustomerID] = useState("");
  const [urlPaypal, setUrlPaypal] = useState("");
  const [urlVN_PAY, setUrlVN_PAY] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState([]);
  const steps = ["", "", "", ""];
  const [activeStep, setActiveStep] = useState(3);

  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  const location = useLocation();
  localStorage.setItem("isPaid", false);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");

    if (status === "successful") {
      localStorage.setItem("isPaid", true);
      navigate("/successfully-payment");
      // Xử lý logic khi thanh toán thành công
    } else if (status === "failed") {
      setMsg("FAILD TO PAY");
      // Xử lý logic khi thanh toán thất bại
    } else if (status === "canceled") {
      setMsg("Payment has been canceled");
      // Xử lý logic khi hủy thanh toán
    } else {
      setMsg("");
      console.log("Trạng thái không hợp lệ");
      // Xử lý logic khi trạng thái không hợp lệ
    }
  }, [location.search]);

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/payment",
        {
          customerID: localStorage.getItem("customerID"),
          serviceIds: JSON.parse(localStorage.getItem("serviceIds")),
          appointmentTimes: JSON.parse(
            localStorage.getItem("appointmentTimes")
          ),
          petID: localStorage.getItem("petID"),
          depositAmount: localStorage.getItem("depositAmount"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setResult(response.data);
      setUrlPaypal(response.data.urlPaypal);
      window.location.href = response.data.urlPaypal;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="wrapperPayment">
        <main className="mainContent">
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
          <HeaderColor />
          <div className="payment-container">
            <div className="checkout-summary">
              <Cart />
              <div className="payment-option">
                <input
                  // type="radio"
                  name="Paypal"
                  //value="paypal"
                  onClick={handleSubmit}
                  // disabled={isLoading}
                />
                <img src={Paypal} alt="Paypal" onClick={handleSubmit} />
              </div>
              <p className="msg">{msg}</p>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Payment;
