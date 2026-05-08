import "../styles/cards.css";

export default function Learning() {
  return (
    <section className="learning">
      <h2 className="learning-section-title">LEARNING WITH US</h2>
      <div className="learning-title-line"></div>

      <p className="learning-section-subtitle">
        Technology intervention in Infrastructure
      </p>

      <div className="learning-grid">
        {/* CARD 1 */}
        <div className="learning-card">
          <div className="learning-img">
            <img
              src="https://rera.ap.gov.in/RERA/images/news2.jpg"
              alt="BIM"
            />
          </div>
          <h3>BUILDING INFORMATION MODELLING (BIM)</h3>
          <button>View All</button>
        </div>

        {/* CARD 2 */}
        <div className="learning-card">
          <div className="learning-img">
            <img
              src="https://rera.ap.gov.in/RERA/images/news1.jpg"
              alt="VR"
            />
          </div>
          <h3>VIRTUAL REALITY INNOVATION</h3>
          <button>View All</button>
        </div>

        {/* CARD 3 */}
        <div className="learning-card">
          <div className="learning-img">
            <img
              src="https://rera.ap.gov.in/RERA/images/news.jpg"
              alt="RTC"
            />
          </div>
          <h3>REAL TIME CONTEXT CAPTURE</h3>
          <button>View All</button>
        </div>
      </div>
    </section>
  );
}