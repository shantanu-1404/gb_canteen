import React, { useState, useRef } from "react";

const allowedTypes = {
    image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    video: ["video/mp4", "video/quicktime", "video/x-matroska", "video/webm"],
    audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
    txt: [
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    pdf: ["application/pdf"],
    excel: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
    ],
};

const FileUploadComponent = ({ label, name, allowedClasses, onChange }) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(true);

    const validateFileType = (file) => {
        if (!file) return false;
        const classList = allowedClasses.split(" ");
        return classList.some((cls) =>
            allowedTypes[cls]?.includes(file.type)
        );
    };

    const handleFileSelection = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const isValidFile = validateFileType(selectedFile);
        setIsValid(isValidFile);
        setFile(selectedFile);
        if (onChange) onChange(selectedFile, isValidFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files.length > 0) {
            inputRef.current.files = event.dataTransfer.files;
            handleFileSelection({ target: inputRef.current });
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setIsValid(true);
        inputRef.current.value = "";
    };

    return (
        <div className="form-group">
            <label for="" className="form-label">File Input</label>

            <div
                className="file-upload"
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <label for="" className="form-label">Drag & drop files or <a>Browse</a></label>
                <input
                    type="file"
                    name={name}
                    className={allowedClasses}
                    ref={inputRef}
                    onChange={handleFileSelection}
                    style={{ display: "none" }}
                />
                <small>{label}</small>
            </div>

            <div className="file-preview-container">
                {file && (
                    <div className={`file-preview ${isValid ? "success" : "error"}`}>
                        <div className="preview-content">
                            {isValid && file.type.startsWith("image/") && (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="preview-image"
                                />
                            )}
                            <div className="file-info">
                                <div className="file-name">{file.name}</div>
                            </div>
                            <button
                                type="button"
                                className="remove-file"
                                onClick={handleRemoveFile}
                            >
                                <i className="bi bi-trash3"></i>
                            </button>
                        </div>
                        <div className="message">
                            {isValid
                                ? "All information in the document is consistent with the platform standards"
                                : "The file format is incorrect. Please upload a supported file"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadComponent;
