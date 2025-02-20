import React, { useState } from 'react';

const TagInput = ({ placeholder, onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Add a tag to the list
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      const updatedTags = [...tags, tagInput];
      setTags(updatedTags);
      onTagsChange(updatedTags); // Pass the updated tags back to the parent component
      setTagInput(''); // Clear input after adding the tag
    }
  };

  // Remove a tag from the list
  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange(updatedTags); // Pass the updated tags back to the parent component
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">{placeholder}</label>

      {/* Render tags */}
      <div className="selected-options">
        {tags.map((tag, index) => (
          <div key={index} className="selected-tag">
            <span>{tag}</span>
            <span
              className="remove-tag"
              onClick={() => handleRemoveTag(index)}
              style={{
                cursor: "pointer",
                marginLeft: "8px",
              }}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      {/* Input field to add new tags */}
      <div className="d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control tag-input"
          placeholder={placeholder}
          value={tagInput} // Controlled input
          onChange={handleInputChange} // Update input field
          onKeyPress={handleKeyPress} // Add tag when Enter is pressed
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagInput;
