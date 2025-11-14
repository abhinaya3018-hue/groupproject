import React, { useState } from "react";
import "./BloodFlowAnimation.css";

const compatibility = {
  "O+": ["O+", "A+", "B+", "AB+"],
  "A+": ["A+", "AB+"],
  "B+": ["B+", "AB+"],
  "AB+": ["AB+"]
};

const donors = ["AB+", "A+", "B+", "O+"];

export default function BloodFlowInteractive() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (group) => {
    setSelected(group);
  };

  const checkAllowed = (recipient) => {
    return selected && compatibility[selected].includes(recipient);
  };

  return (
    <div className="blood-panel">

      {/* Donor Column */}
      <div className="donor-col">
        {donors.map((g) => (
          <div
            key={g}
            className={`donor-bag 
              ${selected === g ? "bag-selected" : ""}
              ${selected && selected !== g ? "bag-faded" : ""}
            `}
            onClick={() => handleSelect(g)}
          >
            <span className="bag-label">{g}</span>
          </div>
        ))}
      </div>

      {/* Flow Paths */}
      <svg className="flow-area" viewBox="0 0 400 400">
        {donors.map((g, i) => (
          compatibility[g].map((target, j) => (
            <path
              key={`${g}-${target}`}
              className={`
                flow-path
                path-${g.replace("+","p")}-${target.replace("+","p")}
                ${selected === g ? "active-path" : ""}
              `}
              d={`M50 ${50 + i * 100} C 200 ${50 + i * 100}, 220 ${100 + j * 100}, 350 ${50 + j * 100}`}
            />
          ))
        ))}
      </svg>

      {/* Recipient Column */}
      <div className="recipient-col">
        {donors.map((g) => (
          <div
            key={g}
            className={`
              recipient-circle 
              ${selected && checkAllowed(g) ? "recipient-allowed" : ""}
              ${selected && !checkAllowed(g) ? "recipient-blocked" : ""}
            `}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}
