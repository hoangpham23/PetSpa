import Footer from "../../components/footer/footer";
import HeaderForCus from "../../components/header/header-customer";
import Paypal from "../../assets/img/PayPal New 2023.svg";
import VNPay from "../../assets/img/vnpay-seeklogo.svg";
import "./Payment_style.css";
import Cart from "../choose-time/CartService/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderColor from "../../components/header/HeaderColor";

function Payment() {
  const [customerID, setCustomerID] = useState("");
  const [urlPaypal, setUrlPaypal] = useState("");
  const [urlVN_PAY, setUrlVN_PAY] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleSubmit();
  }, []);

  async function handleSubmit() {
    try {
      const response = await axios.post("http://localhost:8090/payment", {
        customerID: localStorage.getItem("customerID"),
        amount: localStorage.getItem("depositAmount"),
        petID: localStorage.getItem("petID"),
      });
      console.log(response.data);
      setResult(response.data); // setResult với dữ liệu thực
      setUrlPaypal(response.data.urlPaypal);
      setUrlVN_PAY(response.data.urlVNPAY);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("paypal", urlPaypal);
    console.log("vnpay", urlVN_PAY);
  }, [urlPaypal, urlVN_PAY]);
  function handlePaymentMethodChange(event) {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);

    if (selectedMethod === "paypal" && urlPaypal) {
      window.location.href = urlPaypal;
    } else if (selectedMethod === "vnpay" && urlVN_PAY) {
      window.location.href = urlVN_PAY;
    }
  }

  return (
    <>
      <HeaderColor />
      <div className="wrapperPayment">
        <div className="payment-container">
          <div className="payment-options">
            <h2>Select Payment Method</h2>
            <label className="payment-option">
              <input
                type="radio"
                name="Paypal"
                value="paypal"
                onChange={handlePaymentMethodChange}
                disabled={isLoading}
              />
              <img src={Paypal} alt="Paypal" />
            </label>
            {/* <label className="payment-option">
              <input
                type="radio"
                name="VNPAY"
                value="vnpay"
                onChange={handlePaymentMethodChange}
                disabled={isLoading}
              />
              <img src={VNPay} alt="VNPay" />
            </label> */}
          </div>
          <div className="checkout-summary">
            <Cart />
            <p className="msg">{msg}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
