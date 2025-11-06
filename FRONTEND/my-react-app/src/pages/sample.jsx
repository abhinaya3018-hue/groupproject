import { useEffect, useState } from "react";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/donors/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch donors");
        }
        return res.json();
      })
      .then((data) => {
        setDonors(data);
        setLoading(false); // ✅ Stop loading when data arrives
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
        setLoading(false); // ✅ Stop loading even if there’s an error
      });
  }, []);

  if (loading) return <h3>Loading donors...</h3>;

  if (donors.length === 0)
    return <h3 style={{ textAlign: "center" }}>No donors found.</h3>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        padding: "20px",
        background: "#f7f9fc",
      }}
    >
      {donors.map((donor) => (
        <div
          key={donor.id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
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
            <div>
              <h2 style={{ margin: 0 }}>{donor.name}</h2>
              <p style={{ color: "#777" }}>Blood Group: {donor.blood_group}</p>
            </div>
          </div>
          <p>
            <strong>City:</strong> {donor.city}
          </p>
          <p>
            <strong>Contact:</strong> {donor.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
