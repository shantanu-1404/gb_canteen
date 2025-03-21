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
import ColorCard from "../components/ColorCards"; // ✅ Import ColorCard Component
import { Colors } from "chart.js";

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

const CarrierContract = () => {
  const tableRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSwitchOn, setSwitchOn] = useState(false);

  const [isShipmentRuleModalOpen, setShipmentRuleModalOpen] = useState(false);
  const [isBoxRuleModalOpen, setBoxRuleModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [setSelectedSingle] = useState("");

  // ✅ Selected Products State
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
      label: "Carrier Selection",
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
      label: "My Contracts",
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

      <div className="form_section">
        <strong>Why is it important to personalize my pricing?</strong>
        <Row>
          <ColorCard
            style={{
              backgroundColor: "#EDFEFF",
              borderRadius: "12px 100px 12px 12px", // top-left, top-right, bottom-right, bottom-left
              padding: "20px",
              width: "300px",
              textAlign: "center",
            }}
            image="https://s3-alpha-sig.figma.com/img/e127/01b7/6cf39eeea56b2033f5cbc0edae70c6c6?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fv~4X8I~GbLf1s6JJEL8ro3T-my91JwNgEkO2F4gLCEGnFlL8bvXJLtBHVpwhFJ2Ubrkji3zlDjMvx5iqZDPwbGwPvGroIalPqRSGOdnR9k3B~cdONrCwUWodOV44VnPCUyimUt0V6I1A7qpFtiMvYs8sWSzGDuX-XfnQd13ceQVQvHOWxL~7rseOSrm5IeeSDDqotOGzEaxXNP4jxFiUMwuy3QqFr18XHxyMn0Nmn2GxCA5ksjScv2E3MSeR5ZCM1BgpUN5U2RxqCHXT745as~8xpq1PNjLMBsPQbFT49-D7F38H49JAnNZK4i6z1IvBet8sej7FR9oQYAJklbzWg__"
            title="Check your specific contract pricing."
          />

          <ColorCard
           style={{
            backgroundColor: "#F4FFED",
            borderRadius: "12px 12px 100px 12px", // top-left, top-right, bottom-right, bottom-left
            padding: "20px",
            width: "300px",
            textAlign: "center",
          }}
           title="Understand the specific price for each shipping service."
            image="https://s3-alpha-sig.figma.com/img/50ad/5914/0f3c78d5f6508d7197f7ad2bedadc1aa?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZDarLofiTu5~pFmMTmoiMatpBSiOGE3qQf7B9GKUF7PFuED3tgXW9JtKrcgHPCBgEN0TKy7KnXvWVPgGSd1d-Q0Yyk310sSOqoPhSoJi089ghR9Ft1kYVKmFZ6qV5TgRM-IuHzptmmbv23qcSMuxvZ9alyhP-rLmx2M30ANQnRij-t3t6tjvBXzzzYLb49BzDeeDiNnzn1ZCVU8Mei~xIgUYAeqpbf1sQGdWydTSgStXnw9vhkUe9JgGiLxd7jh9s42f3l-5DW9KFYLgPCD3OboJMSVOhQfbtsJbSKBI5XFGbW2LEeU0ps2y~rGE6fmmMIk~H0U09r9nHs3tBGYX~w__"
           
          />
          <ColorCard
            style={{
                backgroundColor: "#FFEDFE",
                borderRadius: "12px 100px 12px 12px", // top-left, top-right, bottom-right, bottom-left
                padding: "20px",
                width: "300px",
                textAlign: "center",
              }}
            image="https://s3-alpha-sig.figma.com/img/51f5/a8c3/6ee2b09a5e2f3fc18ba59fddeab1e8e7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eGKurI8QGM2jmnxW3wu9yaBCcjw5NhuXd4XzTKTcqWCxMKqgn0AGrpWjd8lzvmqDlnBq2e1iTXfDiy7Y5WkB-Mna5CswP7uKCnq7NjKqHxAhxUDuX2nB~TYsliQjT1lUru2558pOcNcfsvIQeEy5O74ysYKTYbtxmN3JKKNsTaORZavqiIbfclIZPnuOxeY-i4v7V6LEQs9Kjphfa8vDmkVAusG526oE1DhwMa28Y5vwalM0obiijisp9TB8YpEygyth4Dr-oz9C4xj7sS9SduCLI84ND8DVHp5zdbZlZb9C5HuQsrx8oNP~cYj8KIG1NLMIT~KZnQeZFPQGRhgP2g__"
            title="Compare your negotiated rates with carrier costs."
          />
          <ColorCard
           style={{
            backgroundColor: "#FFFEED",
            borderRadius: "12px 12px 100px 12px", // top-left, top-right, bottom-right, bottom-left
            padding: "20px",
            width: "300px",
            textAlign: "center",
          }}
            image="https://s3-alpha-sig.figma.com/img/4c0f/ffd4/abb612236dcadbd65384bad4ca9592ea?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y2sH2Jq5P8KyCsdwk~D-toc3EkQCryBd6B54uuhEcfHuBEC1btL8Q1zyBvrndYKwMKYyAuu5fyl2cXraT8omDkajzF7myartM~KOnUDQtuu0oaB~lQ6jCvjk1CDg7NgqwBetYueDoYigCQdq02AfQ7aCbZXn7de6bL6WHaW6xnfSrCS1I8QHYQiKWauqPBWXp-91XK993MHoykoXzqC4tW2Sxhve1a3lKzYshimTDHJxFDyBJP8dN7SlesM6H77-ljrP9Ch-LM51FM1gWyYPea7dX4At4m60Y1TZ0ZicQFZOveMA~~vLzVd8hDXZwKHY6v0m0V4X8amknk~pSk6inw__"
            title="Get recommended shipping options with their best rates."
          />
        </Row>
      </div>
    </Layout>
  );
};

export default CarrierContract;
