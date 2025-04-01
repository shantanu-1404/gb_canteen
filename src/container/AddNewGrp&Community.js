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
import RadioInput from "../components/RadioInput";

const AddNewGroup = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");
  const [selectedType, setSelectedType] = useState("option1"); // default: Add New Community

  const handleCaptionChange = (text) => setMessage(text);

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const handleTagsChange = (tags) => {
    console.log("Selected Tags:", tags);
  };

  const handleOptionChange = (value) => {
    setSelectedType(value);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

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
      <FormHeader title="Add New Group & Community" backUrl="/" closeUrl="/" />

      <Row>
        <Col md={12}>
          <div className="form_section">
            <RadioInput
              name="groupType"
              options={[
                { label: "Add New Community", value: "option1" },
                { label: "Add New Group", value: "option2" },
              ]}
              required={true}
              onChange={handleOptionChange}
            />

            {selectedType === "option1" && (
              <>
                <h6 className="card-title">Add New Community</h6>
                <TextInput
                  label="Community Name"
                  placeholder="Name"
                  required={true}
                  onChange={handleTextInputChange}
                />
                <Aetextarea
                  label="Description"
                  name="Description"
                  placeholder="Description"
                  onChange={handleCaptionChange}
                  isWordCount={true}
                  wordLimit={100}
                />
                <Row>
                  <SelectComponent
                    style={{ marginTop: "35px" }}
                    label="Category"
                    name="Category"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                  <TagInput
                    availableTags={availableTags}
                    onTagsChange={handleTagsChange}
                  />
                </Row>
                <FileUploadComponent
                  label="Recommended Size - 1350px X 1080px"
                  name="imageUpload"
                  allowedClasses="image"
                  onChange={handleFileChange}
                />
                <h6 className="card-title">Member Management Section</h6>
                <Row>
                  <SelectComponent
                    label="Group Join Method"
                    name="GroupMethod"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                  <SelectComponent
                    label="Maximum Group Limit"
                    name="Group Limit"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                </Row>
                <h6 className="card-title">Privacy & Permissions Section</h6>
                <Row>
                  <SelectComponent
                    label="Who Can Send Messages"
                    name="SendMessages"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                  <SelectComponent
                    label="Who Can Edit Group Info"
                    name="GroupInfo"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                </Row>
                <Row>
                  <SelectComponent
                    label="Message Auto Deletion"
                    name="AutoDeletion"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                  <SelectComponent
                    label="Allow Message Sharing"
                    name="MessageSharing"
                    options={options}
                    isMulti={false}
                    onChange={setSelectedSingle}
                  />
                </Row>
              </>
            )}

            {selectedType === "option2" && (
               <>
               <h6 className="card-title">Group Details</h6>
               <TextInput
                 label="Group Name"
                 placeholder="Name"
                 required={true}
                 onChange={handleTextInputChange}
               />
               <Aetextarea
                 label="Description"
                 name="Description"
                 placeholder="Description"
                 onChange={handleCaptionChange}
                 isWordCount={true}
                 wordLimit={100}
               />
               <Row>
                 <SelectComponent
                   style={{ marginTop: "35px" }}
                   label="Group Type"
                   name="Group Type"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
                 <TagInput
                   availableTags={availableTags}
                   onTagsChange={handleTagsChange}
                 />
               </Row>
               <FileUploadComponent
                 label="Recommended Size - 1350px X 1080px"
                 name="imageUpload"
                 allowedClasses="image"
                 onChange={handleFileChange}
               />
               <h6 className="card-title">Member Management Section</h6>
               <Row>
                 <SelectComponent
                   label="Group Join Method"
                   name="GroupMethod"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
                 <SelectComponent
                   label="Maximum Group Limit"
                   name="Group Limit"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
               </Row>
               <h6 className="card-title">Privacy & Permissions Section</h6>
               <Row>
                 <SelectComponent
                   label="Who Can Send Messages"
                   name="SendMessages"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
                 <SelectComponent
                   label="Who Can Edit Group Info"
                   name="GroupInfo"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
               </Row>
               <Row>
                 <SelectComponent
                   label="Message Auto Deletion"
                   name="AutoDeletion"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
                 <SelectComponent
                   label="Allow Message Sharing"
                   name="MessageSharing"
                   options={options}
                   isMulti={false}
                   onChange={setSelectedSingle}
                 />
               </Row>
             </>
            )}
          </div>

         
        </Col>

        <div className="form-group row p-3 gap-2 text-center">
          <a type="submit" className="btn col a-btn-primary">
            Save and continue later
          </a>
          <a type="submit" className="btn col-4 a-btn-primary">
            Add
          </a>
        </div>
      </Row>
    </Layout>
  );
};

export default AddNewGroup;
