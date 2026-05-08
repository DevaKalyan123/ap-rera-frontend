import { useState } from "react";
import "../styles/vendordatabase.css";

const vendorData = [
  {
    sno: 1,
    category: "Manufacturers",
    company: "Ashirvad Pipes Pvt Ltd",
    address: "4 B, Attibele Industrial Area, Hosur Road, Bengaluru - 562107",
    contact:
      "Mr. Jayant Kumar – Head Projects, Mr. Narayana Swamy Project Coordinator",
    phone:
      "Ph No: 080-27820542 Ext-1807\nMobile No: 7760038938",
    email:
      "jayant.kumar@ashirvad.com,\nnarayana.swamy@ashirvad.com",
    products: "Manufacturing of CPVC & UPVC Pipes & Fittings",
  },
  {
    sno: 2,
    category: "Contractors",
    company: "Hindustan Constructions Co. Ltd",
    address:
      "Hincon House, 11th Floor, 247 Park, L.B Shastri Marg, Vikhroli (West) Mumbai - 400083",
    contact:
      "Mr. Santosh Rai – Business Line Head Transport\nMr. Parag Tokekar – Head of Sales\nMs. Olfin Vaz – Manager (Marketing)",
    phone:
      "912225751000,\n912225794771,\n022-25751384",
    email:
      "marketing.mumbai@hccindia.com,\nanil.malik@hccindia.com,\npradip.shah@hccindia.com",
    products:
      "Construction of river bridges, highway bridges & structures, industrial buildings, residential & commercial complexes, integrated projects for power generation",
  },

  {
    sno: 3,
    category: "Consultants",
    company: "JK Risk Managers & Insurance Brokers Ltd",
    address: "A-21, Sec - 5, Noida - 201301",
    contact: "Mr. Anurag Kaul\nPrincipal Office & Whole Time Director",
    phone:
      "Ph: 011-30179786\nFax: 011-23716607\nM: 9818553910",
    email:
      "jkinsurance@jkmail.com\nanuraag@jkmail.com",
    products:
      "Insurance Consultants functioning as 'Direct and Re-insurance' broker including Risk Management.",
  },
  {
    sno: 4,
    category: "Consultants",
    company: "Vikas Buildtech Private Limited",
    address:
      "2nd Floor, Shashi Building, Cinema Road, Gorakhpur - 273001",
    contact: "Er. Shashi Bhushan\nManaging Director",
    phone:
      "0551-6453837\nM: 7571008131\n7800638733",
    email:
      "vikasbuild64@rediffmail.com\nshushab9999@gmail.com",
    products: "GIS Survey and Civil engineering Consultancy",
  },
  {
    sno: 5,
    category: "Manufacturers",
    company: "Shri Ram Panels",
    address:
      "Village Shahpur Khanna Amlon Road Mandigobindgarh - 147301 (Dist. Fatehgarh Sahib) Punjab",
    contact:
      "Mr. Mahesh Gupta\nMr. Anil Sharma GM Marketing\nMr. Prabhakar",
    phone:
      "M: 805477930\nM: 9818495331\n91156 07306",
    email:
      "info@magnusinternational.in\nmagnusinternational@yahoo.com\nanilsharma@magnusinternational.in",
    products:
      "Manufacturer of film face Shuttering plywood, LVL and Runners, Scaffolding Planks, H-Beams, Flush Door, block Board, Fire Retardant Plywood etc",
  },
  {
    sno: 6,
    category: "Manufacturers",
    company: "Perma Construction AIDS Pvt Ltd",
    address:
      "Unit 1: C1-2301/2 & Unit 2: Plot no: 3102, GIDC, Sarigam, Gujarat - 396155",
    contact: "Mr. A. J Charles\nDirector",
    phone:
      "M: 9820040291\n022-25918911 / 25674690",
    email:
      "info@permaindia.com\nparmargurmeet@permaindia.com",
    products:
      "Water Proofing Compounds, Adhesives, Waterproof Coatings, Admixtures for Concrete, Structural Repair Products, Foundation Protection Treatments, Epoxy Coatings, Epoxy Bonding Agent etc.",
  },
  {
  sno: 7,
  category: "Manufacturers & Supplier",
  company: "TDT Copper Ltd",
  address:
    "Khasra No 258, Kuldeep House Lane No-3, Ground Floor, Westend Marg, Saidulajab, Near Saket Metro Station, New Delhi - 110030",
  contact: "Mr. Ritesh Ladha",
  phone: "M: 9910006450",
  email:
    "ashish@tdt.co.in\nranul@tdt.co.in\navinash@tdt.co.in\nrj@tdt.co.in",
  products:
    "Manufacturing and Supply of Continuous Cast Copper Rods (ETP Grade); Oxygen Free Copper Wire Rods and Copper Cast Bars of various sizes and shapes",
},
{
  sno: 8,
  category: "Manufacturers",
  company: "Trident Structures Pvt Ltd",
  address: "1-135, Kirti Nagar, New Delhi - 110015",
  contact:
    "Mr Pankaj Chhatwal – Managing Director\nMr. S S Soni – GM Commercial",
  phone:
    "M: 9910708107\nM: 9871178154\nPH: 0120-2569189\n2560188",
  email:
    "pankaj@tridentstructures.com\ns.soni@tridentstructures.com",
  products:
    "Manufacturing of all type of steel fabrication including telecommunication mobiles tower, cell on wheels, poles & Monopoles, Solar Mounting Structures, Transmission Towers & Sub Station Structures etc.",
},
{
  sno: 9,
  category: "Manufacturers & Supplier",
  company: "Zenith Birla (India) Limited",
  address:
    "Dalamal House, 1st Floor, J B Marg, Nariman Point, Mumbai - 400021, Maharashtra",
  contact: "Mr. Kumar Modak\nManager Marketing",
  phone:
    "8422956761\n022-66168400\n022-22047835",
  email: "kkmodak@zenithsteelpipes.com",
  products:
    "Manufacture and supply of ERW Black & Galvanised Steel Pipes",
},
{
  sno: 10,
  category: "Manufacturers & Supplier",
  company: "A C Humidin Air Systems",
  address:
    "B-6, Sector A-3, Tronica City, Loni, Ghaziabad, UP - 201102",
  contact: "Mr. Vaibhav Gupta\nDirector",
  phone:
    "M: 9650375541\n9654452926",
  email:
    "vaibhav@humidin.com\nse2del@humidin.com",
  products:
    "Manufacturing and Supply of Air Handling Units including all types of Ventilation Fans, Scrubbers, Roof Extractor, Dehumidifiers, Silencers, Filters, Air to Air Plate type Heat Exchangers, Evaporative Cooling System, Energy Recovery Ventilators, Treated Fresh Air units, Cooling Coils etc.",

},

];

export default function vendordatabase() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [category, setCategory] = useState("ALL");

  const filteredData = vendorData.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.products.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "ALL" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="vendor-container">
      {/* Breadcrumb */}
      <div className="vendor-breadcrumb">
        You are here : <span>Home</span> / <span>Promotions</span> /{" "}
        <strong>Vendor Database</strong>
      </div>

      {/* Title */}
      <h2 className="vendor-title">Vendor Database</h2>
      <div className="vendor-title-underline"></div>

      {/* Filters */}
      <div className="vendor-filter-row">
        <label>
          Category Type <span className="vendor-required">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="Manufacturers">Manufacturers</option>
          <option value="Contractors">Contractors</option>
        </select>
      </div>

      {/* Controls */}
      <div className="vendor-controls">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>{" "}
          entries
        </div>

        <div className="vendor-right-controls">
          <span className="vendor-icon vendor-excel">X</span>
          <span className="vendor-icon vendor-pdf">PDF</span>
          Search:
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Category</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Products / Services</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, entries).map((row) => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td>{row.category}</td>
              <td>{row.company}</td>
              <td>{row.address}</td>
              <td className="vendor-multiline">{row.contact}</td>
              <td className="vendor-multiline">{row.phone}</td>
              <td className="vendor-multiline">{row.email}</td>
              <td>{row.products}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}