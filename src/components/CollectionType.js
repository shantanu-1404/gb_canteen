import React, { useState, useEffect } from "react";
import Layout from "./layout";
import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RadioInput from "../components/RadioInput";
import SearchBar from "../components/Searchbar"; // Assuming you have a search bar component

const CollectionType = () => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [conditions, setConditions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  // Options for select dropdowns
  const fieldOptions = [
    { value: "product_title", label: "Product Title" },
    { value: "product_type", label: "Product Type" },
    { value: "product_vendor", label: "Product Vendor" },
    { value: "product_tag", label: "Product Tag" },
    { value: "price", label: "Price" },
    { value: "inventory_stock", label: "Inventory Stock" },
    { value: "sku", label: "SKU" },
  ];

  const operatorOptions = {
    product_title: [
      "Equals",
      "Does Not Equal",
      "Contains",
      "Does Not Contain",
      "Starts With",
      "Ends With",
    ],
    price: ["Greater Than", "Less Than"],
    inventory_stock: ["Greater Than", "Less Than"],
    product_tag: ["Contains", "Does Not Contain"],
    product_vendor: ["Equals", "Does Not Equal"],
    product_type: ["Equals", "Does Not Equal"],
  };

  const valueOptions = {
    product_tag: ["Summer Collection", "New Arrival", "Best Seller"], // Example tags
    price: [">50", "<100"], // Example price filters
    product_vendor: ["Nike", "Adidas", "Apple"], // Example vendors
    product_type: ["Shoes", "Electronics", "Clothing"], // Example categories
  };

  // Handle radio change for "Manual" or "Automated"
  const handleRadioChange = (value) => {
    setSelectedShipping(value);
  };

  const handleAddCondition = () => {
    if (!selectedField || !selectedOperator || !selectedValue) {
      console.warn("Please select all condition fields before adding.");
      return;
    }
  
    setConditions((prevConditions) => {
      const newConditions = [
        ...prevConditions,
        {
          field: selectedField,
          operator: selectedOperator,
          value: selectedValue,
        },
      ];
      console.log("✅ New Conditions List:", newConditions);
      return newConditions;
    });
  };
  

  // Handle removing a condition
  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };
  const applyFilters = (data) => {
    console.log("Applying Filters - Current Conditions:", conditions); // Log conditions

    if (conditions.length === 0) {
      console.log("No conditions selected. Returning all data.");
      return data; // If no conditions, return all data
    }

    const filteredResults = data.filter((row) => {
      return conditions.every((condition) => {
        const field = row[condition.field];
        const operator = condition.operator;
        const value = condition.value;

        console.log(
          `Filtering: Field=${condition.field}, Operator=${operator}, Value=${value}, Row Value=${field}`
        );

        if (!field) return false; // Ignore invalid fields

        switch (operator) {
          case "Equals":
            return (
              field.toString().toLowerCase() === value.toString().toLowerCase()
            );
          case "Does Not Equal":
            return (
              field.toString().toLowerCase() !== value.toString().toLowerCase()
            );
          case "Contains":
            return field
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
          case "Does Not Contain":
            return !field
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
          case "Starts With":
            return field
              .toString()
              .toLowerCase()
              .startsWith(value.toString().toLowerCase());
          case "Ends With":
            return field
              .toString()
              .toLowerCase()
              .endsWith(value.toString().toLowerCase());
          case "Greater Than":
            return parseFloat(field) > parseFloat(value);
          case "Less Than":
            return parseFloat(field) < parseFloat(value);
          default:
            return true;
        }
      });
    });

    console.log("Filtered Results:", filteredResults); // Log filtered data
    return filteredResults;
  };

  // Table Data (Example data)
  const tableData = [
    {
      product_title: "Apple iPhone",
      product_type: "Electronics",
      price: 1000,
      product_vendor: "Apple",
      product_tag: "New Arrival",
      inventory_stock: 50,
      sku: "IP001",
    },
    {
      product_title: "Nike Shoes",
      product_type: "Footwear",
      price: 100,
      product_vendor: "Nike",
      product_tag: "Best Seller",
      inventory_stock: 200,
      sku: "NS001",
    },
    {
      product_title: "Adidas Shoes",
      product_type: "Footwear",
      price: 80,
      product_vendor: "Adidas",
      product_tag: "Summer Collection",
      inventory_stock: 300,
      sku: "AS001",
    },
  ];

  const [filteredData, setFilteredData] = useState(tableData);
  console.log("🎯 Rendering Table - Filtered Data:", filteredData);

  useEffect(() => {
    console.log("🚀 Conditions Updated (useEffect Triggered):", conditions);
    const updatedData = applyFilters(tableData);
    setFilteredData(updatedData);
  }, [conditions]);
  

  // Define the columns for the table
  const columns = [
    { headname: "Product Title", dbcol: "product_title" },
    { headname: "Product Type", dbcol: "product_type" },
    { headname: "Price", dbcol: "price" },
    { headname: "Product Vendor", dbcol: "product_vendor" },
    { headname: "Product Tag", dbcol: "product_tag" },
    { headname: "Inventory Stock", dbcol: "inventory_stock" },
    { headname: "SKU", dbcol: "sku" },
  ];

  return (
    <Layout>
      <FormHeader title="Add New Blog" backUrl="/blogs" closeUrl="/" />
      <Row>
        <Col md={9}>
          <div className="form_section">
            <h6 className="card-title">Collection Type</h6>
            <RadioInput
              name="Collectiontype"
              options={[
                { label: "Manual", value: "manual" },
                { label: "Automated", value: "automated" },
              ]}
              onChange={(value) => setSelectedShipping(value)}
            />

            {selectedShipping === "manual" && (
              <SearchBar onSearch={setSearchQuery} />
            )}

            {selectedShipping === "automated" && (
              <>
                <h3>Conditions</h3>
                <SelectComponent
                  label="Field"
                  name="fieldSelect"
                  options={fieldOptions}
                  onChange={(value) => {
                    console.log("Field Selected:", value);
                    setSelectedField(value);
                  }}
                />

                <SelectComponent
                  label="Operator"
                  name="operatorSelect"
                  options={(operatorOptions[selectedField] || []).map((op) => ({
                    value: op,
                    label: op,
                  }))}
                  onChange={(value) => {
                    console.log("Operator Selected:", value);
                    setSelectedOperator(value);
                  }}
                />

                <SelectComponent
                  label="Value"
                  name="valueSelect"
                  options={(valueOptions[selectedField] || []).map((val) => ({
                    value: val,
                    label: val,
                  }))}
                  onChange={(value) => {
                    console.log("Value Selected:", value);
                    setSelectedValue(value);
                  }}
                />

                <Button
                  buttonType="add"
                  label="Add Another Condition"
                  onClick={handleAddCondition}
                />
              </>
            )}

            {conditions.length > 0 && (
              <div>
                <h4>Conditions:</h4>
                {conditions.map((condition, index) => (
                  <div key={index} className="condition">
                    <span>
                      {condition.field} {condition.operator} {condition.value}
                    </span>
                    <Button
                      buttonType="edit"
                      label="Remove"
                      onClick={() => handleRemoveCondition(index)}
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Display filtered data in a table */}
            <table className="table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.dbcol}>{col.headname}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.product_title}</td>
                      <td>{row.product_type}</td>
                      <td>{row.price}</td>
                      <td>{row.product_vendor}</td>
                      <td>{row.product_tag}</td>
                      <td>{row.inventory_stock}</td>
                      <td>{row.sku}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      No matching products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default CollectionType;
