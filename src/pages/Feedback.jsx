import "../styles/feedback.css";

export default function Feedback() {
  return (
    <section className="feedback-wrapper">

      {/* LEFT : REACH US */}
      <div className="feedback-reach-box">
        <div className="feedback-reach-inner">
          <h4>REACH US</h4>

          <h2>
            ANDHRA PRADESH <br />
            REAL ESTATE REGULATORY AUTHORITY
          </h2>

          <p>
            6th & 7th Floors, APCRDA Project Office, <br />
            Rayapudi, Tulluru Mandal, Amaravati, <br />
            Guntur District, Andhra Pradesh. <br />
            Pin - 522237.
          </p>

          <p className="feedback-helpdesk">
            Help Desk : <span>6304906011</span> <br />
            (All Working Days, 10AM - 6PM)
          </p>

          <p className="feedback-email">
            Write to : <span>helpdesk-rera[at]ap[dot]gov[dot]in</span>
          </p>
        </div>
      </div>

      {/* RIGHT : FEEDBACK */}
      <div className="feedback-box">
        <h2>FEEDBACK / SUGGESTION</h2>
        <div className="feedback-title-line"></div>

        <form className="feedback-form">
          <div className="feedback-form-row">
            <input type="text" placeholder="Name*" />
            <input type="text" placeholder="Mobile*" />
          </div>

          <div className="feedback-form-row">
            <select>
              <option>Select *</option>
              <option>Feedback</option>
              <option>Suggestion</option>
            </select>
            <input type="email" placeholder="Email ID" />
          </div>

          <textarea placeholder="Feedback* (Maximum of 1000 Character)"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

    </section>
  );
}