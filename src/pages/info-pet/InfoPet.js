import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderForCus from "../../components/header/header-customer";
import style from "./InfoPet_style.module.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import HeaderColor from "../../components/header/HeaderColor";
import UserAuth from "../../hooks/UserAuth";

function InfoPet() {
  UserAuth(["CUS"]);
  const [customerID, setCustomerID] = useState("");
  const [newNumofPets, setNewNumberOfPets] = useState("");
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
    setPetInfo((petInfo) => ({
      ...petInfo,
      age: parseInt(petInfo.age, 10),
      weight: parseInt(petInfo.weight, 10),
    }));
    const updatedAge = parseInt(petInfo.age, 10);
    const updatedWeight = parseInt(petInfo.weight, 10);
    if (petInfo.petName === "" || isNaN(updatedAge) || isNaN(updatedWeight)) {
      setMsg("Please fill in all fields. ");
      console.log(typeof petInfo.weight);
      console.log(typeof petInfo.age);
      return;
    }
    if (
      typeof updatedAge !== "number" ||
      !Number.isInteger(updatedAge) ||
      updatedAge < 0 ||
      typeof updatedWeight !== "number" ||
      !Number.isInteger(updatedWeight) ||
      updatedWeight < 0
    ) {
      setMsg("The age and weight of pet must be a number and greater than 0");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/insert-pet-info",
        {
          petName: petInfo.petName,
          weight: petInfo.weight,
          age: petInfo.age,
          customerID: petInfo.customerID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(petInfo);
      console.log(response.status);

      if (response.status === 201) {
        console.log("Sucessfully");
        setMsg("Sucessfully add pet");
        // set lại số lượng pet trong local
        const account = JSON.parse(localStorage.getItem("account"));
        account.numberOfPets = parseInt(account.numberOfPets) + 1;
        localStorage.setItem("account", JSON.stringify(account));
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
    <>
      <Helmet>
        <title>Information of pet</title>
      </Helmet>
      <div>
        <HeaderColor />
        <div className={style.wrapper}>
          <main className={style.mainContent}>
            <section>
              <div className={style.welcome_div}>
                <div className={style.welcome_form}>
                  <div className={style.welcome_content}>
                    <h1>Insert Information for new pet!</h1>
                  </div>
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
                        placeholder="ENTER YOUR PET'S AGE HERE"
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
          </main>
        </div>
      </div>
    </>
  );
}

export default InfoPet;
