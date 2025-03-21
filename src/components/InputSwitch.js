import React from "react";
import PropTypes from "prop-types";


const InputSwitch = ({ checked, onChange, label }) => {
  return (
    <div className="input-switch-container">
   
      <label className="input-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
      {label && <span className="switch-label">{label}</span>}
    </div>
  );
};

// ✅ PropTypes for Validation
InputSwitch.propTypes = {
  checked: PropTypes.bool.isRequired, // ✅ Requires boolean value
  onChange: PropTypes.func.isRequired, // ✅ Requires function to handle changes
  label: PropTypes.string, // ✅ Optional label
};

export default InputSwitch;
