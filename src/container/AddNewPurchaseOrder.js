import React, { useState } from "react";
import Layout from "./layout";

import FormHeader from "../components/FormHeader";
import SelectComponent from "../components/SelectComponent";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateInput from "../components/DateInput";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data

const AddNewPurchaseOrder = () => {
  const [selectedSingle, setSelectedSingle] = useState("");

  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ Stores selected products
  const [quantities, setQuantities] = useState({}); // ✅ Tracks product quantities
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ✅ Ensure Selected Items Stay Checked in the Modal
  const formattedProducts = productsData.map((product, index) => ({
    id: index + 1,
    imageUrl: product.col1,
    name: product.col2,
    price: parseFloat(product.col3),
    category: product.col4,
    quantity: quantities[index + 1] || 1,
    isChecked: selectedProducts.some((p) => p.id === index + 1), // ✅ Ensure previously selected items stay checked
  }));

  // ✅ Handle Selection Change
  const handleSelectionChange = (updatedSelection) => {
    setSelectedProducts((prevSelected) => {
      const newSelection = updatedSelection.map((item) => ({
        ...item,
        quantity: quantities[item.id] || item.quantity || 1, // ✅ Preserve quantity
      }));

      return newSelection;
    });

    // ✅ Sync quantity tracking
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      updatedSelection.forEach((item) => {
        if (!updatedQuantities[item.id]) {
          updatedQuantities[item.id] = item.quantity || 1;
        }
      });
      return updatedQuantities;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedQuantity = Math.max(1, parseInt(newQuantity) || 1);

    // ✅ Update quantity in state
    setQuantities((prev) => ({
      ...prev,
      [productId]: updatedQuantity,
    }));

    // ✅ Update quantity in selected products (both SelectTable & Table)
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === productId
          ? { ...product, quantity: updatedQuantity }
          : product
      )
    );
  };

  return (
    <Layout>
      <FormHeader
        title="Add New Purchase Order"
        backUrl="/products/purchase_order"
        closeUrl="/"
      />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Shipment Details</h6>
          </div>
          <div className="form_section">
          <h6 className="card-title">Select Products</h6>

            {/* ✅ Search and Add Button */}
            <div className="row">
              <div className="col p-3">
                <a className="search-input-wrapper" onClick={openModal}>
                  <div className="ae-search-container">
                    <i className="fa-solid fa-magnifying-glass"></i> Search and
                    add to your order instantly...
                  </div>
                </a>
              </div>
            </div>

            {/* ✅ Product Selection Modal */}
            {isModalOpen && (
              <div className="custom-modal active">
                <div className="modal-overlay" onClick={closeModal}></div>
                <div className="modal-container">
                  <div className="modal-content form_section">
                    <h6>Add Items</h6>

                    <SelectTable
                      id="productSelection"
                      columns={[
                        { headname: "Image", dbcol: "imageUrl", type: "img" },
                        { headname: "Product", dbcol: "name" },
                        { headname: "Price", dbcol: "price", type: "currency" },
                        { headname: "Category", dbcol: "category" },
                        {
                          headname: "Quantity",
                          dbcol: "quantity",
                          type: "quantity",
                        },
                      ]}
                      data={formattedProducts}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                      onSelectionChange={handleSelectionChange}
                      updateQuantity={updateQuantity}
                      quantities={quantities} // ✅ Ensure same quantity data
                    />

                    <br />
                    <div className="btn-sack">
                      <button className="a-btn-primary" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Display Selected Products in Table */}
            {selectedProducts.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-bold">Selected Products</h4>
                <Table
                  id="selectedProductsTable"
                  data={selectedProducts}
                  columns={[
                    { headname: "Image", dbcol: "imageUrl", type: "img" },
                    { headname: "Product", dbcol: "name" },
                    { headname: "Price", dbcol: "price", type: "currency" },
                    { headname: "Category", dbcol: "category" },
                    {
                      headname: "Quantity",
                      dbcol: "quantity",
                      type: "quantity",
                    },
                  ]}
                  filteredData={selectedProducts}
                  setFilteredData={setSelectedProducts}
                  updateQuantity={updateQuantity}
                  quantities={quantities} // ✅ Ensure same quantity data
                  paginated={false}
                  showCheckbox={false}
                />
              </div>
            )}
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">More Details</h6>
            <SelectComponent
              label="Initial Value"
              name="Initial Value"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Status"
              name="Status"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <TextInput
              label="Security Features (Security Code)"
              placeholder="Code"
              required={true}
              onChange={handleTextInputChange}
            />
          </div>

          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="submit" className="btn col-4 a-btn-primary">
              Next
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewPurchaseOrder;
