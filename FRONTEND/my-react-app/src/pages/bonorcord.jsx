import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  }}
>
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      fontWeight: "bold",
      color: "#555",
    }}
  >
    {donor.name?.[0]?.toUpperCase() || "?"}
  </div>
  <h2 style={{ textAlign: "center", color: "#1d4ed8", margin: 0 }}>
    {donor.name}
  </h2>
</div>

       

      <div style={{ marginTop: "20px", lineHeight: "1.8" }}>
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

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/home">
          <button
            style={{
              background: "#e63946",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to List
          </button>
        </Link>
      </div>
    </div>
  );
}
