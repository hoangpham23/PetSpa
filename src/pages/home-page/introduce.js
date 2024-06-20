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
            Welcome to Paws & Relax Pet Spa! We pamper your pets with luxurious
            massages, grooming, and nail care. Trust us to make your furry
            friends feel and look their best!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Introduce;
