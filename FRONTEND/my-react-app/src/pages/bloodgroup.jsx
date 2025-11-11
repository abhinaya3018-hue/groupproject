import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import API from "../api"; // your axios instance
import "./bloodgroup.css";

export default function BloodGroupStats() {
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("donor_group_counts/")
      .then((res) => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blood group counts:", err);
        setError("Failed to load blood group data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-5 text-danger fw-semibold">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  return (
    <div id="available">
      <h3 className="text-center text-danger fw-bold">
        Blood Group Availability
      </h3>

      <div className="row g-5 col-7 justify-content-center" id="avai">
        {counts.map((item) => (
          <div className="col-md-3 col-sm-6" key={item.blood_group}>
            <Link to="/donors" className="text-decoration-none">
              <div className="card shadow-sm text-center blood-card">
                <div className="card-body">
                  <h4 className="text-danger fw-bold">{item.blood_group}</h4>
                  <p className="fs-5 mb-0">{item.count}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
