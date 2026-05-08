import "../styles/GradingOfPromotors.css";

export default function GradingOfPromoters() {
  return (
    <div className="grading-wrapper">
      <div className="grading-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          You are here : <span>Home</span> / <span>Promotions</span> /{" "}
          <strong>Grading of Promoters</strong>
        </div>

        {/* Title */}
        <h2 className="page-title">Grading Of Promoters</h2>
        <div className="title-underline"></div>

        {/* Need */}
        <h3 className="section-title">Need</h3>
        <p>
          Real estate is a sector with wide range of variations based on regional
          and economic dynamics, which often confuses the consumers on what basis
          they have to prioritize and invest. On the other end Promoters /
          developers at times also will not be able to justify their quality of
          construction, genuinity of legal documents. There are no specific
          standardized benchmarks set to measure the various aspects of a real
          estate project and they decide its worth to invest. Real estate rating
          provides a state/city/region specific assessment of the quality of real
          estate projects. Based on defined criteria and benchmarks your real
          estate project against other projects in the state, city and down to
          specific locality, and thus helps buyers identify best projects in the
          region. This type of rating addresses two major needs in the real estate
          sector – enhanced transparency and specific benchmarking of projects.
        </p>

        {/* Advantages */}
        <h3 className="section-title">Advantages</h3>

        <h4 className="sub-title">To developers</h4>
        <ul>
          <li>
            Elevates the positive points of the project when compared to other
            projects in the same city and in a way strengthens corporate
            branding.
          </li>
          <li>
            Helps in incurring finance from banks and financial institutions by
            building credibility.
          </li>
          <li>
            Helps in knowing the potential pricing of the particular project.
          </li>
          <li>Building Trust among buyers.</li>
        </ul>

        <h4 className="sub-title">To buyers</h4>
        <ul>
          <li>
            Helps in decision making through comparison of various projects in a
            region.
          </li>
          <li>
            Get more details regarding the project in which the buyer is going to
            invest.
          </li>
          <li>Progressive information on the project.</li>
        </ul>

        {/* ================= APPROACH ================= */}
        <h3 className="section-title">Approach</h3>
        <div className="title-underline"></div>
        <p>
          APRERA will collect the information and documents submitted by promoters
          for registration of their project and analyze them based on the set
          parameters. The primary focus is to determine the quality of the
          particular real estate project. After analyzing the set parameters, a
          rating will be assigned and the project would be under surveillance
          throughout its tenure.
        </p>

        {/* ================= PARAMETERS ================= */}
        <h3 className="section-title">Parameters:</h3>
        <div className="title-underline"></div>

        {/* Promoter track record */}
        <h4 className="sub-title">Promoter track record</h4>
        <ul className="arrow-list">
          <li>Completed projects.</li>
          <li>Litigations.</li>
          <li>Financial stability.</li>
        </ul>

        {/* Project Construction Quality */}
        <h4 className="sub-title">Project Construction Quality</h4>
        <ul className="arrow-list">
          <li>Structural stability.</li>
          <li>Brands and quality of fittings and finishes.</li>
          <li>Maintenance (after sale).</li>
          <li>Building permit order.</li>
          <li>NOCs from authorities.</li>
        </ul>

        {/* Project Legal Quality */}
        <h4 className="sub-title">Project Legal Quality</h4>
        <ul className="arrow-list">
          <li>Encumbrances.</li>
          <li>Title deed to land and project.</li>
          <li>
            Agreement of sale, allotment letter & conveyance deed.
          </li>
          <li>Title search report.</li>
        </ul>

        {/* Project Financial Quality */}
        <h4 className="sub-title">Project Financial Quality</h4>
        <ul className="arrow-list">
          <li>Project estimate.</li>
          <li>Title deed to land and project.</li>
          <li>Source of funds.</li>
          <li>
            Financial agreements/mortgage with financial institutions and banks.
          </li>
        </ul>

        {/* Project Innovation Quality */}
        <h4 className="sub-title">Project Innovation Quality</h4>
        <ul className="arrow-list">
          <li>Project estimate.</li>
          <li>Building design.</li>
          <li>Construction technology.</li>
          <li>Amenities.</li>
        </ul>
      </div>
    </div>
  );
}