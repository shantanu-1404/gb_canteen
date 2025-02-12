import React, { useState } from "react";

const WordLimit = ({
     wordLimit = 300,
      placeholder = "Write your message here...",
       label = "Add Title"
     }) => {
  const [wordCount, setWordCount] = useState(0);
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (words.length <= wordLimit) {
      setText(inputText);
      setWordCount(words.length);
    }
  };

  return (
    <div className="form_section">
    <div className="word-limit-container">
      <div className="form-group">
        <h6 className="word-limit-label">{label}</h6>
        <textarea
          className="form-control resizable-textarea"
          placeholder={placeholder}
          value={text}
          onChange={handleTextChange}
          rows={4}
        ></textarea>
        <small className="word-count">
          {wordCount}/{wordLimit} words
        </small>
      </div>
    </div>
    </div>

  );
};

export default WordLimit;



 // How to use word-limit-container 
 //<WordLimit wordLimit={100} placeholder="Write a short bio..." label="User Bio" /> 


