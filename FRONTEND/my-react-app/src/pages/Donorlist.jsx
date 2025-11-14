import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Select from "react-select"; // ✅ import react-select
import "./donordetail.css";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donors/")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setFilteredDonors(data);
      })
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  //  Combined filter logic
  useEffect(() => {
    let filtered = donors;

    if (selectedGroup !== "All") {
      filtered = filtered.filter((d) => d.blood_group === selectedGroup);
    }

    if (selectedCity !== "All") {
      filtered = filtered.filter(
        (d) => d.city && d.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    setFilteredDonors(filtered);
  }, [selectedGroup, selectedCity, donors]);

  const handleRequest = (donor) => {
    navigate(`/request/${donor.id}`, { state: { donor } });
  };

  // Extract unique cities dynamically
  const cities = [
    "All",
    ...new Set(donors.map((d) => d.city).filter((c) => c && c.trim() !== "")),
  ];

  // Convert cities to react-select options
  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

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

      {/*  Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="filter-container"
      >
        <div className="filter-item">
          <label className="filter-label1">Blood Group:</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
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
        </div>

        <div className="filter-item">
          <label className="filter-label">City:</label>
          <Select
            className="filter-select"
            options={cityOptions}
            defaultValue={cityOptions[0]}
            onChange={(option) => setSelectedCity(option.value)}
            isSearchable //  Enables search bar
            styles={{
              control: (base) => ({
                ...base,
                width: "200px",
                borderColor: "#d33",
                boxShadow: "none",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#f7d6d6" : "white",
                color: "#333",
              }),
            }}
          />
        </div>
      </motion.div>

      {/*  Donor Table */}
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
              <th>City</th>
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
                  <td>{donor.city}</td>
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
                <td colSpan="4" className="empty-row">
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
