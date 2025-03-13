import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import storeDataJson from "../assets/json/storeprofiledata.json"; // ✅ Import Store Profile Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";

// ✅ Declare `ManageStoreColumns` at the top
const ManageStoreColumns = [
  { headname: "Image", type: "img", dbcol: "col1" },
  { headname: "Store Name", type: "", dbcol: "col2" },
  { headname: "Description", type: "", dbcol: "col3" },
];

const StoreProfiles = () => {
  const [storeData, setStoreData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(storeDataJson) && storeDataJson.length > 0) {
      setStoreData(storeDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", storeDataJson);
      setStoreData([]); // Prevents `undefined` errors
    }
  }, []);

  // ✅ Find the correct column headname dynamically
  const descriptionColumn = ManageStoreColumns.find((col) => col.dbcol === "col3"); // Find column for Category
  const descriptionLabel = descriptionColumn ? descriptionColumn.headname : "Details"; // Default to "Details" if not found

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader title="Store Profiles" backUrl="/dashboard" closeUrl="/" />

    
      {/* ✅ Data Table */}
      {storeData.length > 0 ? (
        <DataTable
          id="store_profiles"
          columns={ManageStoreColumns}
          data={storeData}
          defaultView="grid"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        >
          <Row className="metrix-container">
            {storeData.map((store, index) => (
              <ManageCard key={index} data={store} descriptionLabelKey={descriptionLabel} />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Store Profiles Available</p>
      )}
    </Layout>
  );
};

export default StoreProfiles;
