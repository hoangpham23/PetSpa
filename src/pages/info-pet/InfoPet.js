import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderForCus from "../../components/header/header-customer";
import style from "./InfoPet_style.module.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function InfoPet() {
  const [customerID, setCustomerID] = useState("");
  // make sure that having customerID
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("account"));
    if (customer) {
      setCustomerID(customer.customerID);
      setPetInfo({
        petName: "",
        weight: "",
        age: "",
        customerID: customer.customerID,
      });
    }
  }, []);

  const [petInfo, setPetInfo] = useState({
    petName: "",
    weight: "",
    age: "",
    customerID: customerID,
  });

  function handleInput(event) {
    setPetInfo({ ...petInfo, [event.target.name]: event.target.value });
  }
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (petInfo.petName === "" || petInfo.age === "" || petInfo.weight === "") {
      setMsg("Please fill in all fields. ");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8090/insert-pet-info",
        {
          petName: petInfo.petName,
          weight: petInfo.weight,
          age: petInfo.age,
          customerID: petInfo.customerID,
        }
      );
      console.log(petInfo);
      console.log(response.status);

      if (response.status === 201) {
        console.log("Sucessfully");
        setMsg("Sucessfully add pet");
        setTimeout(() => {
          navigate("/choose-pet");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response && error.response.status === 409) {
        setMsg("This pet is already exist ");
      }
    }
  }

  return (
    <div>
      <HeaderForCus></HeaderForCus>
      <section>
        <div className={style.welcome_div}>
          <div className={style.welcome_content}>
            <p>Insert Information for new pet!</p>
          </div>
          <div className={style.welcome_form}>
            <form action="#">
              <div className={style.input_box}>
                <p>Name of your pet:</p>{" "}
                <input
                  type="text"
                  placeholder="ENTER YOUR PET'S NAME HERE"
                  name="petName"
                  onChange={handleInput}
                />
              </div>
              <div className={style.input_box}>
                <p>Weight (kg):</p>{" "}
                <input
                  type="number"
                  placeholder="ENTER YOUR PET'S WEIGHT HERE"
                  name="weight"
                  onChange={handleInput}
                />
              </div>
              <div className={style.input_box}>
                <p>Age :</p>{" "}
                <input
                  type="number"
                  placeholder="ENTER YOUR PET'S WEIGHT HERE"
                  name="age"
                  onChange={handleInput}
                />
              </div>
              <div className={style.welcome_content}>{msg}</div>
              <div className={style.add}>
                <input
                  type="submit"
                  value="ADD"
                  className="btn"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfoPet;
