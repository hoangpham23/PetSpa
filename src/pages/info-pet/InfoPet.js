import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InfoPet() {
  const [customerID, setCustomerID] = useState("");
  // make sure that having customerID
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("account"));
    if (customer) {
      setCustomerID(customer.customerID);
    }
  }, []);
  const [petInfo, setPetInfo] = useState({
    petName: "",
    weight: "",
    age: "",
    customerID: customerID,
  });
  console.log(customerID);

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
      const response = axios.post("http://localhost:8090/insert-pet-info", {
        petName: petInfo.petName,
        weight: petInfo.weight,
        age: petInfo.age,
        customerID: petInfo.customerID,
      });

      if (response.status === 200) {
        setMsg("Sucessfully add pet");
        setTimeout(() => {
          navigate("/choose-pet");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response && error.response.status === 409) {
        setMsg("Fail to add, please try again ! ");
      }
    }
  }

  return <div>
    
  </div>;
}

export default InfoPet;
