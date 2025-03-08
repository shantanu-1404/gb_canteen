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
import RadioInput from "../components/RadioInput";

const AddNewCollection = () => {
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
  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

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

  const options = [
    { label: "Hidden", value: "credit" },
    { label: "Visible", value: "paypal" },
  ];

  return (
    <Layout>
      <FormHeader
        title="Add New Collection"
        backUrl="/collections"
        closeUrl="/"
      />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Collection Details</h6>
            <TextInput
              label="Title"
              placeholder="Title"
              required={true}
              onChange={handleTextInputChange}
            />
            
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={50}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Search Engine Listing</h6>
            <TextInput
              label="Page Title"
              placeholder="Title"
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Meta Description"
              name="Meta Description"
              placeholder="Meta Description"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={50}
            />
            <TextInput
              label="URL Handle"
              type="url"
              required={true}
              onChange={handleTextInputChange}
              placeholder="URL"
            />
          </div>

          
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Collection Image</h6>
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
          </div>

          <div className="form_section">
            <h6 className="card-title">Collection Visibility</h6>

            <RadioInput
              name="payment"
              options={options}
              required={true}
              onChange={handleOptionChange}
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
              name="Recurrence"
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

export default AddNewCollection;
