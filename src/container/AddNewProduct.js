import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagInput from "../components/TagInput";
import TabComponent from "../components/InventaryPanel";
import DateInput from "../components/DateInput";

const AddNewProduct = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");

  // Handle caption change
  const handleCaptionChange = (text) => {
    setMessage(text);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  const handleTagsChange = (tags) => {
    console.log("Selected Tags:", tags);
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
      <FormHeader title="Add New Product" backUrl="/products" closeUrl="/" />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Product Details</h6>
            <TextInput
              label="Product Title"
              placeholder="Title"
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Product Description"
              name="Description"
              placeholder="Description"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={100}
            />
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
          </div>

          <div className="form_section">
            <TabComponent />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Organize</h6>
            <SelectComponent
              label="Category"
              name="Category"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Vendor"
              name="Vendor"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <TextInput
              label="Collections"
              placeholder="Collection"
              required={true}
              onChange={handleTextInputChange}
            />
            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
            />
            <SelectComponent
              label="Status"
              name="Status"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />

            <DateInput label="Publish Date" includeTime={true} />
            <DateInput label="End Date" includeTime={true} type="future" />
            <SelectComponent
              label="Recurrence"
              name="Recurrence"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Publish For"
              name="Publish For"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>
          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="submit" className="btn col-4 a-btn-primary">
              Add
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewProduct;
