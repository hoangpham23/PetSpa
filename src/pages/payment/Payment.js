import Footer from "../../components/footer/footer";
import HeaderForCus from "../../components/header/header-customer";
import Paypal from "../../assets/img/PayPal New 2023.svg";
import VNPay from "../../assets/img/vnpay-seeklogo.svg";
import "./Payment_style.css";
import Cart from "../choose-time/CartService/Cart";
import { useEffect, useState } from "react";
function Payment() {
  const [customerID, setCustomerID] = useState("");
  const [payment, setPayment] = useState({
    customerID: "",
    amount: "",
    paymentMethod: "",
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
    }));
  }, []);
  // làm hàm handle submit gửi dữ liệu về post "/payment"
  return (
    <>
      <HeaderForCus />
      <div className="wrapperPayment">
        <div className="payment-container">
          <div className="payment-options">
            <h2>Select Payment Method</h2>
            <label className="payment-option">
              <input type="radio" name="payment" value="paypal" />
              <img src={Paypal} alt="Paypal" />
            </label>
            <label className="payment-option">
              <input type="radio" name="payment" value="vnpay" />
              <img src={VNPay} alt="VNPay" />
            </label>
          </div>
          <div className="checkout-summary">
            {/* <h2>Checkout Summary</h2> */}
            <Cart /> {/* Replace with dynamic total if needed */}
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Payment;
