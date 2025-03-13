import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import subscriptionPlanDataJson from "../assets/json/subscriptionplan.json"; // ✅ Import Subscription Plan Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";

// ✅ Define Subscription Plan Columns
const SubscriptionPlanColumns = [
  { headname: "Plan Name", type: "", dbcol: "col1" }, // ✅ Now text instead of image
  { headname: "Description", type: "", dbcol: "col2" },
  { headname: "Trusted Users", type: "", dbcol: "col3" }
];

const SubscriptionPlan = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(subscriptionPlanDataJson) && subscriptionPlanDataJson.length > 0) {
      setPlanData(subscriptionPlanDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", subscriptionPlanDataJson);
      setPlanData([]); // Prevents `undefined` errors
    }
  }, []);

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader title=" Subscription Plans" backUrl="/dashboard" closeUrl="/" />

      {/* ✅ Action Buttons */}
      <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
        <Button buttonType="add" onClick={() => navigate("/add-plan")} label="Add New" />
      </div>

      {/* ✅ Data Table */}
      {planData.length > 0 ? (
        <DataTable
          id="subscription_plans"
          columns={SubscriptionPlanColumns}
          data={planData}
          defaultView="grid"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        >
          <Row className="metrix-container">
            {planData.map((plan, index) => (
              <ManageCard
                key={index}
                data={plan} 
                titleKey="col1" // ✅ Plan Name (now text instead of image)
                descriptionKey="col2" // ✅ Description
                descriptionLabelKey="Description" // ✅ Dynamic Label
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Subscription Plans Available</p>
      )}
    </Layout>
  );
};

export default SubscriptionPlan;
