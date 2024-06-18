import axios from "axios";
import { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import style from "./ChoosePet_style.module.css";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";

function ChoosePet() {
  const [customerID, setCustomerID] = useState("");
  const [isCustomerIDSent, setIsCustomerIDSent] = useState(false);
  const [petData, setPetData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  //localStorage.setItem("appointmentTimes",);
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
  function handleSubmit(petID) {
    localStorage.setItem("petID", petID);
    navigate("/appointment/service");
  }
  return (
    <>
      <HeaderForCus />
      <div className={style.wrapper}>
        <main className={style.mainContent}>
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
        <Footer />
      </div>
    </>
  );
}

export default ChoosePet;
