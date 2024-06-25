import Footer from "../../components/footer/footer";
import HeaderForCus from "../../components/header/header-customer";
import styles from "./SuccessPay_style.module.css";
import HeaderColor from "../../components/header/HeaderColor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SuccessfullyPayment() {
  const navigate = useNavigate();
  useEffect(() => {
    const isPaid = localStorage.getItem("isPaid") || "";
    if (!isPaid) {
      navigate("/payment");
    }
  }, []);
  return (
    <>
      <div className={styles.wrapperPayment}>
        <HeaderColor />
        <main className={styles.mainContent}>
          <div className={styles.notification}>
            <h1>SUCCESSFULLY BOOKING</h1>
            <h3>[check your gmail, we have sent the bill]</h3>
            <a href="#">Click here to see history payment</a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SuccessfullyPayment;
