import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ install: npm i framer-motion

export default function DonorList() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donors/")
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/home" style={styles.backLink}>
          <i className="fa-solid fa-angles-left"></i> Back
        </Link>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.heading}
      >
        Donors
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={styles.tableWrapper}
      >
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Blood Group</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <motion.tr
                  key={donor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, backgroundColor: "#fef2f2" }}
                  style={styles.tr}
                >
                  <td style={styles.td}>{donor.name}</td>
                  <td style={{ ...styles.td, color: "#dc2626", fontWeight: 600 }}>
                    {donor.blood_group}
                  </td>
                  <td style={styles.td}>
                    <Link to={`/donor/${donor.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.viewButton}
                      >
                        View
                      </motion.button>
                    </Link>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.emptyRow}>
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    marginTop:"5%",
  },
  backLink: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: 500,
    fontSize: "16px",
    transition: "0.3s",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "30px",
  },
  tableWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    width: "70%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  tableHeader: {
    backgroundColor: "#dc2626",
    color: "#fff",
    textAlign: "center",
  },
  th: {
    padding: "14px",
    fontSize: "15px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  tr: {
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  td: {
    padding: "12px",
    fontSize: "15px",
    borderBottom: "1px solid #e2e8f0",
    color: "#475569",
  },
  viewButton: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },
  emptyRow: {
    padding: "20px",
    textAlign: "center",
    color: "#64748b",
  },
};
