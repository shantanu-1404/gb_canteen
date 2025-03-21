import React from "react";

const AddConditionButton = ({ label = "Add Condition", type = "button", onClick }) => {
  return (
    <button type={type} onClick={onClick} className="add-condition-btn">
    
      <span className="button-label"> + {label}</span>
    </button>
  );
};

export default AddConditionButton;
