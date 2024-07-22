import HeaderForCus from "../../components/header/header-customer";
import style from "./ServiceInfor_style.module.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import service1 from "../../assets/img/service1.jpg";
import HeaderForGuest from "../../components/header/header-guest";
import HeaderColor from "../../components/header/HeaderColor";

// từ trang này nhấn vô phải xem xét số lượng thú của khác hàng, >=1, chuyển sang trang choose Pet, <=1 qua trang insert info cho pet
function ServiceInfo() {
  let { serviceName } = useParams();
  const [numberOfPets, setNumberOfPets] = useState(0);
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    imageId: "",
    serviceId: "",
    imageURL: "",
    serviceName: "",
    price: "",
    description: "",
    feedbacks: [],
  });
  async function getData() {
    try {
      const token = sessionStorage.getItem("token");
      console.log(serviceName);
      const response = await axios.get(
        `http://localhost:8090/home-page/${serviceName}`
      );
      if (response.status === 200) {
        console.log(response.data);
        setServiceData(response.data);
      }
    } catch (error) {
      console.log("error happend ");
      console.log(error);
    }
  }
  let accountData = sessionStorage.getItem("account");
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Lấy dữ liệu từ sessionStorage

    if (accountData) {
      const account = JSON.parse(accountData);
      const numberOfPets = account.numberOfPets;
      console.log("Number of pets:", numberOfPets);
      setNumberOfPets(numberOfPets);
    } else {
      console.log("Account data not found in sessionStorage");
    }
  }, []);
  // làm handle submit cho nút make appointment
  // function handleSubmit() {
  //   console.log(numberOfPets, accountData);
  //   console.log(typeof numberOfPets);
  //   if (numberOfPets > 0 && accountData !== null) {
  //     console.log(true);
  //   }
  //   if (numberOfPets > 0 && accountData !== null) {
  //     navigate("/choose-pet");
  //   } else if (numberOfPets === 0 && accountData !== null) {
  //     navigate("/info-pet");
  //   } else {
  //     navigate("/sign-in");
  //   }
  // }
  function handleSubmit() {
    console.log("numberOfPets:", numberOfPets, "accountData:", accountData);

    const numPets = Number(numberOfPets);

    if (accountData !== null) {
      if (numPets > 0) {
        console.log("Navigating to /choose-pet");
        navigate("/choose-pet");
      } else {
        console.log("Navigating to /info-pet");
        navigate("/info-pet");
      }
    } else {
      console.log("Navigating to /sign-in");
      navigate("/sign-in");
    }
  }

  return (
    <>
      {" "}
      <Helmet>
        <title>Service information</title>
        <link
          href="https://unpkg.com/css.gg@2.0.0/icons/css/quote.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/css.gg@2.0.0/icons/css/profile.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      {sessionStorage.getItem("role") === "CUS" ? (
        <HeaderColor />
      ) : (
        <HeaderForGuest />
      )}
      <div className={style.wrapper}>
        <main className={style.mainContent}>
          <section>
            <div className={style.service_div}>
              <div className={style.service_display}>
                <div className={style.service_img}>
                  <img src={serviceData.imageURL} alt="" />
                </div>
                <div className={style.service_price}>{serviceData.price}$</div>
              </div>

              <div className={style.service_content}>
                <h1>INFORMATION</h1>

                <p>{serviceData.description}</p>
                <div className={style.book}>
                  <input
                    type="submit"
                    value="Make Appointment"
                    className={style.btn}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>

            <section className={style.feedback_div}>
              <h1>OUR FEEDBACKS</h1>

              <div className={style.feedback_display}>
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className={style.mySwiper}
                >
                  {serviceData.feedbacks.map((feedback, index) => (
                    <SwiperSlide key={index}>
                      <div className={style.service_container}>
                        <div className={style.ava_img}>
                          <img src={service1} alt="Avatar" />
                        </div>
                        <div className={style.quote}>
                          <i className="gg-quote"></i>
                        </div>
                        <div className={style.feedback_content}>
                          <p>{feedback.feedbackContent}</p>
                        </div>
                        <p>{feedback.customerName}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </section>
        </main>
      </div>
    </>
  );
}

export default ServiceInfo;
