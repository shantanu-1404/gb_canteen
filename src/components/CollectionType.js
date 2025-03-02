import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";



const MyFormComponent = () => {
  const [selectedProductTag, setSelectedProductTag] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  const options = [
    { value: 'Product Title', label: 'Product Title' },
    { value: 'Product Type', label: 'Product Type' },
    { value: 'Product Vendor', label: 'Product Vendor' },
    { value: 'Product Tag', label: 'Product Tag' },
    { value: 'Price', label: 'Price' },
    { value: 'Inventory Stock', label: 'Inventory Stock' },
    { value: 'SKU', label: 'SKU' },
  ];
  
  // Condition options depending on product tag
  const conditionOptions = {
    'Product Tag': ['Equals', 'Does Not Equal', 'Contains', 'Does Not Contain', 'Starts With', 'Ends With'],
    'Price': ['Greater Than', 'Less Than'],
    'Vendor': ['Equals'],
    'Product Type': ['Equals'],
  };

  // Tags based on the product tag selection
  const tagOptions = {
    'Product Tag': ['Summer Collection', 'New Arrival', 'Best Seller'],
    'Price': ['>50', '<100'],
    'Vendor': ['Nike', 'Adidas', 'Apple'],
    'Product Type': ['Shoes', 'Electronics', 'Clothing'],
  };

  const handleProductTagChange = (selectedOption) => {
    setSelectedProductTag(selectedOption.value); // Use selectedOption.value instead of e.target.value
    setSelectedCondition(''); // Reset condition when product tag changes
    setSelectedTag(''); // Reset tag when product tag changes
  };

  const handleConditionChange = (selectedOption) => {
    setSelectedCondition(selectedOption.value); // Use selectedOption.value
  };

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption.value); // Use selectedOption.value
  };

  return (
    <div className="form_section">
      <div className="row">
        {/* Product Tag Dropdown */}
        <SelectComponent
          label="Product Tag"
          name="Recurrence"
          options={options}
          isMulti={false}
          onChange={handleProductTagChange} // handleProductTagChange expects a selectedOption object
        />
        
        {/* Condition Dropdown */}
        <SelectComponent
          label="Condition"
          name="condition"
          options={conditionOptions[selectedProductTag] || []}
          isMulti={false}
          onChange={handleConditionChange} // handleConditionChange expects a selectedOption object
        />
        
        {/* Tag Dropdown */}
        <SelectComponent
          label="Tag"
          name="tag"
          options={tagOptions[selectedProductTag] || []}
          isMulti={false}
          onChange={handleTagChange} // handleTagChange expects a selectedOption object
        />
      </div>
    </div>
  );
};

export default MyFormComponent;











