import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import subscriptionPlanDataJson from "../assets/json/subscriptionplan.json"; // ✅ Import Subscription Plan Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

// ✅ Define Subscription Plan Columns
const SubscriptionPlanColumns = [
  { headname: "Plan Name", type: "", dbcol: "col1" }, // ✅ Now text instead of image
  { headname: "Description", type: "", dbcol: "col2" },
  { headname: "Trusted Users", type: "", dbcol: "col3" },
];

const SubscriptionPlan = () => {
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // ✅ Ensure JSON Data is Loaded Before Setting State
  useEffect(() => {
    console.log("📥 Loading subscription plan data...");
    if (
      Array.isArray(subscriptionPlanDataJson) &&
      subscriptionPlanDataJson.length > 0
    ) {
      console.log(
        "✅ Loaded Subscription Plan Data:",
        subscriptionPlanDataJson
      );
      setPlanData(subscriptionPlanDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", subscriptionPlanDataJson);
      setPlanData([]); // Prevents `undefined` errors
    }
  }, []);

  // ✅ Open Modal & Set Selected Plan Data
  const handleCardClick = (plan) => {
    console.log("🖱️ Clicked on Subscription Plan:", plan);
    if (!plan) {
      console.error("❌ No plan data received");
      return;
    }
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader
        title="Subscription Plans"
        backUrl="/subscription"
        closeUrl="/"
      />
      {/* ✅ Action Buttons */}
      <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
        <Button
          buttonType="add"
          onClick={() => navigate("/add-plan")}
          label="Add New"
        />
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
                titleKey="col1" // ✅ Plan Name
                descriptionKey="col2" // ✅ Description
                descriptionLabelKey="Description" // ✅ Dynamic Label
                onClick={() => {
                  console.log(`🖱️ Card Clicked! Plan: ${plan.col1}`);
                  handleCardClick(plan);
                }} // ✅ Logs Click & Opens Modal
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Subscription Plans Available</p>
      )}

      {/* ✅ Modal Opens When Clicking a ManageCard */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscription Plan Details"
      >
        {selectedPlan ? (
          <div>
            <h5>📜 {selectedPlan.col1}</h5>
            <p>
              <strong>Description:</strong> {selectedPlan.col2}
            </p>
            <p>
              <strong>Trusted Users:</strong> {selectedPlan.col3}
            </p>
          </div>
        ) : (
          <p>Loading subscription plan details...</p>
        )}

        <form>
          <br />
          <br />
          <div className="btn-sack">
            <Button buttonType="pause" label="Pause Subscription" />
            <Button
              buttonType="uncheck"
              label="Cancel Subscription"
              btnStyle="red"
            />
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default SubscriptionPlan;
