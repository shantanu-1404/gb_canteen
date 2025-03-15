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
import AddSubsection from "../components/AddSubsection";

const AddNewCuisine = () => {
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
          title="Add New Cuisine"
          backUrl="/manage_cuisine"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Cuisine Details</h6>

            <TextInput
              label="Cuisine Name"
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
                  label="Related Cuisine"
                  name="related_cuisine"
                  listStyle="col-md-6"
                  options={related_cuisine}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Featured Restaurant"
                  placeholder=""
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <AddSubsection Cardtitle="FAQ's" layoutType="card">
              <Row>
                <TextInput
                  required={true}
                  placeholder="Question"
                  onChange={handleTextInputChange}
                />
                <TextInput
                  required={true}
                  placeholder="Answer"
                  onChange={handleTextInputChange}
                />
              </Row>
            </AddSubsection>
            <AddSubsection Cardtitle="Offers" layoutType="card">
              <Row>
                <TextInput
                  required={true}
                  placeholder="Offer Name"
                  onChange={handleTextInputChange}
                />
                <TextInput
                  required={true}
                  placeholder="Description"
                  onChange={handleTextInputChange}
                />
              </Row>
            </AddSubsection>
            <div className="row">
              <div className="col-md-6  ">
                <SelectComponent
                  label="Status"
                  name="status_options"
                  listStyle="col-md-6"
                  options={status_options}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <TagInput
                  availableTags={availableTags}
                  onTagsChange={handleTagsChange}
                />
              </div>
            </div>
          </div>

          <div className="form_section">
            <h6 className="card-title">Location Served</h6>

            <Row>
              <TextInput
                label="Region"
                required={true}
                placeholder="Region"
                onChange={handleTextInputChange}
              />
              <TextInput
                label="City"
                required={true}
                placeholder="City"
                onChange={handleTextInputChange}
              />
            </Row>

            <Row>
              <TextInput
                label="State"
                required={true}
                placeholder="State"
                onChange={handleTextInputChange}
              />
              <TextInput
                label="Postal Code"
                required={true}
                placeholder="Code"
                onChange={handleTextInputChange}
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

export default AddNewCuisine;
