import React, { useState } from "react";
import "./BloodFlowAnimation.css";

const compatibility = {
  "O+": ["O+", "A+", "B+", "AB+"],
  "A+": ["A+", "AB+"],
  "B+": ["B+", "AB+"],
  "AB+": ["AB+"],
};

const donors = ["AB+", "A+", "B+", "O+"];

export default function BloodFlowInteractive() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="blood-panel">
      <a id="backbut10" href="/homehero">
        <i className="fa-solid fa-angles-left"></i>
      </a>

      {/* Donors */}
      <div className="donor-col">
        {donors.map((g) => (
          <div
            key={g}
            className={`donor-bag 
              ${selected === g ? "bag-selected" : ""}
              ${selected && selected !== g ? "bag-faded" : ""}
            `}
            onClick={() => setSelected(g)}
          >
            <span className="bag-label">{g}</span>
          </div>
        ))}
      </div>

      {/* SVG Flow */}
    <svg
  className="flow-area mobile-flow"
  viewBox="0 0 400 400"
  preserveAspectRatio="xMidYMid meet"
>

  {donors.map((g, i) =>
    compatibility[g].map((target) => {
      const tIndex = donors.indexOf(target);
      const gap = window.innerWidth <= 426 ? 70 : 100;

      const startY = 50 + i * gap;
      const endY = 50 + tIndex * gap;

      return (
        <g key={`${g}-${target}`}>
          <path
            d={`M10 ${startY} 
                C 180 ${startY}, 
                  220 ${(startY + endY) / 2}, 
                  350 ${endY}`}
            className={`flow-path ${selected === g ? "active-path" : ""}`}
            pathLength="1"
          />

          {selected === g && (
            <circle r="6" fill="#ff1c1c">
              <animateMotion
                dur="2s"
                fill="freeze"
                path={`M10 ${startY} 
                       C 180 ${startY}, 
                         220 ${(startY + endY) / 2}, 
                         350 ${endY}`}
              />
            </circle>
          )}
        </g>
      );
    })
  )}
</svg>


      {/* Recipients */}
      <div className="recipient-col">
        {donors.map((g) => (
          <div
            key={g}
            className={`recipient-circle
              ${selected && compatibility[selected].includes(g) ? "recipient-allowed" : ""}
              ${selected && !compatibility[selected].includes(g) ? "recipient-blocked" : ""}
            `}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}


