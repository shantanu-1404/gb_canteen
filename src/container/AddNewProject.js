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

const AddNewProject = () => {
  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };
  const [PostFrequency, setPostFrequency] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);
  const post_frequency = [
    { value: "1", label: "Only once" },
    { value: "2", label: "Daily" },
    { value: "3", label: "Weekly" },
    { value: "4", label: "Monthly" },
  ];
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
      <Row>
        <FormHeader
          title="Add New Project"
          backUrl="/social-media/projects"
          closeUrl="/"
        />
        <Col md={12}>
          <div className="form_section">
            <h6 className="card-title">Project Details</h6>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Project Title"
                  placeholder="Title"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Default Task View"
                  listStyle="col-md-6"
                  name="post_frequency"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <SelectComponent
                  label="Project Privacy"
                  name="post_frequency"
                  listStyle="col-md-6"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
              <div className="col-md-6">
                <SelectComponent
                  label="Number of People"
                  name="post_frequency"
                  listStyle="col-md-6"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </div>
            </div>
            <Row>
              <Col md={6}>
                <Row>
                  <Col>
                    <DateInput label="Start Date" type="past" />
                  </Col>
                  <Col>
                    <DateInput label="End Date" />
                  </Col>
                </Row>
              </Col>
              {/* Second Column for SelectComponent */}
              <Col md={6}>
                <SelectComponent
                  label="Project Lead"
                  listStyle="col-md-6"
                  name="post_frequency"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </Col>
            </Row>

            <Aetextarea
              label="TextArea"
              name="address"
              placeholder="Enter your address..."
            />
            <Row>
              <Col md={6}>
                <SelectComponent
                  label="Client"
                  name="post_frequency"
                  listStyle="col-md-6"
                  options={post_frequency}
                  isMulti={false}
                  onChange={setPostFrequency}
                />
              </Col>
              <Col md={6}>
                <TextInput
                  label="Budget"
                  placeholder="Budget"
                  required={true}
                  onChange={handleTextInputChange}
                  type="number"
                />
              </Col>
            </Row>

            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
            />
          </div>

          <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
            <a type="submit" className="btn col-4 a-btn-primary">
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

export default AddNewProject;
