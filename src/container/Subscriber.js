import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import subscribersDataJson from "../assets/json/subscriber.json"; // ✅ Import Subscribers Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";

const Subscribers = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const navigate = useNavigate();

  // ✅ Ensure JSON Data is Loaded Before Setting State
  useEffect(() => {
    if (Array.isArray(subscribersDataJson) && subscribersDataJson.length > 0) {
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
      <FormHeader
        title=" Subscribers"
        backUrl="/dashboard"
        closeUrl="/"
      />

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
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Subscribers Available</p>
      )}
    </Layout>
  );
};

export default Subscribers;
