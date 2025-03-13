import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import storeMenuDataJson from "../assets/json/storemenu.json"; // ✅ Import Store Menu Data
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";

// ✅ Declare `StoreMenuColumns` at the top
const StoreMenuColumns = [
  { headname: "Image", type: "img", dbcol: "col1" },
  { headname: "Dish Name", type: "", dbcol: "col2" },
  { headname: "Cuisine Type-", type: "", dbcol: "col3" }
];

const StoreMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(storeMenuDataJson) && storeMenuDataJson.length > 0) {
      setMenuData(storeMenuDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", storeMenuDataJson);
      setMenuData([]); // Prevents `undefined` errors
    }
  }, []);

  // ✅ Find the correct column headname dynamically
  const descriptionColumn = StoreMenuColumns.find((col) => col.dbcol === "col3"); // Find column for Cuisine Type
  const descriptionLabel = descriptionColumn ? descriptionColumn.headname : "Details"; // Default to "Details" if not found

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader title="Store Menu" backUrl="/dashboard" closeUrl="/" />

      {/* ✅ Action Buttons */}
      <div className="form-group row p-3 gap-2 text-center d-flex justify-content-end">
      <Button label="Bulk Upload" buttonType="bulkuplaod"/>
        <Button buttonType="add" onClick={() => navigate("/add-menu-item")} label="Add New Dish" />
      </div>
      <div className="form_section col-md-6">
     <h6> Total Number Of Dishes -   234    </h6>   
      </div>

      {/* ✅ Data Table */}
      {menuData.length > 0 ? (
        <DataTable
          id="store_menu"
          columns={StoreMenuColumns}
          data={menuData}
          defaultView="grid"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        >
          <Row className="metrix-container">
            {menuData.map((menuItem, index) => (
              <ManageCard key={index} data={menuItem} descriptionLabelKey={descriptionLabel} />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Menu Items Available</p>
      )}
    </Layout>
  );
};

export default StoreMenu;
