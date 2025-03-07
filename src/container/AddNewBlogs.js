import React, { useState, useEffect } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddSubsection from "../components/AddSubsection";
import Modal from "../components/Modal";
import TagInput from "../components/TagInput";

const AddNewBlogs = () => {
  const [fileData, setFileData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedSingle, setSelectedSingle] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

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
      <FormHeader title="Add New Blog" backUrl="/blogs" closeUrl="/" />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Blog</h6>
            <TextInput
              label="Title"
              placeholder=""
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              onChange={handleCaptionChange}
            />
            <Aetextarea
              label="Full Article"
              name="Article"
              placeholder="Article"
              onChange={handleCaptionChange}
            />
          </div>

          <AddSubsection Cardtitle="Blog Subsection">
            {/* Pass form components dynamically */}
            <TextInput
              label="Title"
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="Description"
              name="Description"
              placeholder="Description"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={300}
            />
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
          </AddSubsection>

          <div className="form_section">
            <h6 className="card-title">Add Meta Fields</h6>
            <Aetextarea
              label="Meta Title"
              name="Meta Title"
              placeholder="Meta Title"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={60}
            />
            <Aetextarea
              label="Meta Description"
              name="Meta Description"
              placeholder="Meta Description"
              onChange={handleCaptionChange}
              isWordCount={true}
              wordLimit={160}
            />
            <TextInput
              label="Meta URL"
              type="url"
              required={true}
              onChange={handleTextInputChange}
            />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Visibility & Category</h6>
            <SelectComponent
              label="Visibility"
              name="Visibility"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Category"
              name="Select Category"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <br />
            <br />
            <div className="btn-sack">
              <button
                type="submit"
                className="a-btn-primary"
                onClick={() => setModalOpen(true)}
              >
                Add Category
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title="Add New Category"
            >
              <form>
                <TextInput
                  label="Category Name"
                  placeholder="Name"
                  required={true}
                  onChange={handleTextInputChange}
                />

                <TextInput
                  label="Category Value"
                  placeholder="Value"
                  required={true}
                  onChange={handleTextInputChange}
                />
                <br/><br/>
                <div className="btn-sack">
                  <Button label="Save" type="submit" />
                  <Button
                    label="Cancel"
                    type="button"
                    onClick={() => setModalOpen(false)}
                  />
                </div>
              </form>
            </Modal>
          </div>

          <div className="form_section">
            <h6 className="card-title">Main Blog PC Image</h6>
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Main Blog Mobile Image</h6>
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Assign tags</h6>
            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Author</h6>
            <TextInput
              label="Author name"
              placeholder="Author name"
              required={true}
              onChange={handleTextInputChange}
            />
          </div>
          <div className="form-group p-3 gap-2 text-center d-flex justify-content-end">
            <button type="submit" className="a-btn-primary">
              Add
            </button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewBlogs;
