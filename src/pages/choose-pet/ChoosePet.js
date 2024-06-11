import axios from "axios";
import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChoosePet_style.module.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function ChoosePet() {
  const [customerID, setCustomerID] = useState("");
  const [isCustomerIDSent, setIsCustomerIDSent] = useState(false);
  const [petData, setPetData] = useState([]);

  // useEffect(() => {
  //   console.log(petData);
  // }, [petData]);
  // chắc chắn phải có customerID
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
    console.log(customerID);
    const response = await axios.post("http://localhost:8090/choose-pet", {
      customerID: customerID,
    });
    console.log(response.status);
    console.log(customerID);
    if (response.status === 200) {
      setIsCustomerIDSent(true);
      console.log("data", response.data);
      setPetData(response.data);
      console.log(petData);
    }
  }
  return (
    <div>
      <HeaderForCus />
      <section>
        <div className={style.PetInfo_container}>
          <h1>CHOOSE PET FOR SERVICES</h1>
          {petData.map((pet, index) => (
            <div key={index} className={style.PetInfo_box}>
              <p>PET {index + 1}</p>
              <p>NAME: {pet.petName}</p>
              <p>WEIGHT (KG): {pet.weight}</p>
            </div>
          ))}
          {/* <div className={style.PetInfo_box}>
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
          </div> */}
        </div>

        <div className={style.add}>
          <input type="submit" value="ADD PET" className={style.btn} />
        </div>
      </section>
    </div>
  );
}

export default ChoosePet;
