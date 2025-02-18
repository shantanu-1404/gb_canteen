import React, { useState } from "react";

const SocialMediaSelect = ({ onSelectionChange }) => {
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const platforms = [
        { id: "facebook", img: "https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9bf020c_Frame 1171277430.svg" },
        { id: "instagram", img: "https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b59e66_Frame 1171277431.svg" },
        { id: "linkedin", img: "https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b9e088_Frame 1171277432.svg" },
        { id: "youtube", img: "https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b0a93f_Frame 1171277433.svg" },
        { id: "twitter", img: "https://storage.googleapis.com/sportzsaga_imgs/icons/67af0ef11bc4f_Frame 1171277437.svg" },
    ];

    const handleSelection = (id) => {
        let updatedSelection;
        if (selectedPlatforms.includes(id)) {
            updatedSelection = selectedPlatforms.filter((platform) => platform !== id);
        } else {
            updatedSelection = [...selectedPlatforms, id];
        }
        setSelectedPlatforms(updatedSelection);
        if (onSelectionChange) {
            onSelectionChange(updatedSelection);
        }
    };

    return (
        <div className="form_section">
            <h6 className="card-title">Publish To</h6>
            <div className="d-flex flex-wrap">
                {platforms.map((platform) => (
                    <div
                        key={platform.id}
                        className={`check-item ${selectedPlatforms.includes(platform.id) ? "selected" : ""}`}
                        onClick={() => handleSelection(platform.id)}
                    >
                        <img src={platform.img} alt={platform.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaSelect;
