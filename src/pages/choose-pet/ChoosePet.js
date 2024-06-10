import axios from "axios";
import { useEffect, useState } from "react";

function ChoosePet() {
  // thiết kế thêm nút + trong trường hợp khách hàng muốn add thêm thú mưới
  // phần code sign in của back end gửi thêm number of pets
  // những trang choose pet, choose time,... về sau phải xác thực role customer
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
      <h1>this is choose pet page</h1>
    </div>
  );
}

export default ChoosePet;
