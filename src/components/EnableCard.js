import React from "react";

const EnableCardWithSack = ({
  carrierName = "Shadowfax",
  carrierLogo,
  features = ["Feature 1", "Feature 2", "Feature 3"],
  termsLink = "#",
  buttonText = "Enable",
  bgColor = "#F9B233", // yellow-orange by default
}) => {
  return (
    <div className="enable-card-container">
      <div className="enable-card-content">
        {/* Card Header */}
        <div className="card-header">
          <h3 className="carrier-name">{carrierName}</h3>
          {carrierLogo && (
            <img src={carrierLogo} alt={carrierName} className="carrier-logo" />
          )}
        </div>
        {/* Features */}
        <ul className="carrier-features">
          {features.map((feature, index) => (
            <li key={index}>
              <span className="check-icon">✔</span> {feature}
            </li>
          ))}
        </ul>

        {/* Terms Link */}
        <a href={termsLink} className="terms-link">
          Terms & Conditions
        </a>
        <br />
        <br />
        {/* ✅ Enable Button Sack */}
        <div className="btn-sack-style">
          <div
            className="corner-cut"
            style={{ backgroundColor: bgColor }}
          ></div>
          <button className="enable-btn">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default EnableCardWithSack;
