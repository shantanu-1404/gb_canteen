import React from "react";


const ColorCard = ({ image, title, style }) => {
  return (
    <div className="color-card" style={style}>
      <img src={image} alt="Card Visual" className="card-image" />
      <p className="card-title">{title}</p>
    </div>
  );
};

export default ColorCard;
