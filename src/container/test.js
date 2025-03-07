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

  // ✅ Map JSON Data to Expected Format
  const formattedProducts = productsData.map((product, index) => ({
    id: index + 1, // ✅ Assign unique ID
    imageUrl: product.col1, // ✅ Image
    name: product.col2, // ✅ Product Name
    price: parseFloat(product.col3), // ✅ Convert price to number
    category: product.col4, // ✅ Category
    quantity: quantities[index + 1] || 1, // ✅ Ensure quantity tracking
  }));

  // ✅ Update Quantity for Selected Products
  const updateQuantity = (productId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(newQuantity) || 1), // ✅ Ensure min quantity of 1
    }));

    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, parseInt(newQuantity) || 1) }
          : product
      )
    );
  };

  // ✅ Handle Selection Change & Keep Checked Items
  const handleSelectionChange = (updatedSelection) => {
    const updatedProducts = updatedSelection.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      name: item.name,
      price: item.price,
      category: item.category,
      quantity: quantities[item.id] || item.quantity || 1,
    }));

    setSelectedProducts(updatedProducts);
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

              {/* ✅ SelectTable Component - Handles Selection & Generates JSON */}
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
                selectedProducts={selectedProducts} // ✅ Pass selectedProducts
                setSelectedProducts={setSelectedProducts} // ✅ Pass setSelectedProducts
                onSelectionChange={handleSelectionChange}
                updateQuantity={updateQuantity}
              />

              <br />
              <br />
              {/* ✅ Save & Close Buttons */}
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
            ]}
            filteredData={selectedProducts}
            setFilteredData={setSelectedProducts}
            updateQuantity={updateQuantity}
            paginated={false}
            showCheckbox={false}
          />
        </div>
      )}
    </div>
  );
};

export default App;
