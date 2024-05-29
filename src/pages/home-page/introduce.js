import "./HomeGuest_style.css";
import petSpa from "../../assets/img/PetSpa.jpg";
function Introduce() {
  return (
    <div>
      <section className="introduce">
        <div className="introduce-img">
          <div className="img-border"></div>
          <div className="img-container">
            <img src={petSpa} alt="" />
          </div>
        </div>
        <div className="introduce-content">
          <div className="content-container"></div>
          <p>
            We’re passionate about Pet Groomers, Pet-Grooming Business, and
            supporting Dog Grooming Businesses to grow.{" "}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Introduce;
