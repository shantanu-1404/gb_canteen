import React, { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TabPanel from "../components/TabsComponent"; // ✅ Import TabPanel Component
import DataTable from "../components/DataTable"; // ✅ Import DataTable Component
import Layout from "./layout"; // ✅ Import Layout
import Button from "../components/Button"; // ✅ Import Button Component
import Modal from "../components/Modal"; // ✅ Import Modal Component
import shippingruledata from "../assets/json/Shippingrule.json"; // ✅ Shipping Rule Data
import boxruledata from "../assets/json/Boxrule.json"; // ✅ Box Rule Data
import TextInput from "../components/TextInput";
import SelectTable from "../components/SelectTable";
import productsData from "../assets/json/product.json";
import InputSwitch from "../components/InputSwitch";
import SelectComponent from "../components/SelectComponent";
import AddConditionButton from "../components/AddConditionBtn";

// ✅ Shipping Rules Table Columns
const shipping_rules = [
  { headname: "STATUS", type: "badge", dbcol: "col1" },
  { headname: "Rule Name", type: "", dbcol: "col2" },
  { headname: "Last Modification", type: "time", dbcol: "col3" },
  
];

// ✅ Box Rules Table Columns
const box_rule = [
  { headname: "Box", type: "", dbcol: "col1" },
  { headname: "Dimensions (L x W x H)", type: "", dbcol: "col2" },
  { headname: "Last Modification", type: "time", dbcol: "col3" },
];

const ShipmentBoxRule = () => {
  const tableRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isShipmentRuleModalOpen, setShipmentRuleModalOpen] = useState(false);
  const [isBoxRuleModalOpen, setBoxRuleModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [setSelectedSingle] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // ✅ Format Product Data for Selection
  const formattedProducts = productsData.map((product, index) => ({
    id: index + 1,
    imageUrl: product.col1,
    name: product.col2,
    price: parseFloat(product.col3),
    category: product.col4,
    quantity: quantities[index + 1] || 1,
    isChecked: selectedProducts.some((p) => p.id === index + 1),
  }));

  // ✅ Handle Product Selection
  const handleSelectionChange = (updatedSelection) => {
    setSelectedProducts((prevSelected) => {
      const newSelection = updatedSelection.map((item) => ({
        ...item,
        quantity: quantities[item.id] || item.quantity || 1,
      }));
      return newSelection;
    });

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

  // ✅ Handle Quantity Update
  const updateQuantity = (productId, newQuantity) => {
    const updatedQuantity = Math.max(1, parseInt(newQuantity) || 1);
    setQuantities((prev) => ({ ...prev, [productId]: updatedQuantity }));

    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === productId
          ? { ...product, quantity: updatedQuantity }
          : product
      )
    );
  };

  const propertyOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "category", label: "Category" },
    { value: "stock", label: "Stock Level" },
    { value: "rating", label: "Customer Rating" },
    { value: "weight", label: "Weight" },
    { value: "brand", label: "Brand" },
    { value: "sku", label: "SKU" },
    { value: "date_added", label: "Date Added" },
    { value: "discount", label: "Discount" },
  ];
  const operatorOptions = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "greater_than_or_equal", label: "Greater Than or Equal" },
    { value: "less_than_or_equal", label: "Less Than or Equal" },
    { value: "contains", label: "Contains" },
    { value: "not_contains", label: "Does Not Contain" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" },
  ];

  // ✅ Define Tabs
  const tabs = [
    {
      label: "Shipping Rules",
      content: (
        <DataTable
          id="shipping_rules_table"
          tableRef={tableRef}
          columns={shipping_rules}
          data={shippingruledata}
          defaultView="table"
          searchable
          filterable
          sortable
          paginated={false}
          grid
        />
      ),
    },
    {
      label: "Box Rules",
      content: (
        <DataTable
          id="box_rules_table"
          tableRef={tableRef}
          columns={box_rule}
          data={boxruledata}
          defaultView="table"
          searchable
          filterable
          sortable
          paginated={false}
          grid
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="shipment-box-rule-container">
        {/* ✅ Buttons for Each Tab */}
        <div className="button-container d-flex justify-content-end">
          {activeTab === 0 && (
            <Button
              buttonType="add"
              label="Create Shipment Rule"
              onClick={() => setShipmentRuleModalOpen(true)}
            />
          )}
          {activeTab === 1 && (
            <Button
              buttonType="add"
              label="Add New"
              onClick={() => setBoxRuleModalOpen(true)}
            />
          )}
        </div>

        {/* ✅ Modal for Shipping Rules */}
        <Modal
          isOpen={isShipmentRuleModalOpen}
          onClose={() => setShipmentRuleModalOpen(false)}
        >
          <TextInput label="Name for the Rule" placeholder="Name" required />
          <p>
            <h6> Conditions</h6>
          </p>
          <InputSwitch
            label="Satisfy all the conditions of this rule"
            checked={isSwitchOn}
            onChange={(newState) => setSwitchOn(newState)}
          />

          <Row>
            <h5>If</h5>
            <SelectComponent
              name="Select a Property"
              listStyle="col-md-6"
              options={propertyOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              name="Select an Operator"
              listStyle="col-md-6"
              options={operatorOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </Row>

          <Row>
            <h5>Then</h5>
            <Col md={6}>
              <SelectComponent
                name="Select a Property"
                listStyle="col-md-6"
                options={propertyOptions}
                isMulti={false}
                onChange={setSelectedSingle}
              />
            </Col>
          </Row>
          <AddConditionButton label="Add Condition" type="submit" />
          <br />
          <br />
          <div className="btn-sack">
            <Button label="Save Rule" type="submit" />
          </div>
        </Modal>

        {/* ✅ Modal for Box Rules */}
        <Modal
          isOpen={isBoxRuleModalOpen}
          onClose={() => setBoxRuleModalOpen(false)}
          title="Add New Box Rule"
        >
          <Row>
            <Col md={8}>
              <TextInput
                label="Name for the Rule"
                placeholder="Name"
                required
              />
            </Col>
            <Col md={4}>
              <TextInput
                label="Items"
                placeholder="Items"
                required
                type="number"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Row>
                <TextInput
                  label="Length of Box"
                  placeholder="cm"
                  required
                  type="number"
                />
                <TextInput
                  label="Width of Box"
                  placeholder="cm"
                  required
                  type="number"
                />
              </Row>
            </Col>
            <Col md={4}>
              <TextInput
                label="Height of Box"
                placeholder="cm"
                required
                type="number"
              />
            </Col>
          </Row>
          {/* ✅ Product Selection */}
          <div className="form_section">
            <h6 className="card-title">Products</h6>
            <div className="row">
              <div className="col p-3">
                <a
                  className="search-input-wrapper"
                  onClick={() => setProductModalOpen(true)}
                >
                  <div className="ae-search-container">
                    <i className="bi bi-search"></i> Search and add to your
                    order instantly...
                  </div>
                </a>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="btn-sack">
            <Button label="Save Rule" type="submit" />
          </div>
        </Modal>
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
              { headname: "Quantity", dbcol: "quantity", type: "quantity" },
            ]}
            data={formattedProducts}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            onSelectionChange={handleSelectionChange}
            updateQuantity={updateQuantity}
            quantities={quantities}
          />
        </Modal>
        {/* ✅ Tab Panel */}
        <TabPanel tabs={tabs} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default ShipmentBoxRule;
