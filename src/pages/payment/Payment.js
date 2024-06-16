import Footer from "../../components/footer/footer";
import HeaderForCus from "../../components/header/header-customer";
import Paypal from "../../assets/img/PayPal New 2023.svg";
import VNPay from "../../assets/img/vnpay-seeklogo.svg";
import "./Payment_style.css";
import Cart from "../choose-time/CartService/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [customerID, setCustomerID] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [payment, setPayment] = useState({
    customerID: "",
    amount: "",
    paymentMethod: "",
    petID: "",
  });
  useEffect(() => {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      const account = JSON.parse(accountData);
      setCustomerID(account.customerID);
    }
  }, []);
  useEffect(() => {
    setPayment((payment) => ({
      ...payment,
      amount: localStorage.getItem("depositAmount"),
      petID: localStorage.getItem("petID"),
    }));
  }, []);
  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    if (checked) {
      setPaymentMethod(name);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/payment", {
        customerID: customerID,
        amount: payment.amount,
        paymentMethod: paymentMethod,
        petID: payment.petID,
      });
      const url = response.data;
      const urlParams = new URLSearchParams(url);
      const status = urlParams.get("status");
      if (status === "successful") {
        navigate("/successfully-payment");
      } else if (status === "canceled") {
        setMsg("The payment has been canceled !!!");
      } else {
        setMsg("System error !!!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HeaderForCus />
      <div className="wrapperPayment">
        <div className="payment-container">
          <div className="payment-options">
            <h2>Select Payment Method</h2>
            <label className="payment-option">
              <input
                type="radio"
                name="PAYPAL"
                value="paypal"
                onClick={handleCheckboxChange}
              />
              <img src={Paypal} alt="Paypal" />
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="VN_PAY"
                value="vnpay"
                onClick={handleCheckboxChange}
              />
              <img src={VNPay} alt="VNPay" />
            </label>
          </div>
          <div className="checkout-summary">
            <Cart />
            <p className="msg">{msg}</p>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
