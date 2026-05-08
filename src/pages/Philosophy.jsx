import "../styles/cards.css";

export default function Philosophy() {
  return (
    <section className="philosophy-wrapper">
      <div className="philosophy-box">

        {/* LEFT */}
        <div className="philosophy-left">
          <h2>OUR PHILOSOPHY</h2>
          <div className="title-line"></div>

          <p>
            APRERA's philosophy is to have holistic approach towards promoting
            the interests of the consumers as well as builders and boost
            investments into real estate in an environment of trust and confidence.
          </p>

          <div className="philo-grid">
            <div className="philo-item">
              <div className="icon-box">👍</div>
              <div>
                <h4>Trust</h4>
                <p>
                  APRERA helps developers in building credibility and establishing
                  a relationship of trust with customers.
                </p>
              </div>
            </div>

            <div className="philo-item">
              <div className="icon-box">👁️</div>
              <div>
                <h4>Transparency</h4>
                <p>
                  APRERA ensures fair & equitable transactions between consumers
                  and promoters.
                </p>
              </div>
            </div>

            <div className="philo-item">
              <div className="icon-box">📊</div>
              <div>
                <h4>Control</h4>
                <p>
                  Ensures stricter control on management of funds and timely
                  delivery of projects.
                </p>
              </div>
            </div>

            <div className="philo-item">
              <div className="icon-box">👥</div>
              <div>
                <h4>Credibility</h4>
                <p>
                  APRERA facilitates consumers while boosting developer credibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="philosophy-right">
          <h2>MAGNIFYING TOWARDS...</h2>
          <div className="title-line"></div>

          <ul className="arrow-list">
            <li>Ensuring accountability towards allottees and protect their interest.</li>
            <li>Infusing transparency, ensure fair-play and reduce frauds & delays.</li>
            <li>Introducing professionalism and pan India standardization.</li>
            <li>Establishing symmetry of information between promoter and allottee.</li>
            <li>Imposing responsibilities on both promoter and allottees.</li>
            <li>Establishing regulatory oversight mechanism.</li>
            <li>Fast-track dispute resolution mechanism.</li>
            <li>Promoting good governance and investor confidence.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}