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

function Payment() {
  const [customerID, setCustomerID] = useState("");
  const [urlPaypal, setUrlPaypal] = useState("");
  const [urlVN_PAY, setUrlVN_PAY] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState([]);

  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");

    if (status === "successful") {
      setMsg("SUCESSFULLY PAYMENT");
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
      const response = await axios.post("http://localhost:8090/payment", {
        customerID: localStorage.getItem("customerID"),
        serviceIds: JSON.parse(localStorage.getItem("serviceIds")),
        appointmentTimes: JSON.parse(localStorage.getItem("appointmentTimes")),
        petID: localStorage.getItem("petID"),
        depositAmount: localStorage.getItem("depositAmount"),
      });
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
          <HeaderColor />
          <div className="payment-container">
            <div className="payment-options">
              <h2>Select Payment Method</h2>
              <label className="payment-option">
                <input
                  type="radio"
                  name="Paypal"
                  value="paypal"
                  onClick={handleSubmit}
                  // disabled={isLoading}
                />
                <img src={Paypal} alt="Paypal" />
              </label>
            </div>
            <div className="checkout-summary">
              <Cart />
              <p className="msg">{msg}</p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Payment;