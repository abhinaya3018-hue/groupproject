import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./donordetail.css"; // import the CSS file

export default function DonorDetail() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/donors/${id}/`)
      .then((res) => res.json())
      .then((data) => setDonor(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!donor) return <h3>Loading...</h3>;

  return (
    <>
    <div className="donor-container">
      <div className="donor-header">
        <div className="donor-avatar">
          {donor.name?.[0]?.toUpperCase() || "?"}
        </div>
        <h2 className="donor-name">{donor.name}</h2>
      </div>

      <div className="donor-details">
        <p>
          <strong>Blood Group:</strong> {donor.blood_group}
        </p>
        <p>
          <strong>City:</strong> {donor.city}
        </p>
        <p>
          <strong>Phone:</strong> {donor.phone}
        </p>
        <p>
          <strong>Email:</strong> {donor.email}
        </p>
      </div>

      <div className="donor-footer">
        <Link to="/donors">
          <button className="back-button">Back to List</button>
        </Link>
      </div>
    </div>

    </>
  );
}
