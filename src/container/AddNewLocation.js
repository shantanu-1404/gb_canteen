import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectComponent from "../components/SelectComponent";
import DateInput from "../components/DateInput";
import TagInput from "../components/TagInput";
import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import AddSubsection from "../components/AddSubsection";

const AddNewLocation = () => {
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

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const status_options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "archived", label: "Archived" },
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
  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  return (
    <Layout>
      <Row>
        <FormHeader
          title="Add New Location"
          backUrl="/manage_location"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Location Details</h6>
            <Row>
              <TextInput
                label="Region"
                placeholder="Region"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="City"
                placeholder="City"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <Row>
              <TextInput
                label="State"
                placeholder="State"
                required={true}
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Postal Code"
                placeholder="Code"
                required={true}
                onChange={handleTextInputChange}
              />
            </Row>
            <Row>
              <TextInput
                label="Delivery Areas Range"
                placeholder="Areas "
                required={true}
                onChange={handleTextInputChange}
              />
              <SelectComponent
                label="Assign Cuisines"
                name="Assign Cuisines"
                listStyle="col-md-6"
                options={related_cuisine}
                isMulti={false}
                onChange={setPostFrequency}
              />
            </Row>
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

export default AddNewLocation;
