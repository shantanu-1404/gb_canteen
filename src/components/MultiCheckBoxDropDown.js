import React, { useState } from "react";
const MultiCheckboxDropdown = ({
  label,
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };
  return (
    <div className="multi-checkbox-dropdown">
      <div
        className="dropdown-header d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <span
          className={`dropdown-icon bi ${
            isOpen ? "bi-chevron-up" : "bi-chevron-down"
          }`}
          style={{ marginLeft: "8px" }}
        ></span>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <label
              key={option}
              className="dropdown-option d-flex align-items-center"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <span style={{ marginLeft: "8px" }}>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiCheckboxDropdown;
