import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are available

const Button = ({
  buttonType = "", // 'import', 'export', 'add' ,'edit'
  label = "Button",
  onClick,
  style = {}, // Pass the inline style here
  type = "button", // 'button' or 'submit'
}) => {
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
        return "bi bi-check-lg"; // Check icon
      case "uncheck":
        return "bi bi-x"; // Uncheck icon
      case "grow":
        return "bi bi-graph-up-arrow"; // Grow icon
      case "edit":
        return "bi bi-pencil-square"; // Edit icon
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      className={`btn a-btn-primary ${buttonType}`}
      onClick={onClick}
      style={style} // Apply the passed inline style
    >
      {buttonType === "add" && <i className={getIconClass()}></i>} {/* Icon on left for add */}
      {label}
      {buttonType !== "add" && <i className={getIconClass()}></i>} {/* Icon on right for other types */}
    </button>
  );
};

export default Button;
