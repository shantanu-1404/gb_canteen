import React, { useState } from "react";
import RadioInput from "../components/RadioInput";

import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInput from "../components/CheckboxInput";

const TabComponent = () => {
  // Set the default active tab
  const [activeTab, setActiveTab] = useState("pricing");

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const [selectedSingle, setSelectedSingle] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (value) => {
    setSelectedOption(value); // Update the selected option
    console.log("Selected option:", value); // You can do anything here with the value
  };
  const radioOptions = [
    { label: "Worldwide delivery", value: "option3" },
    { label: "Selected Areas", value: "option4" },
    { label: "Local delivery", value: "option5" }
  ];

  const shipping = [
    { label: "Fulfilled by Seller", value: "option1" },
    { label: "Fulfilled by Us", value: "option2" }
  ];
  return (
    <div className="form_section">
      <h6 className="card-title">Inventory</h6>
      <div className="d-flex align-items-start">
        {/* Tab Links (Vertical tabs) */}
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
          style={{ borderRight: "4px solid #ddd" }} // Adding a vertical line between the tabs and content
        >
          {/* Link for Pricing Tab */}
          <a
            className={`nav-link ${activeTab === "pricing" ? "active" : ""}`}
            onClick={() => handleTabChange("pricing")}
            id="v-pills-pricing-tab"
            role="tab"
            aria-controls="v-pills-pricing"
            aria-selected={activeTab === "pricing"}
          >
            Pricing
          </a>

          {/* Link for Restock Tab */}
          <a
            className={`nav-link ${activeTab === "restock" ? "active" : ""}`}
            onClick={() => handleTabChange("restock")}
            id="v-pills-restock-tab"
            role="tab"
            aria-controls="v-pills-restock"
            aria-selected={activeTab === "restock"}
          >
            Restock
          </a>

          {/* Link for Shipping Tab */}
          <a
            className={`nav-link ${activeTab === "shipping" ? "active" : ""}`}
            onClick={() => handleTabChange("shipping")}
            id="v-pills-shipping-tab"
            role="tab"
            aria-controls="v-pills-shipping"
            aria-selected={activeTab === "shipping"}
          >
            Shipping
          </a>

          {/* Link for Delivery Tab */}
          <a
            className={`nav-link ${activeTab === "delivery" ? "active" : ""}`}
            onClick={() => handleTabChange("delivery")}
            id="v-pills-delivery-tab"
            role="tab"
            aria-controls="v-pills-delivery"
            aria-selected={activeTab === "delivery"}
          >
            Delivery
          </a>

          {/* Link for Attributes Tab */}
          <a
            className={`nav-link ${activeTab === "attributes" ? "active" : ""}`}
            onClick={() => handleTabChange("attributes")}
            id="v-pills-attributes-tab"
            role="tab"
            aria-controls="v-pills-attributes"
            aria-selected={activeTab === "attributes"}
          >
            Attributes
          </a>

          {/* Link for Advanced Tab */}
          <a
            className={`nav-link ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => handleTabChange("advanced")}
            id="v-pills-advanced-tab"
            role="tab"
            aria-controls="v-pills-advanced"
            aria-selected={activeTab === "advanced"}
          >
            Advanced
          </a>
        </div>

        {/* Tab Content */}
        <div
          className="tab-content"
          id="v-pills-tabContent"
          style={{ paddingLeft: "20px" }}
        >
          {/* Content for Pricing Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "pricing" ? "show active" : ""
            }`}
            id="v-pills-pricing"
            role="tabpanel"
            aria-labelledby="v-pills-pricing-tab"
            tabIndex="0"
          >
            <SelectComponent
              label="Currency"
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <TextInput
              label="Original Price"
              placeholder="Price"
              required={true}
              onChange={handleTextInputChange}
            />
            <TextInput
              label="Sale Price"
              placeholder="Price"
              required={true}
              onChange={handleTextInputChange}
            />
          </div>

          {/* Content for Restock Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "restock" ? "show active" : ""
            }`}
            id="v-pills-restock"
            role="tabpanel"
            aria-labelledby="v-pills-restock-tab"
            tabIndex="0"
          >
            <Row>
              <SelectComponent
                label="Add to Stock"
                name="singleSelect"
                options={options}
                isMulti={false}
                onChange={setSelectedSingle}
              />
              <button type="submit" className="a-btn-primary">
                Add
              </button>
            </Row>
            <div className="row">
              <strong className="col-md">Product in stock now -</strong>
              <p className="col-md">5030</p>
            </div>
            <div className="row">
              <strong className="col-md">Product in transit -</strong>
              <span className="col-md">434</span>
            </div>
            <div className="row">
              <strong className="col-md">Last time restocked -</strong>
              <span className="col-md">1 Jan, 2025</span>
            </div>
          </div>

          {/* Content for Shipping Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "shipping" ? "show active" : ""
            }`}
            id="v-pills-shipping"
            role="tabpanel"
            aria-labelledby="v-pills-shipping-tab"
            tabIndex="0"
          >
            <h2>Shipping Type</h2>
            <RadioInput
              name="optionsGroup"
              options={shipping}
              required={true} // Make selection mandatory
              info="You’ll be responsible for product delivery.Any damage or delay during shipping may cost you a Damage fee.."
              onChange={handleRadioChange}
            />
          </div>

          {/* Content for Delivery Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "delivery" ? "show active" : ""
            }`}
            id="v-pills-delivery"
            role="tabpanel"
            aria-labelledby="v-pills-delivery-tab"
            tabIndex="0"
          >
            <h2>Shipping Type</h2>
            <RadioInput
              name="optionsGroup"
              options={radioOptions}
              required={true} // Make selection mandatory
              onChange={handleRadioChange}
            />
            <SelectComponent
              label=""
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>

          {/* Content for Attributes Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "attributes" ? "show active" : ""
            }`}
            id="v-pills-attributes"
            role="tabpanel"
            aria-labelledby="v-pills-attributes-tab"
            tabIndex="0"
          >
            <Row>
              <h2>Atrributes</h2>
              <Col md={6}>
                <CheckboxInput label="Fragile Product" name="r1" />
                <CheckboxInput label="Biodegradable" name="r2" />
                <CheckboxInput label="Frozen Product" name="r3" />
                <CheckboxInput label="Expiry Date of Product" name="r4" />
              </Col>
            </Row>
          </div>

          {/* Content for Advanced Tab */}
          <div
            className={`tab-pane fade ${
              activeTab === "advanced" ? "show active" : ""
            }`}
            id="v-pills-advanced"
            role="tabpanel"
            aria-labelledby="v-pills-advanced-tab"
            tabIndex="0"
          >
            Advanced content goes here
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
