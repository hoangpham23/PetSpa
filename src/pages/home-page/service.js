import "./HomeGuest_style.css";
function Service() {
  const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
  function showService() {
    console.log(dataArray + "service");
  }
  return (
    <div>
      <section className="service">
        <div className="service-btn">
          <input type="button" value="SHOW ALL" className="btn" />
        </div>
        <div className="service-display">
          {dataArray.map((item, index) => (
            <div className="service-container" key={index}>
              <div className="service-border"></div>
              <div className="service-img">
                <img src={item.imageURL} alt="" />
              </div>
              <div className="service_name">{item.serviceName}</div>
            </div>
          ))}
          {/* <div className="service-container">
            <div className="service-border"></div>
            <div className="service-img">
              <img src="./img/PetSpa.jpg" alt="" />
            </div>
          </div>

          <div className="service-container">
            <div className="service-border"></div>
            <div className="service-img">
              <img src="./img/PetSpa.jpg" alt="" />
            </div>
          </div>

          <div className="service-container">
            <div className="service-border"></div>
            <div className="service-img">
              <img src="./img/PetSpa.jpg" alt="" />
            </div>
          </div> */}
          {showService()}
        </div>
      </section>
    </div>
  );
}

export default Service;
