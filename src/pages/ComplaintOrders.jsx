import { useState } from "react";
import "../styles/ComplaintOrders.css";

/* PDF imports remain SAME */
import complaint2 from "../../public/assets/pdfs/Complaint No 2 of 2024.pdf";
import complaint3 from "../../public/assets/pdfs/Complaint No 3 of 2024.pdf";
import complaint12 from "../../public/assets/pdfs/Complaint No 12 of 2024.pdf";
import complaint36 from "../../public/assets/pdfs/Complaint No 36 of 2021.pdf";
import complaint38 from "../../public/assets/pdfs/Complaint No 38 of 2024.pdf";
import complaint90 from "../../public/assets/pdfs/Complaint No 90 of 2025.pdf";
import complaint176 from "../../public/assets/pdfs/Complaint No 176 of 2025.pdf";
import complaint242 from "../../public/assets/pdfs/Complaint No 242 of 2025.pdf";
import IAcomplaint36 from "../../public/assets/pdfs/I A No 10 of 2025 in Complaint No 36 of 2021.pdf";
import complaint201 from "../../public/assets/pdfs/Complaint No 201 of 2025.pdf";
import complaint20 from "../../public/assets/pdfs/Complaint No 20 of 2024.pdf";
import complaint106 from "../../public/assets/pdfs/Complaint No 106 of 2025.pdf";
import complaint115 from "../../public/assets/pdfs/Complaint No 115 of 2025.pdf";

/* complaintData SAME */
const complaintData = [
   { id: 1, no: "Complaint No 2 of 2024", date: "04-08-2025",file: complaint2 },
  { id: 2, no: "Complaint No 3 of 2024", date: "04-08-2025" ,file: complaint3},
  { id: 3, no: "Complaint No 12 of 2024", date: "04-08-2025",file: complaint12 },
  { id: 4, no: "Complaint No 36 of 2021", date: "06-11-2025" ,file: complaint36},
  { id: 5, no: "Complaint No 38 of 2024", date: "04-08-2025" ,file: complaint38},
  { id: 6, no: "Complaint No 90 of 2025", date: "12-12-2025",file: complaint90 },
  { id: 7, no: "Complaint No 176 of 2025", date: "11-12-2025",file: complaint176 },
  { id: 8, no: "Complaint No 242 of 2025", date: "28-11-2025",file: complaint242 },
  { id: 9, no: "I A No 10 of 2025 in Complaint No 36 of 2021", date: "06-11-2025",file: IAcomplaint36},
  { id: 10, no: "Complaint No 201 of 2025", date: "06-10-2025" ,file: complaint201 },
  { id: 11, no: "Complaint No 20 of 2024", date: "22-09-2025" ,file: complaint20},
  { id: 12, no: "Complaint No 106 of 2025", date: "01-09-2025" ,file: complaint106},
  { id: 13, no: "Complaint No 115 of 2025", date: "01-09-2025" ,file: complaint115},
{ id: 14, no: "Complaint No 19 of 2021", date: "04-08-2025", file: complaint115 },
{ id: 15, no: "Complaint No 37 of 2021", date: "25-08-2025", file: complaint115 },
{ id: 16, no: "Complaint No 117 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 17, no: "Complaint No 3 of 2023", date: "08-09-2025", file: complaint115 },
{ id: 18, no: "Complaint No 14 of 2024", date: "04-08-2025", file: complaint115 },
{ id: 19, no: "Complaint No 125 of 2025", date: "15-09-2025", file: complaint115 },
{ id: 20, no: "Complaint No 32 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 21, no: "Complaint No 33 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 22, no: "Complaint No 34 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 23, no: "Complaint No 35 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 24, no: "Complaint No 36 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 25, no: "Complaint No 37 of 2024", date: "04-08-2025", file: complaint115 },
{ id: 26, no: "Complaint No 37 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 27, no: "Complaint No 38 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 28, no: "Complaint No 89 of 2025", date: "25-08-2025", file: complaint115 },
{ id: 29, no: "Complaint No 127 of 2025", date: "25-08-2025", file: complaint115 },
{ id: 30, no: "Complaint No 132 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 31, no: "Complaint No 133 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 32, no: "Complaint No 8 of 2024", date: "25-08-2025", file: complaint115 },
{ id: 33, no: "Complaint No 18 of 2024", date: "08-09-2025", file: complaint115 },
{ id: 34, no: "Complaint No 1 of 2025", date: "04-08-2025", file: complaint115 },
{ id: 35, no: "Complaint No 41 of 2025", date: "21-07-2025", file: complaint115 },
{ id: 36, no: "Complaint No 41 of 2024", date: "04-08-2025", file: complaint115 },
{ id: 37, no: "Complaint No 77 of 2023", date: "07-07-2025", file: complaint115 },
{ id: 38, no: "Complaint No 88 of 2023", date: "07-07-2025", file: complaint115 },
{ id: 39, no: "Complaint No 89 of 2023", date: "07-07-2025", file: complaint115 },
{ id: 40, no: "Complaint No 131 of 2025", date: "07-07-2025", file: complaint115 },
{ id: 41, no: "Complaint No 13 of 2024", date: "30-06-2025", file: complaint115 },
{ id: 42, no: "Complaint No 13 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 43, no: "Complaint No 14 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 44, no: "Complaint No 12 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 45, no: "Complaint No 16 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 46, no: "Complaint No 17 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 47, no: "Complaint No 18 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 48, no: "Complaint No 20 of 2025", date: "30-06-2025", file: complaint115 },
{ id: 49, no: "Complaint No 22 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 50, no: "Complaint No 24 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 51, no: "Complaint No 25 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 52, no: "Complaint No 26 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 53, no: "Complaint No 27 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 54, no: "Complaint No 60 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 55, no: "Complaint No 62 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 56, no: "Complaint No 63 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 57, no: "Complaint No 66 of 2023", date: "30-06-2025", file: complaint115 },
{ id: 58, no: "Complaint No 66 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 59, no: "Complaint No 67 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 60, no: "Complaint No 68 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 61, no: "Complaint No 69 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 62, no: "Complaint No 70 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 63, no: "Complaint No 71 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 64, no: "Complaint No 72 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 65, no: "Complaint No 3 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 66, no: "Complaint No 4 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 67, no: "Complaint No 5 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 68, no: "Complaint No 6 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 69, no: "Complaint No 8 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 70, no: "Complaint No 9 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 71, no: "Complaint No 11 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 72, no: "Complaint No 15 of 2025", date: "14-07-2025", file: complaint115 },
{ id: 73, no: "Complaint No 82 of 2023", date: "14-07-2025", file: complaint115 },
{ id: 74, no: "Complaint No 127 of 2025", date: "30-06-2025", file: complaint115 },
{ id: 75, no: "Complaint No 47 of 2025", date: "23-06-2025", file: complaint115 },
{ id: 76, no: "Complaint No 86 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 77, no: "Complaint No 85 of 2023", date: "16-06-2025", file: complaint115 },
{ id: 78, no: "Complaint No 86 of 2023", date: "16-06-2025", file: complaint115 },
{ id: 79, no: "Complaint No 87 of 2023", date: "16-06-2025", file: complaint115 },
{ id: 80, no: "Complaint No 102 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 81, no: "Complaint No 105 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 82, no: "Complaint No 106 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 83, no: "Complaint No 107 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 84, no: "Complaint No 108 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 85, no: "Complaint No 109 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 86, no: "Complaint No 110 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 87, no: "Complaint No 119 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 88, no: "Complaint No 129 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 89, no: "Complaint No 131 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 90, no: "Complaint No 141 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 91, no: "Complaint No 16 of 2024", date: "16-06-2025", file: complaint115 },
{ id: 92, no: "Complaint No 17 of 2024", date: "16-06-2025", file: complaint115 },
{ id: 93, no: "Complaint No 19 of 2024", date: "16-06-2025", file: complaint115 },
{ id: 94, no: "Complaint No 21 of 2024", date: "16-06-2025", file: complaint115 },
{ id: 95, no: "Complaint No 22 of 2024", date: "16-06-2025", file: complaint115 },
{ id: 96, no: "Complaint No 47 of 2022", date: "23-06-2025", file: complaint115 },
{ id: 97, no: "Complaint No 82 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 98, no: "Complaint No 83 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 99, no: "Complaint No 83 of 2023", date: "16-06-2025", file: complaint115 },
{ id: 100, no: "Complaint No 84 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 101, no: "Complaint No 84 of 2023", date: "16-06-2025", file: complaint115 },
{ id: 102, no: "Complaint No 85 of 2022", date: "16-06-2025", file: complaint115 },
{ id: 103, no: "Complaint No 29 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 104, no: "Complaint No 35 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 105, no: "Complaint No 40 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 106, no: "Complaint No 56 of 2025", date: "12-05-2025", file: complaint115 },
{ id: 107, no: "Complaint No 79 of 2022", date: "12-05-2025", file: complaint115 },
{ id: 108, no: "EP 1 of 2023", date: "09-06-2025", file: complaint115 },
{ id: 109, no: "EP 2 of 2023", date: "09-06-2025", file: complaint115 },
{ id: 110, no: "Complaint No 97 of 2023", date: "09-06-2025", file: complaint115 },
{ id: 111, no: "Complaint No 44 of 2024", date: "24-03-2025", file: complaint115 },
{ id: 112, no: "Complaint No 82 of 2023", date: "12-05-2025", file: complaint115 },
{ id: 113, no: "Complaint No 30 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 114, no: "Complaint No 45 of 2024", date: "07-04-2025", file: complaint115 },
{ id: 115, no: "Complaint No 32 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 116, no: "Complaint No 31 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 117, no: "Complaint No 34 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 118, no: "Complaint No 33 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 119, no: "Complaint No 65 of 2023", date: "21-04-2025", file: complaint115 },
{ id: 120, no: "Complaint No 63 of 2023", date: "21-04-2025", file: complaint115 },
{ id: 121, no: "Complaint No 62 of 2023", date: "21-04-2025", file: complaint115 },
{ id: 122, no: "Complaint No 64 of 2023", date: "21-04-2025", file: complaint115 },
{ id: 123, no: "Complaint No 4 of 2024", date: "21-04-2025", file: complaint115 },
{ id: 124, no: "Complaint No 15 of 2024", date: "21-04-2025", file: complaint115 },
{ id: 125, no: "Complaint No 24 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 126, no: "Complaint No 23 of 2024", date: "05-05-2025", file: complaint115 },
{ id: 127, no: "Complaint No 28 of 2023", date: "05-05-2025", file: complaint115 },
{ id: 128, no: "Complaint No 26 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 129, no: "Complaint No 27 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 130, no: "Complaint No 25 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 131, no: "Complaint No 28 of 2024", date: "12-05-2025", file: complaint115 },
{ id: 132, no: "Complaint No 29 of 2025", date: "12-05-2025", file: complaint115 },
{ id: 133, no: "Complaint No 7 of 2024", date: "21-04-2025", file: complaint115 },
{ id: 134, no: "Complaint No 40 of 2025", date: "21-04-2025", file: complaint115 },
{ id: 135, no: "Complaint No 42 of 2024", date: "21-04-2025", file: complaint115 },
{ id: 136, no: "Complaint No 59 of 2023", date: "21-04-2025", file: complaint115 },
{ id: 137, no: "Complaint No 32 of 2025", date: "21-04-2025", file: complaint115 },
{ id: 138, no: "Complaint No 43 of 2023", date: "03-03-2025", file: complaint115 },
{ id: 139, no: "Complaint No 82 of 2023", date: "17-03-2025", file: complaint115 },
{ id: 140, no: "Complaint No 79 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 141, no: "Complaint No 92 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 142, no: "Complaint No 93 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 143, no: "Complaint No 94 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 144, no: "Complaint No 95 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 145, no: "Complaint No 98 of 2023", date: "24-03-2025", file: complaint115 },
{ id: 146, no: "Complaint No 160 of 2022", date: "24-03-2025", file: complaint115 },
{ id: 147, no: "Complaint No's 74,75,76 of 2023", date: "17-03-2025", file: complaint115 },
{ id: 148, no: "Complaint No 53 of 2022", date: "17-03-2025", file: complaint115 },
{ id: 149, no: "Complaint No 58 of 2023", date: "17-03-2025", file: complaint115 },
{ id: 150, no: "Complaint No 11 of 2024", date: "17-03-2025", file: complaint115 },
{ id: 151, no: "Complaint No 159 of 2022", date: "17-03-2025", file: complaint115 },
{ id: 152, no: "Complaint No 2 of 2023", date: "17-03-2025", file: complaint115 },
{ id: 153, no: "Complaint No 154 of 2022", date: "17-03-2025", file: complaint115 }

];

const ComplaintOrders = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = complaintData.filter((item) =>
    item.no.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entries;
  const pageData = filteredData.slice(startIndex, startIndex + entries);
  const totalPages = Math.ceil(filteredData.length / entries);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="complaint-container">
      {/* Breadcrumb */}
      <div className="complaint-breadcrumb">
        You are here : <span>Home</span> / <span>Notifications</span> /{" "}
        <b>Complaint Orders</b>
      </div>

      {/* Title */}
      <h2 className="complaint-title">Complaint Orders</h2>
      <div className="complaint-title-line"></div>

      {/* Controls */}
      <div className="complaint-controls">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>{" "}
          entries
        </div>

        <div>
          Search:{" "}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <table className="complaint-table-main">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Complaint No</th>
            <th>Date</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>

              <td>
                {item.no}
                {item.id <= 9 && (
                  <span className="complaint-new-badge">NEW</span>
                )}
              </td>

              <td>{item.date}</td>

              <td>
                {item.file ? (
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    title="Download"
                  >
                    ⬇️
                  </a>
                ) : (
                  <span className="complaint-no-file">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="complaint-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        <button
          className={currentPage === 1 ? "complaint-active" : ""}
          onClick={() => goToPage(1)}
        >
          1
        </button>

        <button
          className={currentPage === totalPages ? "complaint-active" : ""}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplaintOrders;