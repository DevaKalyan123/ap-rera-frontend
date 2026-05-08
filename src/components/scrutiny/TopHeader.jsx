import { useState } from "react";
import logo from "../../assets/images/logo.jpg";

const TopHeader = ({ toggleSidebar, showHamburger = true }) => {

  const [showProfile, setShowProfile] = useState(false);

  const admin = {
    name: "Anil",
    email: "akannadevara@gmail.com",
    photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  };

  return (
    <div className="scrutiny-top-header">

      <div className="scrutiny-header-left">
        {showHamburger && (
  <button className="scrutiny-hamburger" onClick={toggleSidebar}>
    ☰
  </button>
)}

        <img src={logo} alt="AP RERA" className="scrutiny-header-logo" />

        <h2>ANDHRA PRADESH REAL ESTATE REGULATORY AUTHORITY</h2>
      </div>

      <div className="scrutiny-header-right">

        <select>
          <option>Select Language</option>
          <option>English</option>
          <option>Telugu</option>
        </select>

        {/* Profile Icon */}
        <div className="scrutiny-profile-wrapper">

          <img
            src={admin.photo}
            alt="profile"
            className="scrutiny-profile-img"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="scrutiny-profile-card">

              <div className="scrutiny-profile-top">
                <img
                  src={admin.photo}
                  alt="profile"
                  className="scrutiny-profile-large"
                />

                <h3>{admin.name}</h3>
                <p>{admin.email}</p>
              </div>

              <button className="scrutiny-logout-btn">
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default TopHeader;