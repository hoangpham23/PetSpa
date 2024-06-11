import axios from "axios";
import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChoosePet_style.module.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function ChoosePet() {
  const [customerID, setCustomerID] = useState("");
  const [isCustomerIDSent, setIsCustomerIDSent] = useState(false);
  // chắc chắn phải có customerID
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("account"));
    if (customer) {
      setCustomerID(customer.customerID);
    }
  }, []);
  useEffect(() => {
    // Gọi handleData chỉ khi customerID đã được gửi đi
    if (customerID && !isCustomerIDSent) {
      handleData(customerID);
      setIsCustomerIDSent(true); // Cập nhật trạng thái đã gửi customerID
    }
  }, [customerID, isCustomerIDSent]);
  async function handleData() {
    const response = await axios.get("http://localhost:8090/choose-pet", {
      customerID: customerID,
    });
    if (response === 200) {
      // lưu thông tin mấy con pet ở đây
      // sau đó in ra
    }
  }
  return (
    <div>
      <HeaderForCus />
      <section>
        <div className={style.PetInfo_container}>
          <h1>CHOOSE PET FOR SERVICES</h1>
          <div className={style.PetInfo_box}>
            <p>PET 1</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
          <div className={style.PetInfo_box}>
            <p>PET 2</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
          <div className={style.PetInfo_box}>
            <p>PET 3</p>
            <p>NAME: </p>
            <p>WEIGHT (KG): </p>
          </div>
        </div>
        <input type="submit" value="ADD PET" className={style.btn} />
      </section>
    </div>
  );
}

export default ChoosePet;
