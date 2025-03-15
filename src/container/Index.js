import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

import FileUploadComponent from "../components/FileUploadComponent";
import SelectComponent from "../components/SelectComponent";
import Aetextarea from "../components/Aetextarea";
import PhoneInput from "../components/PhoneInput";
import DateInput from "../components/DateInput";
import MetricCard from "../components/MetricCard";
import CheckboxInput from "../components/CheckboxInput";
import RadioInput from "../components/RadioInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PostCard from "../components/PostCard";
import CampaignCard from "../components/CampaignCard";
import TagInput from "../components/TagInput";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import NotificationCard from "../components/NotificationCard";
import Metrix from "../components/Metrix";
import SessionProgressCard from "../components/SessionProgressCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import postData from "../assets/json/posts.json";
import campaignData from "../assets/json/campaigns.json";
import notificationData from "../assets/json/notifications.json";
import tabledata from "../assets/json/tabledata.json";

const Index = () => {
  const [fileData, setFileData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  const tableRef = useRef();

  const columns = [
    { headname: "text", type: "", dbcol: "col1" },
    { headname: "img", type: "img", dbcol: "col2" },
    { headname: "badge", type: "badge", dbcol: "col3" },
    { headname: "tags", type: "tags", dbcol: "col4" },
    { headname: "time", type: "time", dbcol: "col5" },
    { headname: "rating", type: "rating", dbcol: "col6" },
    { headname: "currency", type: "currency", dbcol: "col7" },
    { headname: "country", type: "country", dbcol: "col8" },
  ];

  const [selectedSingle, setSelectedSingle] = useState("");
  const [selectedMulti, setSelectedMulti] = useState([]);

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

  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  const handleOptionChange = (selectedValue) => {
    console.log("Selected:", selectedValue);
  };

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
  }, []);

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(campaignData);
  }, []);

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications(notificationData);
  }, []);
  const sessionData = [
    { label: "70% Mobile", value: 75, colorClass: "orange_progress" },
    { label: "20% Desktop", value: 20, colorClass: "green_progress" },
    { label: "30% Tablet", value: 30, colorClass: "violet_progress" },
    { label: "70% Other", value: 7, colorClass: "blueishgreen_progress" },
  ];

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🚀 Welcome to React!</h1>
        <p>This is your first React App.</p>
      </div>
      <h1>Metrics Dashboard</h1>

      <div className="card-container d-flex gap-4 flex-wrap">
        <Row className="metrix-container">
          <Col xs={4} md={3}>
            <MetricCard 
              title="Total of Col-1"
              operation="total"
              column="col1"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Count for Col-2"
              operation="count"
              column="col2"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Positive Count"
              operation="positiveCount"
              column="col4"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Negative Count"
              operation="negativeCount"
              column="col4"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Mean of Col-1"
              operation="mean"
              column="col1"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Average of Col-5 & Col-6"
              operation="average"
              column="col5,col6"
              tableRef={tableRef}// You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Ratio (Col-1 / Col-2)"
              operation="ratio"
              column="col1,col2"
              tableRef={tableRef}// You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Percentage of Positive (Col-2)"
              operation="percentage"
              column="col2"
              tableRef={tableRef}// You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Count of Values()"
              operation="1000+"
              column="col1"
              tableRef={tableRef} // You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard
              title="Total of Col-1"
              operation="total"
              column="col1"
              tableRef={tableRef}// You can change this to any Bootstrap icon name like "check-circle", "database", etc.
              tooltipText="This shows the total of Col-1 values" // Tooltip for additional context
            />
          </Col>
          <Col xs={4} md={3}>
            <MetricCard title="Engagement Metrics" tooltipText="Overall engagement statistics">
              <div className="col-md-6">
                <Metrix title="Likes" operation="1000+" column="col1" tableRef={tableRef} />
                <Metrix title="Shares" operation="ratio" column="col1" tableRef={tableRef} />
              </div>
              <div className="col-md-6">
                <Metrix title="Comments" operation="ratio" column="col3,col2" tableRef={tableRef} />
                <Metrix title="Reach" operation="total" column="col1" tableRef={tableRef} />
              </div>
            </MetricCard>

          </Col>
        </Row>
      </div>





      <DataTable
        id="table1"
        tableRef={tableRef}
        columns={columns}
        data={tabledata}
        defaultView="table"
        searchable={true}
        filterable={true}
        sortable={true}
        paginated={false}
      />

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Recent Posts</h6>
          <a>see all</a>
        </div>
        <Row className="metrix-container">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Row>
      </div>

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Recent Campaigns</h6>
          <a>see all</a>
        </div>
        <Row className="metrix-container">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </Row>
      </div>

      <div className="form_section">
        <div className="d-flex justify-content-between">
          <h6 className="p-2">Notifications</h6>
          <a href="#">See all</a>
        </div>
        <div className="home_table">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </div>
      </div>

      <Row>
        <Col md={7}>
          <div className="form_section">
            <TextInput
              label="TextInput"
              info="Allows the user to specify packaging standards to ensure consistency in handling and delivery"
              placeholder="Enter Input"
              required={true}
              onChange={handleTextInputChange}
            />
            <Aetextarea
              label="TextArea"
              name="address"
              placeholder="Enter your address..."
            />
            <Aetextarea
              label="TextArea (limited)"
              name="description"
              placeholder="Enter your description..."
              isWordCount={true}
              wordLimit={200}
            />
            <CheckboxInput
              label="CheckboxInput"
              linkText="Know More"
              linkUrl="/"
              onChange={handleAgreementChange}
            />
            <RadioInput
              label="RadioInput"
              name="payment"
              options={[
                { label: "Credit Card", value: "credit" },
                { label: "PayPal", value: "paypal" },
                { label: "Bank Transfer", value: "bank" },
              ]}
              required={true}
              onChange={handleOptionChange}
            />
          </div>

          <div className="form_section">
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
            <FileUploadComponent
              label="Video Upload"
              name="videoUpload"
              allowedClasses="video"
              onChange={handleFileChange}
            />

            <FileUploadComponent
              label="PDF Upload"
              name="pdfUpload"
              allowedClasses="pdf"
              onChange={handleFileChange}
            />
          </div>
        </Col>
        <Col md={5}>
          <div className="form_section">
            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
            />
            <Row>
              <Col>
                <DateInput label="Select Past Date" type="past" />
              </Col>
              <Col>
                <DateInput label="Select Future Date" type="future" />
              </Col>
            </Row>
          </div>
          <div className="form_section">
            <h2>Custom Select Dropdown</h2>
            {/* Single Select */}
            <SelectComponent
              label="Single Select"
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />

            {/* Multi-Select */}
            <SelectComponent
              label="Multi Select"
              name="multiSelect"
              options={options}
              isMulti={true}
              onChange={setSelectedMulti}
            />
          </div>

          <div className="form_section">
            <PhoneInput label="Mobile Number" placeholder="Enter your mobile number" />
            <TextInput label="Email" type="email" placeholder="yourname@company.com" />

            <br /><br />
            <div className="btn-sack">
              <button type="submit" className="a-btn-primary" onClick={() => setModalOpen(true)}>Add</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Modal">
              <form>
                <Row>
                  <Col md >
                    <TextInput
                      label="TextInput"
                      placeholder="Enter Input"
                      required={true}
                      onChange={handleTextInputChange}
                    />
                    <PhoneInput label="Mobile Number" placeholder="Enter your mobile number" />
                  </Col>
                  <Col md >
                    <Aetextarea
                      label="TextArea (limited)"
                      name="description"
                      info="Allows the user to specify packaging standards to ensure consistency in handling and delivery"
                      placeholder="Enter your description..."
                      isWordCount={true}
                      wordLimit={200}
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <div className="btn-sack">
                  <Button
                    label="Save"
                    type="submit"
                  />
                </div>
              </form>
            </Modal>
          </div>

          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="submit" className="btn col-4 a-btn-primary">
              Next
            </a>
          </div>

          <div className="form-group row p-3 gap-2 text-center">
            <Button buttonType="import" label="Import" />
            <Button buttonType="export" label="Export" />
            <Button buttonType="add" label="Add New" />
            <Button label="Save" type="submit" />
            <Button buttonType="edit" label="Edit" />
            <Button label="Bulk Upload" buttonType="bulkuplaod"/>
            <Button buttonType="pause" label="Pause Subscription"/>

            <Button
              buttonType="import"
              label="Import"
              btnStyle="col-4"
              asLink={true}
              href="/"
              type="button"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </Layout>
  );
};

export default Index;
