import React from "react";

const ManageCard = ({ 
  data, 
  titleKey = "col2", 
  imageKey = "col1", // Now handles text if not an image
  descriptionKey = "col3",
  descriptionLabelKey = "Details", // ✅ Default label if not provided
  buttonAction = null,
  onClick // ✅ Make sure `onClick` works
}) => {
  if (!data || typeof data !== "object") {
    console.error("❌ Invalid data:", data);
    return <p>Error: Invalid data</p>;
  }

  const title = data[titleKey] || "Untitled";
  const imageOrText = data[imageKey] || ""; // ✅ Holds either image URL or text
  const description = data[descriptionKey] || "No description available";

  return (
    <div className="col-md-6 col-lg-4">
      <div className="section_card flex-column p-3">
      <div 
        onClick={() => {
          console.log(`🖱️ Clicked on ManageCard: ${title}`); // ✅ Log Click
          if (onClick) onClick(); // ✅ Ensure `onClick` is called
        }}
        style={{ cursor: "pointer" }} // ✅ Make sure it's clickable
      >
        
        {/* ✅ Conditionally Render Image or Text */}
        <div className="mb-3 d-flex justify-content-center">
          {imageOrText.startsWith("http") ? ( // ✅ If it's a URL, render an image
            <img
              src={imageOrText}
              alt={title}
              className="item-image"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "70%",
              }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // ✅ Fallback image
            />
          ) : ( // ✅ If it's not a URL, display text
            <h5 >{}</h5>
          )}
        </div>

        {/* Title */}
        <h6 className="card-title col-8">{title}</h6>

        {/* Dynamic Description Label */}
        <div className="row">
          <h5 className="col">{descriptionLabelKey}</h5> {/* ✅ Display dynamic label */}
          <p className="col">{description}</p>
        </div>

        {/* Optional Button */}
        {buttonAction && (
          <button className="btn btn-primary" onClick={() => buttonAction(data)}>
            Action
          </button>
        )}

        {/* Top Button Sack (if needed for future actions) */}
        <div className="btn-sack-top">
          <span></span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ManageCard;
