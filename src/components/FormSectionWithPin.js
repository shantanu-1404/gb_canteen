import React, { useEffect, useState, useRef } from "react";

const pinColors = ["#007aff", "#11AF22", "#ED231C", "#1e293b", "#6366f1", "#FF870F"];

const FormSectionWithPin = ({ children }) => {
  const [pinColor, setPinColor] = useState("");
  const [isRightSide, setIsRightSide] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setPinColor(getRandomColor());
    checkColumnPosition();
  }, []);

  // Function to get random color
  const getRandomColor = (excludeColor = null) => {
    let availableColors = pinColors.filter((color) => color !== excludeColor);
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Function to check if the form section is in the right column
  const checkColumnPosition = () => {
    if (sectionRef.current) {
      const parentColumn = sectionRef.current.closest(".col-md-5"); // Check if inside right column
      setIsRightSide(parentColumn !== null);
    }
  };

  const pinSvg = `
    <svg class="section-pin" width="65" height="19" viewBox="0 0 65 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="${isRightSide ? "0" : "10"}" y1="9.5" x2="65" y2="9.5" stroke="${pinColor}" stroke-dasharray="3 3"/>
      <circle cx="${isRightSide ? "55.5" : "9.5"}" cy="9.5" r="8" fill="white" stroke="${pinColor}" stroke-width="3"/>
    </svg>`;

  return (
    <div ref={sectionRef} className="form-section">
      {/* Pin Wrapper with Dynamic Position */}
      <div className={`pin-container ${isRightSide ? "pin-right" : "pin-left"}`}
           dangerouslySetInnerHTML={{ __html: pinSvg }}>
      </div>

      {/* Form Section Content */}
      {children}
    </div>
  );
};

export default FormSectionWithPin;
