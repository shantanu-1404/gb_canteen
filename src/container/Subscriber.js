import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import subscribersDataJson from "../assets/json/subscriber.json"; // ✅ Import Subscribers Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import FileUploadComponent from "../components/FileUploadComponent";

const Subscribers = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null); // ✅ Stores the selected subscriber

  // ✅ Handle File Upload Change
  const handleFileChange = (file, isValid) => {
    console.log("📂 Selected file:", file);
    console.log("✅ Is valid:", isValid);
    setFileData(file);
  };

  // ✅ Handle Form Submission for File Upload
  const handleFileUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileData) {
      alert("⚠️ Please select a file to upload.");
      return;
    }
    console.log("✅ File uploaded:", fileData);
    setModalOpen(false);
  };

  // ✅ Open Modal & Set Selected Subscriber Data
  const handleCardClick = (subscriber) => {
    console.log("🖱️ Clicked on Subscriber:", subscriber); // ✅ Log clicked data
    if (!subscriber) {
      console.error("❌ No subscriber data received");
      return;
    }
    setSelectedSubscriber(subscriber);
    setModalOpen(true);
  };

  // ✅ Ensure JSON Data is Loaded Before Setting State
  useEffect(() => {
    console.log("📥 Loading subscriber data...");
    if (Array.isArray(subscribersDataJson) && subscribersDataJson.length > 0) {
      console.log("✅ Loaded Subscriber Data:", subscribersDataJson);
      setSubscribersData(subscribersDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", subscribersDataJson);
      setSubscribersData([]); // ✅ Prevents `undefined` errors
    }
  }, []);

  // ✅ Declare Columns Before Usage
  const SubscriberColumns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Name", type: "", dbcol: "col2" },
    { headname: "Plan", type: "", dbcol: "col3" },
  ];

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader title="Subscribers" backUrl="/dashboard" closeUrl="/" />

      {/* ✅ Data Table */}
      {subscribersData.length > 0 ? (
        <DataTable
          id="subscribers"
          columns={SubscriberColumns}
          data={subscribersData}
          defaultView="grid"
          searchable={true} // ✅ Ensure search is working
          filterable={true} // ✅ Ensure filters work
          sortable={true} // ✅ Ensure sorting works
          paginated={true} // ✅ Enable pagination
        >
          <Row className="metrix-container">
            {subscribersData.map((subscriber, index) => (
              <ManageCard
                key={index}
                data={subscriber}
                titleKey="col2" // ✅ Name
                imageKey="col1" // ✅ Profile Image
                descriptionKey="col3" // ✅ Plan
                descriptionLabelKey="Plan Type" // ✅ Dynamic Label
                onClick={() => {
                  console.log(`🖱️ ManageCard Clicked: ${subscriber.col2}`); // ✅ Log Click
                  handleCardClick(subscriber);
                }}
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Subscribers Available</p>
      )}

      {/* ✅ Modal Opens When Clicking a ManageCard */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscriber Details"
      >
        {selectedSubscriber ? (
          <div>
            <h5>👤 {selectedSubscriber.col2}</h5>
            <p>
              <strong>Plan:</strong> {selectedSubscriber.col3}
            </p>
            <p>
              <strong>More Info:</strong> Additional subscriber details.
            </p>
          </div>
        ) : (
          <p>Loading subscriber details...</p>
        )}

        <form >
        <br />
          <br />
          <div className="btn-sack">
          <Button buttonType="pause" label="Pause Subscription"/>
          <Button buttonType="uncheck" label="Cancel Subscription" btnStyle="red" />
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default Subscribers;
