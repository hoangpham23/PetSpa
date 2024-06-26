import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import style from "./Service_style.module.css";
import { Pagination, Navigation } from "swiper/modules";

function Service() {
  const navigate = useNavigate();
  const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];

  function handleNavigate(item) {
    navigate(`/home-page/${item.serviceName}`);
  }

  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />

        {/* Swipper css */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </Helmet>

      <section className={style.service}>
        <div className={style.service_div}>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={style.mySwiper}
          >
            {dataArray.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={style.service_container}>
                  <div
                    className={style.service_img}
                    onClick={() => handleNavigate(item)}
                  >
                    <img src={item.imageURL} alt="" />
                  </div>
                  <div className={style.service_name}>{item.serviceName}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Service;
