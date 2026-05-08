import "../styles/cards.css";

export default function Services() {
  return (
    <section className="services">
      
      <div className="service-card">
        <img
          src="../../public/assets/images/imag1.png"
          alt="Project Registration"
          className="service-icon"
        />
        <h3>Project Registration</h3>
      </div>

      <div className="service-card">
        <img
          src="../../public/assets/images/img2.png"
          alt="Agent Registration"
          className="service-icon"
        />
        <h3>Agent Registration</h3>
      </div>

      <div className="service-card">
        <img
          src="../../public/assets/images/img3.png"
          alt="Complaint Registration"
          className="service-icon"
        />
        <h3>Complaint Registration</h3>
      </div>

      <div className="service-card">
        <img
          src="../../public/assets/images/img4.png"
          alt="Guidelines for Registration"
          className="service-icon"
        />
        <h3>Guidelines for Registration</h3>
      </div>

      <div className="service-card">
        <img
          src="../../public/assets/images/img5.png"
          alt="Frequently Asked Questions"
          className="service-icon"
        />
        <h3>Frequently Asked Questions</h3>
      </div>

    </section>
  );
}