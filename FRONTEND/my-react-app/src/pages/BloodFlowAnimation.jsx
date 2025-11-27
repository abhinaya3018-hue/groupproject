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
       <a id="backbut10" href="/login">
      <i className="fa-solid fa-angles-left" id="base5"></i></a>
      <div className="donor-col">
        {donors.map((g) => (
          <div
            key={g}
            className={`donor-bag 
              ${selected === g ? "bag-selected" : ""} 
              ${selected && selected !== g ? "bag-faded" : ""}`}
            onClick={() => handleSelect(g)}
          >
            <span className="bag-label">{g}</span>
          </div>
        ))}
      </div>

      {/* Flow Paths */}
      <svg className="flow-area" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        {donors.map((g, i) =>
          compatibility[g].map((target) => {
            const targetIndex = donors.indexOf(target); 
            const startY = 50 + i * 100;
            const endY = 50 + targetIndex * 100;
            const controlY = (startY + endY) / 2; 

            const d = `M10 ${startY} C 200 ${startY}, 220 ${controlY}, 350 ${endY}`;

            const isActive = selected === g; 

            return (
              <path
                key={`${g}-${target}`}
                className={`
                  flow-path
                  path-${g.replace("+", "p")}-${target.replace("+", "p")}
                  ${isActive ? "active-path" : ""}
                `}
                d={d}
              />
            );
          })
        )}
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
