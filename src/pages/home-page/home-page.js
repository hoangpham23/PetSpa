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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination module styles
import "swiper/css/navigation"; // Navigation module styles
import Cookies from "js-cookie";
import FeedBack from "./FeedBack";

function decodeString(encodedString) {
  // Replace '+' with '%20' before decoding
  const formattedString = encodedString.replace(/\+/g, "%20");
  return decodeURIComponent(formattedString);
}

function HomePage() {
  const [openFeedBack, setOpenFeedBack] = React.useState(false);
  const handleOpenFeedBack = () => setOpenFeedBack(true);
  const handleCloseFeedBack = () => setOpenFeedBack(false);
  const [items, setItems] = useState([]);
  const dataArray = [];
  const [accountCookie, setAccount] = useState({
    customerID: "",
    customerName: "",
    email: "",
    password: "",
    role: "",
    numberOfPets: "",
    phoneNumber: "",
    token: "",
  });
  let account = "";
  async function getData() {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get("http://localhost:8090/home-page", {
        withCredentials: true,
      });

      const accountData = localStorage.getItem("account");
      if (accountData) {
        account = JSON.parse(accountData);
      } else {
        // Xử lý trường hợp Local Storage không có dữ liệu "account"
        console.error("No account data found in Local Storage");
        account = {}; // hoặc giá trị mặc định khác phù hợp với ứng dụng của bạn
        const combinedData = Cookies.get("customerData");
        if (combinedData) {
          console.log("just run here");
          const decodedData = decodeURIComponent(combinedData);
          const accountData = JSON.parse(decodedData);
          const account = JSON.parse(decodedData);
          account.customerName = decodeString(accountData.customerName);
          account.numberOfPets = parseInt(accountData.numberOfPets);
          localStorage.setItem("account", JSON.stringify(account));
          localStorage.setItem("token", account.token);
          localStorage.setItem("role", account.role);
        }
      }
      console.log(account.role);
      const token = localStorage.getItem("token");

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
    getFeedback();
  }, []); //
  async function getFeedback() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/feedback/check?customerID=${localStorage.getItem(
          "customerID"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        if (response.data === true) {
          handleOpenFeedBack();
        }
      }
    } catch (error) {}
  }
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
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
      <FeedBack open={openFeedBack} handleClose={handleCloseFeedBack} />
      <Tittle />
      <Introduce />
      <Service />
      <Footer />
    </>
  );
}
export default HomePage;
