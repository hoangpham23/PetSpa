import HeaderForCus from "../../components/header/header-customer";
import style from "./ServiceInfor_style.module.css";
import "./ServiceInfo_script";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useService } from "./ServiceContext";
import service1 from "../../assets/img/service1.jpg";
// từ trang này nhấn vô phải xem xét số lượng thú của khác hàng, >=1, chuyển sang trang choose Pet, <=1 qua trang insert info cho pet
function ServiceInfo() {
  let { serviceName } = useParams();
  const { serviceData, setServiceData } = useService() || {}; // đầy đủ thông tin dữ liệu
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
  function getData() {}
  useEffect(() => {
    getData();
  }, []);
  // làm handle submit cho nút make appointment
  return (
    <>
      {" "}
      <Helmet>
        <link
          href="https://unpkg.com/css.gg@2.0.0/icons/css/quote.css"
          rel="stylesheet"
        />
      </Helmet>
      <HeaderForCus />
      <section>
        <div className={style.service_div}>
          <div className={style.service_display}>
            <div className={style.service_img}>
              <img src={service1} alt="" />
            </div>
            <div className={style.service_price}></div>
          </div>
          <div className={style.service_content}>
            <h1>INFORMATION</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              nesciunt voluptate ut praesentium fugiat quaerat, ab quam dolorum
              vitae odit expedita recusandae.
            </p>
          </div>
          <div className={style.book}>
            <input type="submit" value="BOOK" className="btn" />
          </div>
          <div className={style.service_display}>
            <div className={style.service_img}>
              <img src={service1} alt="" />
            </div>
            <div className={style.service_price}></div>
          </div>
          <div className={style.service_content}>
            <h1>INFORMATION</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              nesciunt voluptate ut praesentium fugiat quaerat, ab quam dolorum
              vitae odit expedita recusandae.
            </p>
          </div>
          <div className={style.book}>
            <input type="submit" value="BOOK" className={style.btn} />
          </div>
        </div>

        <div className={style.feedback_div}>
          <h1>OUR FEEDBACKS</h1>
          <div className={style.feedback_display}>
            <div className={style.service_container}>
              <div className={style.ava_img}>
                <img src={service1} alt="" />
              </div>
              <i class="gg-quote"></i>
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
              <i class="gg-quote"></i>
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
              <i class="gg-quote"></i>
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
