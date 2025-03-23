import React from "react";

const InfoTextWithLink = ({
  text = "Read our full",
  linkText = "Privacy Policy",
  linkUrl = "#",
}) => {
  return (
    <p className="info-text">
      {text}{" "}
      <a href={linkUrl} className="info-link" target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
      .
    </p>
  );
};

export default InfoTextWithLink;
