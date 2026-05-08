import "../styles/organogram.css";
import Organigram from "../../public/assets/images/Organisation_Structure.jpeg";

export default function Organogram() {
  return (
    <div className="org-page">

      {/* Breadcrumb */}
      <div className="org-breadcrumb">
        You are here : <span>Home</span> / <span>About Us</span> / <span>Organogram</span>
      </div>

      {/* Title */}
      <h2 className="org-title">Organization Structure</h2>
      <div className="org-title-line"></div>

      {/* Screenshot Image */}
      <div className="org-image-wrapper">
        <img
          src={Organigram}
          alt="APRERA Organization Structure"
        />
      </div>

    </div>
  );
}