import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import locationDataJson from "../assets/json/locationdata.json"; // ✅ Import Location Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";

// ✅ Declare `ManageLocationColumns` at the top
const ManageLocationColumns = [
  { headname: "Image", type: "img", dbcol: "col1" },
  { headname: "Region", type: "", dbcol: "col2" },
  { headname: "Postal Code", type: "", dbcol: "col3" },
];

const ManageLocation = () => {
  const [locationData, setLocationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(locationDataJson) && locationDataJson.length > 0) {
      setLocationData(locationDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", locationDataJson);
    }
  }, []);

  // ✅ Find the correct column headname dynamically
  const descriptionColumn = ManageLocationColumns.find(col => col.dbcol === "col3"); // Find column for Postal Code
  const descriptionLabel = descriptionColumn ? descriptionColumn.headname : "Details"; // Default to "Details" if not found

  return (
    <Layout>
      <FormHeader
        title="Manage Locations"
        backUrl="/cuisine_location"
        closeUrl="/"
      />
      <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
      <Button label="Bulk Upload" buttonType="bulkuplaod"/>
        <Button
          buttonType="add"
          onClick={() => navigate("/add-location")}
          label="Add New "
        />
       
      </div>

      {locationData.length > 0 ? (
        <DataTable
          id="location"
          columns={ManageLocationColumns}
          data={locationData}
          defaultView="grid"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        >
          <Row className="metrix-container">
            {locationData.map((location, index) => (
              <ManageCard
                key={index}
                data={location}
                descriptionLabelKey={descriptionLabel} // ✅ Use the dynamically found label
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Location Data Available</p>
      )}
    </Layout>
  );
};

export default ManageLocation;
