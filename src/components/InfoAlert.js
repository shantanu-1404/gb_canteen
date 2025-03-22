import React from "react";


const InfoAlert = ({ message, linkText, linkHref }) => {
  return (
    <div className="info-alert">
      <span className="info-icon "> <i class="bi bi-exclamation-circle"></i> </span>
      <span className="info-message">
        {message}{" "}
        <a href={linkHref} className="info-link">
          {linkText}
        </a>
      </span>
    </div>
  );
};

export default InfoAlert;
