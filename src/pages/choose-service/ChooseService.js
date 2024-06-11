import axios from "axios";
import { useEffect, useState } from "react";

function ChooseService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [msg, setMsg] = useState("");

  async function getData() {
    try {
      const response = await axios.get(
        "http://localhost:8090/appointment/service"
      );
      console.log(response.data);
      if (response.status === 200) {
        setServices(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMsg("ERROR HAS BEEN OCCUR !!");
      }
    }
  }
  // lấy danh sách dữ liệu từ server
  useEffect(() => {
    getData();
  }, []);
  // làm hàm khi nhấn vào tên sẽ hiển thị thông tin cảu service, default là hình ảnh, descrip của dịch vụ đầu tiên
  //---------------------------- send data ---------------------------------------
  // hàm này cần check trạng thái của check box và vần có thuộc ticnsh name
  function handleCheckBoxChange(event) {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, name]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service.name !== name) // mỗi phần tử trong mảng là service
      );
    }
  }
  // chỉ lưu data vào localStorage chứ k gửi param đi
  function handleSubmit(event) {
    event.preventDefault();
    try {
      localStorage.setItem("selectedServices", selectedServices);
    } catch (error) {
      console.log("Erorr in ChooseService rfc");
    }
  }
  return <div></div>;
}

export default ChooseService;
