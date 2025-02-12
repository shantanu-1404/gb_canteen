import React, { useState, useRef, useEffect } from "react";

const TagInput = ({ availableTags = [], onTagsChange, info}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim() !== "") {
      setFilteredSuggestions(
        availableTags.filter(
          (tag) =>
            tag.toLowerCase().includes(inputValue.toLowerCase()) &&
            !selectedTags.includes(tag)
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, availableTags, selectedTags]);

  // Handle adding a tag
  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onTagsChange && onTagsChange(updatedTags);
    }
    setInputValue("");
  };

  // Handle removing a tag
  const removeTag = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    onTagsChange && onTagsChange(updatedTags);
  };

  // Handle user input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key to add a tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (availableTags.includes(inputValue)) {
        addTag(inputValue);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (tag) => {
    addTag(tag);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        setFilteredSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="form-group">
      <label className="form-label">Tags</label>
      <div className="tag-input-wrapper">
        {/* Selected Tags */}
        <div className="tags-container">
          {selectedTags.map((tag) => (
            <div key={tag} className="tag">
              {tag}{" "}
              <span className="remove-tag" onClick={() => removeTag(tag)}>
                &times;
              </span>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          className="tag-input col"
          placeholder="Add a tag"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <br /><small>{info}</small>

        {/* Suggestions List */}
        {filteredSuggestions.length > 0 && (
          <div ref={suggestionsRef} className="suggestions-list">
            {filteredSuggestions.map((tag) => (
              <div key={tag} onClick={() => handleSuggestionClick(tag)}>
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Hidden Input for storing tags */}
        <input
          type="hidden"
          id="tagsHiddenInput"
          name="tags"
          value={selectedTags.join(",")}
        />
      </div>
    </div>
  );
};

export default TagInput;
