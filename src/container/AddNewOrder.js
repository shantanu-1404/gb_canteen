import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import FormHeader from "../components/FormHeader";
import TextInput from "../components/TextInput";
import TagInput from "../components/TagInput";
import Aetextarea from "../components/Aetextarea";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import Modal from "../components/Modal";
import customersData from "../assets/json/customer.json";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data
import CustomPopover from "../components/Pop-up";
import CheckboxInput from "../components/CheckboxInput";

const AddNewOrder = () => {
  const [setSelectedSingle] = useState("");


  const handleTextInputChange = (value) => {
    console.log("TextInput:", value);
  };

  const availableTags = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Angular",
    "Vue",
    "Python",
    "Django",
    "Flask",
  ];

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ Stores selected products
  const [quantities, setQuantities] = useState({}); // ✅ Tracks product quantities
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

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

  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

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

  useEffect(() => {
    setCustomers(customersData); // Load customers from JSON
  }, []);

  // Handle customer selection
  const handleCustomerSelectionChange = (selectedRows) => {
    setSelectedCustomers(selectedRows); // Store multiple customers
  };

  return (
    <Layout>
      <FormHeader
        title="Add New Order"
        backUrl="/products/purchase_order"
        closeUrl="/"
      />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Select Customer</h6>

            {/* ✅ Search and Add Button */}
            <div className="row">
              <div className="col p-3">
                <a
                  className="search-input-wrapper"
                  onClick={() => setCustomerModalOpen(true)}
                >
                  <div className="ae-search-container">
                    <i class="bi bi-search"></i> Search and add to your order
                    instantly...
                  </div>
                </a>
              </div>
            </div>

            {/* ✅ Product Selection Modal */}
            <Modal
              isOpen={isCustomerModalOpen}
              onClose={() => setCustomerModalOpen(false)}
            >
              {/* ✅ Header with Button in Same Row */}
              <div className="modal-header-with-button">
                <h6 className="modal-title">Select Customer</h6>
                <Button buttonType="add" label="Create New" />
              </div>

              {/* ✅ Customer Selection Table */}
              <SelectTable
                id="productSelection"
                columns={[
                  { headname: "", dbcol: "imageUrl", type: "img" },
                  { headname: "", dbcol: "name" },
                  { headname: "", dbcol: "billing_address" },
                  { headname: "", dbcol: "contact" },
                  { headname: "", dbcol: "email" },
                ]}
                data={customers}
                selectedProducts={selectedCustomers}
                setSelectedProducts={setSelectedCustomers}
                onSelectionChange={handleCustomerSelectionChange}
                updateQuantity={updateQuantity}
                quantities={quantities} // ✅ Ensure same quantity data
              />

              <br />
              <div className="btn-sack">
                <button
                  className="a-btn-primary"
                  onClick={() => setCustomerModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </Modal>

            {/* ✅ Display Selected Products in Table */}
            {selectedCustomers.length > 0 && (
              <>
                {selectedCustomers.map((customer) => (
                  <div className="row mt-4">
                    <div className="col-3">
                      <img
                        src={customer.imageUrl}
                        className="customer_img"
                        alt="Customer"
                      />
                    </div>
                    <div className="col-9 row">
                      <h3>{customer.name}</h3>
                      <div className="col-6">
                        <div className="form-group">
                          <label className="form-label">Contact Number</label>
                          {customer.contact}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          {customer.email}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label className="form-label">Shipping Address</label>
                          {customer.shipping_address}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Billing Address</label>
                          {customer.billing_address}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="form_section">
            <h6 className="card-title">Select Products</h6>

            {/* ✅ Search and Add Button */}
            <div className="row">
              <div className="col p-3">
                <a
                  className="search-input-wrapper"
                  onClick={() => setProductModalOpen(true)}
                >
                  <div className="ae-search-container">
                    <i class="bi bi-search"></i> Search and add to your order
                    instantly...
                  </div>
                </a>
              </div>
            </div>

            {/* ✅ Product Selection Modal */}
            <Modal
              isOpen={isProductModalOpen}
              onClose={() => setProductModalOpen(false)}
              title="Add Items"
            >
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
                <button
                  className="a-btn-primary"
                  onClick={() => setProductModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </Modal>

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
          <div className="form_section">
            <h6 className="card-title">Order Payment Overview</h6>
            <Row>
              <p className="col">Order Subtotal</p>
              <p className="col text-end"> ₹0.00</p>
            </Row>
            <Row>
              <label className="col">
                <a>Apply Discounts -</a>
              </label>
              <p className="col text-end"> ₹0.00</p>
            </Row>
            <Row>
              <label className="col">
                <a>Shipping Costs -</a>
              </label>
              <p className="col text-end"> ₹0.00</p>
            </Row>
            <Row className="align-items-center">
              <Col>
                <CustomPopover
                  className="form_section"
                  title="Tax Are Automatically Calculated"
                  triggerText="Tax Estimate (10%)"
                >
                  <CheckboxInput
                    label="Charge Tax"
                    onChange={handleAgreementChange}
                  />
                  <div className="form-group row p-3 gap-2 text-center">
                    <a type="submit" className="btn col-4 a-btn-primary">
                      Apply
                    </a>
                  </div>
                </CustomPopover>
              </Col>

              {/* ✅ Amount Display */}
              <Col className="text-end">
                <p>₹0.00</p>
              </Col>
            </Row>

            <Row className="mt-2">
              <strong className="col">Total Payable Amount -</strong>
              <strong className="col text-end"> ₹0.00</strong>
            </Row>
            <small>
              Add your favourite items to the cart and review your order
              summary.
            </small>
            <CheckboxInput
              label="Payment Due Later"
              onChange={handleAgreementChange}
            />

            <br />
            <br />
            <div className="btn-sack">
              <Button label="Collect Payment" />
              <Button label="Send Invoice" />
            </div>
          </div>
          <div className="form_section">
            <h6 className="card-title">Payment Details</h6>
            <Row>
              <Col md>
                <SelectComponent
                  label="Payment Mode"
                  name="singleSelect"
                  options={options}
                  isMulti={false}
                  onChange={setSelectedSingle}
                />
              </Col>
              <Col md={4}>
                <TextInput
                  label="Ref No"
                  placeholder="Number"
                  required={true}
                  onChange={handleTextInputChange}
                />
              </Col>
            </Row>
            <SelectComponent
              label="Payment Status"
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <SelectComponent
              label="Choose Your Market"
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Order Notes & Custom Requests</h6>
            <Aetextarea
              label=""
              name="description"
              placeholder="Custom Note ..."
              isWordCount={true}
              wordLimit={200}
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Assign Tags</h6>
            <TagInput availableTags={availableTags} />
          </div>
          <div className="form_section">
            <h6 className="card-title">Add Gift Notes</h6>
            <Aetextarea
              label=""
              name="description"
              placeholder="Happy Birthday....!!!!"
              isWordCount={true}
              wordLimit={300}
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewOrder;
