import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DonorList() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donors/") // Django API endpoint
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1e293b" }}>
        Donor List
      </h2>

      <table
        style={{
          width: "50%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          justifySelf:"center",
        }}
      >
        <thead style={{ backgroundColor: "red", color: "white" }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Blood Group</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.length > 0 ? (
            donors.map((donor) => (
              <tr key={donor.id} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{donor.name}</td>
                <td style={{ ...tdStyle, color: "#e63946", fontWeight: "bold" }}>
                  {donor.blood_group}
                </td>
                <td style={tdStyle}>
                  <Link to={`/donor/${donor.id}`}>
                    <button
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "20px", color: "#64748b" }}>
                No donors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  fontSize: "14px",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "15px",
};
