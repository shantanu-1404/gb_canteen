import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import TagInput from "../components/TagInput";
import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";

const AddNewDish = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };
  const [PostFrequency, setPostFrequency] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [fileData, setFileData] = useState(null);

  const related_cuisine = [
    { value: "italian", label: "Italian" },
    { value: "chinese", label: "Chinese" },
    { value: "mexican", label: "Mexican" },
    { value: "indian", label: "Indian" },
    { value: "japanese", label: "Japanese" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "french", label: "French" },
    { value: "thai", label: "Thai" },
    { value: "greek", label: "Greek" },
    { value: "american", label: "American" },
  ];

  const dietary_attributes = [
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "gluten_free", label: "Gluten-Free" },
    { value: "dairy_free", label: "Dairy-Free" },
    { value: "nut_free", label: "Nut-Free" },
    { value: "low_carb", label: "Low Carb" },
    { value: "high_protein", label: "High Protein" },
    { value: "halal", label: "Halal" },
    { value: "kosher", label: "Kosher" },
    { value: "paleo", label: "Paleo" },
  ];
  const spice_levels = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "hot", label: "Hot" },
    { value: "extra_hot", label: "Extra Hot" },
    { value: "extreme", label: "Extreme" },
  ];

  const status_options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "in_progress", label: "In Progress" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const tier_options = [
    { value: "basic", label: "Basic" },
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" },
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" },
    { value: "diamond", label: "Diamond" },
    { value: "enterprise", label: "Enterprise" },
  ];
  const country_of_origin = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
  ];
  const discount_types = [
    { value: "percentage", label: "Percentage (%)" },
    { value: "fixed_amount", label: "Fixed Amount ($)" },
    { value: "buy_one_get_one", label: "Buy One Get One (BOGO)" },
    { value: "bulk_discount", label: "Bulk Discount" },
    { value: "seasonal", label: "Seasonal Discount" },
    { value: "clearance", label: "Clearance Sale" },
    { value: "loyalty", label: "Loyalty Discount" },
    { value: "membership", label: "Membership Discount" },
    { value: "referral", label: "Referral Discount" },
    { value: "coupon", label: "Coupon Code" },
  ];

  const handleTagsChange = (tags) => {
    console.log("Selected Tags:", tags);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const availableTags = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Angular",
    "Vue",
    "Python",
    "Django",
    "Flask",
  ];
  return (
    <Layout>
      <Row>
        <FormHeader
          title=" Add New Dish "
          backUrl="/store_menu"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <TextInput
              label="Dish Name"
              placeholder="Name"
              required={true}
              onChange={handleTextInputChange}
            />

            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              isWordCount={true}
              wordLimit={100}
            />

            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Cuisine Type"
                  name="Cuisine Type"
                  listStyle="col-md-6"
                  options={related_cuisine}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Dietary attribute"
                  name="Dietary attribute"
                  listStyle="col-md-6"
                  options={dietary_attributes}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Allergen Warnings"
                  placeholder=" Warnings"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Spice Level"
                  name="Spice Level"
                  listStyle="col-md-6"
                  options={spice_levels}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TagInput
                  availableTags={availableTags}
                  onTagsChange={handleTagsChange}
                />
              </div>
              <div className="col-md-6" style={{ marginTop: "36px" }}>
                <TextInput
                  label="Price"
                  placeholder="Price"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Cost"
                  placeholder="Cost"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Compare at Price"
                  placeholder="Price"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Status"
                  name="Status"
                  listStyle="col-md-6"
                  options={status_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Weight"
                  placeholder="Weight"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <SelectComponent
                  label="Tier 1"
                  name="Tier 1"
                  listStyle="col-md-6"
                  options={tier_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-3">
                <SelectComponent
                  label="Tier 2"
                  name="Tier 2"
                  listStyle="col-md-6"
                  options={tier_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>

              <div className="col-md-3">
                <SelectComponent
                  label="Tier 3"
                  name="Tier 3"
                  listStyle="col-md-6"
                  options={tier_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-3">
                <SelectComponent
                  label="Tier 4"
                  name="Tier 4"
                  listStyle="col-md-6"
                  options={tier_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Country of Origin"
                  name="Country of Origin"
                  listStyle="col-md-6"
                  options={country_of_origin}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Region"
                  placeholder="Region"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Multi Buy discount"
                  placeholder="Discount Name"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Minimum Quantity For Discount"
                  placeholder="Quantity"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Discount Type"
                  name="Discount Type"
                  listStyle="col-md-6"
                  options={discount_types}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
          </div>

          <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
            <a type="submit" className="btn col-4 a-btn-primary">
              Add
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewDish;
