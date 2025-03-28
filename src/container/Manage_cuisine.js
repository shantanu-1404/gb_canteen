import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import ManageCard from "../components/ManageCard.js";
import Row from "react-bootstrap/Row";
import cuisineDataJson from "../assets/json/Cuisinesdata.json";
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import FileUploadComponent from "../components/FileUploadComponent";

const ManageCuisine = () => {
  const [cuisineData, setCuisineData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileData, setFileData] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (file, isValid) => {
    console.log("Selected file:", file);
    console.log("Is valid:", isValid);
    setFileData(file);
  };

  // ✅ Ensure JSON Data is Loaded Before Setting State
  useEffect(() => {
    if (Array.isArray(cuisineDataJson) && cuisineDataJson.length > 0) {
      setCuisineData(cuisineDataJson);
    } else {
      console.error("❌ Invalid or Empty JSON Data:", cuisineDataJson);
      setCuisineData([]); // ✅ Prevents `undefined` errors
    }
  }, []);

  // ✅ Declare Columns Before Usage
  const ManageCuisineColumns = [
    { headname: "Image", type: "img", dbcol: "col1" },
    { headname: "Cuisine Name", type: "", dbcol: "col2" },
    { headname: "Description", type: "", dbcol: "col3" },
  ];
  // ✅ Find the correct column headname dynamically
  const descriptionColumn = ManageCuisineColumns.find(
    (col) => col.dbcol === "col3"
  ); // Find column for Postal Code
  const descriptionLabel = descriptionColumn
    ? descriptionColumn.headname
    : "Details"; // Default to "Details" if not found

  return (
    <Layout>
      {/* ✅ Page Header */}
      <FormHeader
        title="Manage Cuisine"
        backUrl="/cuisine_location"
        closeUrl="/"
      />

      {/* ✅ Action Buttons */}
      <div className="form-group row p-3 gap-2  d-flex justify-content-end">
        <Button
          label="Bulk Upload"
          buttonType="bulkuplaod"
          onClick={() => setModalOpen(true)}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Bulk Upload"
        >
          <form>
            <FileUploadComponent
              label="Recommended Size - 1350px X 1080px"
              name="imageUpload"
              allowedClasses="image"
              onChange={handleFileChange}
            />
            <br />
            <br />
            <div className="btn-sack">
              <Button
                label="Cancel"
                type="button"
                onClick={() => setModalOpen(false)}
              />
              <Button label="Upload" type="submit" />
            </div>
          </form>
        </Modal>

        <Button
          buttonType="add"
          onClick={() => navigate("/add-cuisine")}
          label="Add New "
        />
      </div>

      {/* ✅ Data Table */}
      {cuisineData.length > 0 ? (
        <DataTable
          id="cuisine"
          columns={ManageCuisineColumns}
          data={cuisineData}
          defaultView="grid"
          searchable={true}
          filterable={true}
          sortable={true}
          paginated={true}
        >
          <Row className="metrix-container">
            {cuisineData.map((cuisine, index) => (
              <ManageCard
                key={index}
                data={cuisine}
                descriptionLabelKey={descriptionLabel}
              />
            ))}
          </Row>
        </DataTable>
      ) : (
        <p className="text-center">No Cuisine Data Available</p>
      )}
    </Layout>
  );
};

export default ManageCuisine;
