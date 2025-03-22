import React, { useState } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

import FormHeader from "../components/FormHeader";
import TextInput from "../components/TextInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import productsData from "../assets/json/product.json"; // ✅ Import JSON data
import OriginDropdown from "../components/OriginDropdown";
import suppliersData from "../assets/json/supplierdata.json";
import DestinationDropdown from "../components/DestinationDropdown";
import destinationdata from "../assets/json/destinationdata.json";
import SelectComponent from "../components/SelectComponent";
import DateInput from "../components/DateInput";
import TagInput from "../components/TagInput";
import Timeline from "../components/Timeline";
import trackingdata from "../assets/json/tracking.json";
import Button from "../components/Button";

const AddNewInventoryTransfer = () => {
  const [selectedSingle, setSelectedSingle] = useState("");
  const navigate = useNavigate();

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
  // ✅ Function to convert supplier data into location-based structure
  const convertToLocationBasedData = (suppliers) => {
    return suppliers.reduce((acc, supplier) => {
      const city = supplier.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(supplier);
      return acc;
    }, {});
  };

  // ✅ Converted supplier data grouped by city
  const [suppliersByLocation, setSuppliersByLocation] = useState(
    convertToLocationBasedData(suppliersData)
  );

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSupplierSelection = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCreateSupplier = (location) => {
    if (!location) {
      alert("Please select a city first.");
      return;
    }

    const newSupplier = {
      name: prompt("Enter new supplier name:"),
      country: prompt("Enter supplier country:"),
      address: prompt("Enter supplier address:"),
      state: prompt("Enter supplier state:"),
      city: location, // ✅ Assign the selected city
      street: prompt("Enter supplier street:"),
      postal_code: prompt("Enter postal code:"),
      contact_number: prompt("Enter contact number:"),
      email: prompt("Enter email:"),
    };

    if (Object.values(newSupplier).every((field) => field)) {
      setSuppliersByLocation((prev) => ({
        ...prev,
        [location]: [...(prev[location] || []), newSupplier],
      }));
    }
  };

  // ✅ Ensure `destinationdata` is never undefined
  const [destinations, setDestinations] = useState(destinationdata || []);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleDestinationSelection = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCreateDestination = () => {
    const newDestinationAddress = prompt("Enter destination address:");
    const newDestinationCountry = prompt("Enter country:");
    const newDestinationState = prompt("Enter state:");
    const newDestinationCity = prompt("Enter city:");
    const newDestinationStreet = prompt("Enter street:");
    const newDestinationPostalCode = prompt("Enter postal code:");

    if (
      newDestinationAddress &&
      newDestinationCountry &&
      newDestinationState &&
      newDestinationCity &&
      newDestinationStreet &&
      newDestinationPostalCode
    ) {
      const newDestination = {
        country: newDestinationCountry,
        address: newDestinationAddress,
        state: newDestinationState,
        city: newDestinationCity,
        street: newDestinationStreet,
        postal_code: newDestinationPostalCode,
      };

      setDestinations((prev) => [...prev, newDestination]);
    }
  };
  const handleTagsChange = (tags) => {
    console.log("Selected Tags:", tags);
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

  return (
    <Layout>
      <FormHeader
        title="Add New Inventory Transfer"
        backUrl="/products/transfer"
        closeUrl="/"
      />
      <Row>
        <Col md={7}>
          <div className="form_section">
            <h6 className="card-title">Select Products</h6>

            {/* ✅ Search and Add Button */}
            <div className="row">
              <div className="col p-3">
                <a className="search-input-wrapper" onClick={openModal}>
                  <div className="ae-search-container">
                  <i class="bi bi-search"></i> Search and
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
            <div className="form-group row  gap-2 text-center d-flex justify-content-end">
            <Button
              onClick={() => navigate("/receive_items")}
              label="Receive Items"
            />
            </div>
          </div>

          <div className="form_section">
            <h6 className="card-title">Shipment Details</h6>
            <TextInput
              label="Tracking Id"
              placeholder="Id"
              required={true}
              onChange={handleTextInputChange}
            />
            <TextInput
              label="Shipping Carrier"
              placeholder="Carrier"
              required={true}
              onChange={handleTextInputChange}
            />
            <DateInput label="Estimated Arrival" type="future" />

            <TextInput
              label="Tracking Number"
              placeholder="Number"
              type="number"
            />
            <TextInput label="Tracking URL" placeholder="URL" type="url" />
            <SelectComponent
              label="Shipping Carrier"
              name="singleSelect"
              options={options}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </div>
        </Col>

        <Col md={5}>
          <div className="form_section">
            <h6 className="card-title">Additional Details</h6>

            <div className="flex flex-col gap-4 items-center p-8">
              <OriginDropdown
                label="Origin"
                name="supplierDropdown"
                options={suppliersByLocation}
                onChange={handleSupplierSelection}
                createAction={handleCreateSupplier}
                createLabel="Create New Supplier"
              />

              {selectedSupplier && (
                <div className="mt-4 p-4 border rounded-md shadow-md bg-white w-80 form_section">
                  <h4 className="text-md font-bold text-gray-800">
                    Supplier Details
                  </h4>
                  <p>
                    <strong>Name:</strong> {selectedSupplier.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedSupplier.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedSupplier.address}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedSupplier.country}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 items-center p-8">
              {/* ✅ Destination Dropdown */}
              <DestinationDropdown
                label="Destination"
                name="destinationDropdown"
                options={destinations} // ✅ Now always an array
                onChange={handleDestinationSelection}
                createAction={handleCreateDestination}
                createLabel="Add New Destination"
              />

              {/* ✅ Selected Destination Details */}
              {selectedDestination && (
                <div className="mt-4 p-4 border rounded-md shadow-md bg-white w-80 form_section">
                  <h4 className="text-md font-bold text-gray-800">
                    Destination Details
                  </h4>
                  <p>
                    <strong>Country:</strong> {selectedDestination.country}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedDestination.address}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedDestination.state}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedDestination.city}
                  </p>
                  <p>
                    <strong>Street:</strong> {selectedDestination.street}
                  </p>
                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {selectedDestination.postal_code}
                  </p>
                </div>
              )}
            </div>
            <TextInput
              label="Reference Number"
              type="number"
              placeholder="Number"
            />
          </div>
          <div className="form_section">
            <h6 className="card-title">Assign tags</h6>
            <TagInput
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
            />
          </div>
          <div className=" form_section">
            <h6 className="card-title">Timeline</h6>
            <Timeline events={trackingdata} />
            <TextInput
              placeholder="Share Your Thoughts...."
              required={true}
              onChange={handleTextInputChange}
            />
          </div>

          <div className="form-group row p-3 gap-2 text-center">
            <a type="submit" className="btn col a-btn-primary">
              Save and continue later
            </a>
            <a type="add" className="btn col-4 a-btn-primary">
              Add
            </a>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNewInventoryTransfer;
