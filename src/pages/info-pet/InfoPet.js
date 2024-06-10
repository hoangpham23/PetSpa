import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InfoPet() {
  const [petInfo, setPetInfo] = useState({
    petName: "",
    weight: "",
    age: "",
    customerID: localStorage.getItem("account").customerID,
  });
  function handleInput(event) {
    setPetInfo({ ...petInfo, [event.target.name]: event.target.value });
  }
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  // chưa gửi dữ liệu đi
  // customerID lưu trong localStorage
  async function handleSubmit(event) {
    event.preventDefault();
    if (petInfo.petName === "" || petInfo.age === "" || petInfo.weight === "") {
      setMsg("Please fill in all fields. ");
      return;
    }
    try {
      const response = axios.post("http://localhost:8090/insert-pet-info");
      if (response.status === 200) {
        setMsg("Sucessfully add pet");
        setTimeout(() => {
          navigate("/choose-pet");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response && error.response.status === 409) {
        setMsg("Fail to add");
      }
    }
  }

  return <div></div>;
}

export default InfoPet;
