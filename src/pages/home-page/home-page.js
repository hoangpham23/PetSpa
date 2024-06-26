import React, { useEffect, useState } from "react";
import HeaderForCus from "../../components/header/header-customer";
import HeaderForGuest from "../../components/header/header-guest";
import Footer from "../../components/footer/footer";
import "./HomeGuest_style.css";
import { Helmet } from "react-helmet";
import Tittle from "./tittle";
import axios from "axios";
import Introduce from "./introduce";
import Service from "./service";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/pagination'; // Pagination module styles
import 'swiper/css/navigation'; // Navigation module styles
function HomePage() {
  const [items, setItems] = useState([]);
  const dataArray = [];
  let account = "";
  async function getData() {
    try {
      const accountData = localStorage.getItem("account");
      if (accountData) {
        account = JSON.parse(accountData);
      } else {
        // Xử lý trường hợp Local Storage không có dữ liệu "account"
        console.error("No account data found in Local Storage");
        account = {}; // hoặc giá trị mặc định khác phù hợp với ứng dụng của bạn
      }
      console.log(account.role);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8090/home-page", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data; // Lưu dữ liệu từ API vào biến tạm
      setItems(responseData); // Cập nhật state với dữ liệu từ API
      localStorage.setItem("dataArray", JSON.stringify(responseData)); // Lưu dữ liệu vào localStorage sau khi đã cập nhật items
      localStorage.setItem("customerID", account.customerID);
      localStorage.setItem("petID", "");
      localStorage.setItem("cart", "");
      localStorage.setItem("serviceIds", "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []); //

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      {localStorage.getItem("role") === "CUS" ? (
        <HeaderForCus />
      ) : (
        <HeaderForGuest />
      )}
      <Tittle />
      <Introduce />
      <Service />
      <Footer />
    </>
  );
}
export default HomePage;
