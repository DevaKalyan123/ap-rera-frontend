import "../styles/cards.css";

export default function Expertise() {
  return (
    <section className="expertise">
      <h2 className="expertise-section-title">OUR EXPERTISE</h2>
      <div className="expertise-title-line"></div>

      <p className="expertise-section-subtitle">
        APRERA strives to achieve its objectives by providing an integrated
        platform for real estate sector
      </p>

      <div className="expertise-grid">
        <div className="expertise-card">
          <div className="expertise-icon">👤</div>
          <h3>CONSULTATION</h3>
          <p>
            APRERA will guide the stakeholders of real estate activity to
            streamline the procedures required for construction of a new
            project with a view to encourage construction industry.
          </p>
        </div>

        <div className="expertise-card">
          <div className="expertise-icon">🤝</div>
          <h3>PROMOTION</h3>
          <p>
            APRERA will provide clarity on the roles and performance of various
            stakeholders / promoters and provide a level playing platform to
            differentiate between performers and non-performers.
          </p>
        </div>

        <div className="expertise-card">
          <div className="expertise-icon">🛡️</div>
          <h3>PROTECTION</h3>
          <p>
            APRERA will bring in increased accountability in real estate
            activity, thereby improving the sector's credibility score and
            re-instating a sense of security amongst all stakeholders.
          </p>
        </div>

        <div className="expertise-card">
          <div className="expertise-icon">💰</div>
          <h3>FINANCIAL DISCIPLINE</h3>
          <p>
            Ensuring financial discipline and strict monitoring of funds to
            protect the interests of allottees and promoters.
          </p>
        </div>

        <div className="expertise-card">
          <div className="expertise-icon">👍</div>
          <h3>QUALITY ASSURANCE</h3>
          <p>
            Ensuring quality construction and timely delivery of projects
            through regulatory compliance and monitoring.
          </p>
        </div>

        <div className="expertise-card">
          <div className="expertise-icon">🏢</div>
          <h3>DISPUTE REDRESSAL</h3>
          <p>
            Establishing fast-track dispute redressal mechanisms to resolve
            conflicts efficiently and transparently.
          </p>
        </div>
      </div>
    </section>
  );
}