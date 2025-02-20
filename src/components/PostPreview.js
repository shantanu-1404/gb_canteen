import React, { useState } from "react";
import InstagramPreview from "./InstagramPreview";
import FacebookPreview from "./FacebookPreview";
import LinkedInPreview from "./LinkedInPreview";
import TwitterPreview from "./TwitterPreview";
import YouTubePreview from "./YouTubePreview";

const PostPreview = ({
    fileData,
    selectedPlatforms = [],
    selectedPosition,
    buttonText,
    buttonUrl,
    buttonColor,
    captionText
}) => {
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

    // If no platforms selected or no media file, show fallback
    if (!selectedPlatforms.length || !fileData) {
        return (
            <div className="form_section">
                <h6 className="card-title">Preview</h6>
                <div className="post-preview d-flex justify-content-center align-items-center" >
                    <p className="text-muted">No content available for preview.</p>
                </div>
            </div>
        );
    }

    // ✅ Correctly store component references (without JSX syntax)
    const platformComponents = {
        instagram: InstagramPreview,
        facebook: FacebookPreview,
        linkedin: LinkedInPreview,
        twitter: TwitterPreview,
        youtube: YouTubePreview,
    };

    // Get the current platform
    const currentPlatform = selectedPlatforms[currentPreviewIndex];
    const PreviewComponent = platformComponents[currentPlatform];

    // If the platform is not supported, return null
    if (!PreviewComponent) return null;

    // Navigation functions
    const prevPreview = () => {
        setCurrentPreviewIndex((prev) => (prev > 0 ? prev - 1 : selectedPlatforms.length - 1));
    };

    const nextPreview = () => {
        setCurrentPreviewIndex((prev) => (prev < selectedPlatforms.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="form_section">
            <h6 className="card-title">Preview</h6>
            <div className="post-preview-container">
                {selectedPlatforms.length > 1 && (
                    <button className="btn" onClick={prevPreview}><i class="bi bi-chevron-left"></i></button>
                )}
                {/* ✅ Correct way to render a React component dynamically */}
                <PreviewComponent
                    fileData={fileData}
                    captionText={captionText}
                    buttonText={buttonText}
                    buttonUrl={buttonUrl}
                    buttonColor={buttonColor}
                    selectedPosition={selectedPosition}
                />
                {selectedPlatforms.length > 1 && (
                    <button className="btn" onClick={nextPreview}><i class="bi bi-chevron-right"></i></button>
                )}
            </div>
        </div>
    );
};

export default PostPreview;
