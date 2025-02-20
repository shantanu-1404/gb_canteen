import React, { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are available


const Dropdown = ({
  buttonType = "", // 'import', 'export', 'add'
  label = "Dropdown",
  btnStyle = "",
  menuItems = [], // Array of menu items [{ label: "Item 1", onClick: () => {} }, ...]
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine icon class based on buttonType
  const getIconClass = () => {
    switch (buttonType) {
      case "import":
        return "bi bi-box-arrow-in-down-left"; // Import icon
      case "export":
        return "bi bi-box-arrow-up-right"; // Export icon
      case "add":
        return "bi bi-plus-lg"; // Add icon
      case "check":
        return "bi bi-check-lg";
      case "uncheck":
        return "bi bi-x";
      case "grow":
        return "bi bi-graph-up-arrow";
      default:
        return "bi bi-chevron-down"; // Default dropdown icon
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* Button for toggling dropdown */}
      <button type="button" className={`btn a-btn-primary ${btnStyle}`} onClick={toggleDropdown}>
        {buttonType === "add" && <i className={getIconClass()}></i>} {/* Icon on left for add */}
        {label}
        {buttonType !== "add" && <i className={getIconClass()}></i>} {/* Icon on right for import/export */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="ae-dropdown">
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => {
              setIsOpen(false);
              item.onClick();
            }}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
