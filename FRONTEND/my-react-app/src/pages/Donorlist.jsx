import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./donordetail.css"; // ✅ External CSS
import { useNavigate } from "react-router-dom";


export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donors/")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setFilteredDonors(data);
      })
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  // 🩸 Filter logic
  const handleFilterChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);

    if (group === "All") {
      setFilteredDonors(donors);
    } else {
      setFilteredDonors(donors.filter((d) => d.blood_group === group));
    }
  };

  // 🩸 Request handler (you can customize this)
   const navigate = useNavigate();

const handleRequest = (donor) => {
  navigate(`/request/${donor.id}`, { state: { donor } });
};

 

  return (
    <div className="donor-container">
      <div className="back-wrapper">
        <Link to="/home" className="back-link">
          <i id="backbut2" className="fa-solid fa-angles-left"></i>
        </Link>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="donor-heading"
      >
        Donors
      </motion.h2>

      {/* 🩸 Filter Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="filter-container"
      >
        <label className="filter-label">Search by Blood Group:</label>
        <select
          value={selectedGroup}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="A+">A+</option>
          <option value="A-">A−</option>
          <option value="B+">B+</option>
          <option value="B-">B−</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB−</option>
          <option value="O+">O+</option>
          <option value="O-">O−</option>
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="table-wrapper"
      >
        <table className="donor-table">
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <motion.tr
                  key={donor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="table-row"
                >
                  <td>{donor.name}</td>
                  <td className="blood-group">{donor.blood_group}</td>
                  <td>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="request-btn"
                      onClick={() => handleRequest(donor)}
                    >
                      Request
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="empty-row">
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
