import HeaderForCus from "../../components/header/header-customer";
import "./ServiceInfor_style.css";
import "./ServiceInfo_script";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function ServiceInfo() {
  let { serviceName } = useParams();
  async function getData() {
    try {
      console.log(serviceName);
      const response = await axios.get(
        `http://localhost:8090/home-page/${serviceName}`
      );
      const responseData = response.data; // Lưu dữ liệu từ API vào biến tạm

      localStorage.setItem("dataArray", JSON.stringify(responseData)); // Lưu dữ liệu vào localStorage sau khi đã cập nhật items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <HeaderForCus />
      <section className="sectionContainer">
        <div className="service-div">
          <div className="service-display">
            <div className="service-img">
              <img src="./img/Service1.jpg" alt="" />
            </div>
            <div className="service-price"></div>
          </div>
          <div className="service-content">
            <h1>INFORMATION</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              nesciunt voluptate ut praesentium fugiat quaerat, ab quam dolorum
              vitae odit expedita recusandae.
            </p>
          </div>

          <div className="book">
            <input type="submit" value="BOOK" className="btn" />
          </div>
        </div>
        <div className="feedback-div">
          <h1>OUR FEEDBACKS</h1>
          <div className="feedback-display">
            <div className="service-container">
              <div className="service-img">
                <img src="./img/Service1.jpg" alt="" />
              </div>
              <p>Service</p>
              <div className="feedback-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
            </div>
            <div className="service-container">
              <div className="service-img">
                <img src="./img/Service1.jpg" alt="" />
              </div>
              <p>Service</p>
              <div className="feedback-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, commodi quaerat optio quisquam tempora corporis
                  veniam facere, maiores fugiat minus animi architecto.
                </p>
              </div>
            </div>
            <div className="service-container">
              <div className="service-img">
                <img src="./img/Service1.jpg" alt="" />
              </div>
              <p>Service</p>
              {/* <!-- <div className="feedback-content">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, commodi quaerat optio quisquam tempora corporis veniam facere, maiores fugiat minus animi architecto.</p>
                    </div> --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceInfo;
