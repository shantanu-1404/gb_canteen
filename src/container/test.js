

import React, { useState, useEffect } from "react";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data

const App = () => {
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
    total: 10, // ✅ Set default total value
    accept: 0, // ✅ Default accept value
    cancel: 10, // ✅ Default cancel value (total - accept)
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

  // ✅ Update Accept & Cancel
  const updateAcceptReject = (productId, newAcceptValue) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === productId
          ? {
              ...product,
              accept: Math.max(
                0,
                Math.min(newAcceptValue, product.total || 10)
              ), // Prevent exceeding total
              cancel:
                (product.total || 10) -
                Math.max(0, Math.min(newAcceptValue, product.total || 10)), // Auto-calculate Cancel
            }
          : product
      )
    );
  };
  return (
    <div className="form_section container">
      <h2 className="text-xl font-bold">Select Products</h2>

      {/* ✅ Search and Add Button */}
      <div className="row">
        <div className="col p-3">
          <a className="search-input-wrapper" onClick={openModal}>
            <div className="ae-search-container">
              <i className="fa-solid fa-magnifying-glass"></i> Search and add to
              your order instantly...
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
                  { headname: "Quantity", dbcol: "quantity", type: "quantity" },
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
              { headname: "Quantity", dbcol: "quantity", type: "quantity" },
              { headname: "Accept", dbcol: "accept", type: "accept" }, // ✅ Separate Accept Column
              { headname: "Cancel", dbcol: "cancel", type: "cancel" }, // ✅ Separate Cancel Column
              { headname: "Progress", dbcol: "progress", type: "ar-progress" }, // ✅ Separate Progress Column
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
  );
};

export default App;