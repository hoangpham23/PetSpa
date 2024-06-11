import HeaderForCus from "../../components/header/header-customer";
import style from "./ServiceInfor_style.module.css";
import "./ServiceInfo_script";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useService } from "./ServiceContext";
import service1 from "../../assets/img/service1.jpg";
// từ trang này nhấn vô phải xem xét số lượng thú của khác hàng, >=1, chuyển sang trang choose Pet, <=1 qua trang insert info cho pet
function ServiceInfo() {
  let { serviceName } = useParams();
  const [numberOfPets, setNumberOfPets] = useState("");
  const navigate = useNavigate();
  //const { serviceData, setServiceData } = useService() || {}; // đầy đủ thông tin dữ liệu
  const [serviceData, setServiceData] = useState({
    imageId: "",
    serviceId: "",
    imageURL: "",
    serviceName: "",
    price: "",
    description: "",
    feedbackContent: [],
  });
  // async function getData() {
  //   try {
  //     console.log(serviceName);
  //     const response = await axios.get(
  //       `http://localhost:8090/home-page/${serviceName}`
  //     ); // lấy dữ liệu rồi nha
  //     const responseData = response.data;
  //     console.log(responseData);
  //     if (response.status === 200) {
  //       setServiceData(responseData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  //   {
  //     "imageId": 1,
  //     "serviceId": 1,
  //     "imageURL": "https://i.pinimg.com/originals/0d/b6/d3/0db6d3c3ec828193c359423533e02958.jpg",
  //     "serviceName": "Bath",
  //     "price": 500.0,
  //     "description": "Pet taking bath",
  //     "feedbackContent": []
  // }
  async function getData() {
    try {
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

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("numofPets", numberOfPets);
  }, [numberOfPets]);
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const account = JSON.parse(localStorage.getItem("account"));

    // Kiểm tra xem dữ liệu có tồn tại không
    if (account) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      console.log(account);

      // Lấy giá trị của numberOfPets từ đối tượng account
      const numberOfPets = account.numberOfPets;

      console.log("Number of pets:", numberOfPets);
      setNumberOfPets(numberOfPets);
    } else {
      console.log("Account data not found in localStorage");
    }
  }, []);
  // làm handle submit cho nút make appointment
  function handleSubmit() {
    if (numberOfPets > 0) {
      navigate("/choose-pet");
    } else {
      navigate("/info-pet");
    }
  }
  return (
    <>
      {" "}
      <Helmet>
        <link
          href="https://unpkg.com/css.gg@2.0.0/icons/css/quote.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/css.gg@2.0.0/icons/css/profile.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      <HeaderForCus />
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
          </div>
          <div className={style.book}>
            <input
              type="submit"
              value="Make Appointment"
              className={style.btn}
              onClick={handleSubmit}
            />
          </div>
        </div>

        <div className={style.feedback_div}>
          <h1>OUR FEEDBACKS</h1>

          <div className={style.feedback_display}>
            {serviceData.feedbackContent.map((service, index) => (
              <div key={index} className={style.service_container}>
                <div className={style.ava_img}>
                  {/* <img src={service1} alt="" /> */}
                </div>
                <i className="gg-quote"></i>
                <div className={style.feedback_content}>
                  <p>{service.feedback}</p>
                </div>
                <p>{service.customerName}</p>
              </div>
            ))}

            {/* <div className={style.service_container}>
              <div className={style.ava_img}>
                {/* <img src={service1} alt="" /> */}
            {/* <i className="gg-profile"></i>
              </div>
              <i className="gg-quote"></i>
              <div className={style.feedback_content}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
              <p>[Customer Name]</p>
            </div> */}
            <div className={style.service_container}>
              <div className={style.ava_img}>
                <img src={service1} alt="" />
              </div>
              <i className="gg-quote"></i>
              <div className={style.feedback_content}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
              <p>[Customer Name]</p>
            </div>
            <div className={style.service_container}>
              <div className={style.ava_img}>
                <img src={service1} alt="" />
              </div>
              <i className="gg-quote"></i>
              <div className={style.feedback_content}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
              <p>[Customer Name]</p>
            </div>
            <div className={style.service_container}>
              <div className={style.ava_img}>
                <img src={service1} alt="" />
              </div>
              <i className="gg-quote"></i>
              <div className={style.feedback_content}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
              <p>[Customer Name]</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceInfo;
