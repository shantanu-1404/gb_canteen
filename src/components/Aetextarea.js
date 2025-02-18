import React, { useState } from "react";

const Aetextarea = ({
    label = "Textarea",
    info = "",
    name = "",
    placeholder = "Enter text...",
    isWordCount = false,
    wordLimit = 300,
    onChange
}) => {
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (isWordCount) {
            // Word count enabled
            const words = inputText
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0);

            if (words.length <= wordLimit) {
                setText(inputText);
                setWordCount(words.length);
                if (onChange) onChange(inputText); // Pass value to parent
            }
        } else {
            // Normal textarea
            setText(inputText);
            if (onChange) onChange(inputText);
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                style={{ height: 100 }}
                id={name}
                name={name}
                className="form-control resizable-textarea"
                placeholder={placeholder}
                value={text}
                onChange={handleTextChange}
                rows={4}
            ></textarea>

            {isWordCount && (
                <div className="d-flex justify-content-end">                    
                    <small className="word-count">
                        {wordCount}/{wordLimit}
                    </small>
                </div>
            )}
            <br/><small>{info}</small>
        </div>
    );
};

export default Aetextarea;
