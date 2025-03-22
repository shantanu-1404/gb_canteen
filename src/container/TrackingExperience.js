import React, { useState } from "react";
import SelectTable from "../components/SelectTable";
import Table from "../components/Table";
import brandsData from "../assets/json/brands.json";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import CheckboxInput from "../components/CheckboxInput";
import InfoAlert from "../components/InfoAlert";
import CarrierCard from "../components/EnableCard";

import SelectComponent from "../components/SelectComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TrackingExperience = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [setSelectedSingle] = useState("");

  // ✅ Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAgreementChange = (isChecked) => {
    console.log("User agreed:", isChecked);
  };

  // ✅ Format data with quantity and selection tracking
  const formattedBrands = brandsData.map((brand, index) => ({
    id: index + 1,
    imageUrl: brand.col1,
    name: brand.col2,
    price: parseFloat(brand.col3),
    category: brand.col4,
    quantity: quantities[index + 1] || 1,
    isChecked: selectedBrands.some((p) => p.id === index + 1),
  }));

  // ✅ Handle Selection Change
  const handleSelectionChange = (updatedSelection) => {
    setSelectedBrands((prevSelected) => {
      const newSelection = updatedSelection.map((item) => ({
        ...item,
        quantity: quantities[item.id] || item.quantity || 1,
      }));
      return newSelection;
    });

    // ✅ Track quantities
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
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'table'
  const cardData = [
    {
      carrierName: "Shadowfax",
      carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Shadowfax_logo.svg/2560px-Shadowfax_logo.svg.png",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      termsLink: "#",
      bgColor: "#F9B233",
      buttonText: "Add Contract"
    },
    {
      carrierName: "Blue Dart",
      carrierLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Blue_Dart_Express_logo.svg/2560px-Blue_Dart_Express_logo.svg.png",
      features: ["Fast Delivery", "Tracking", "Cash on Delivery"],
      termsLink: "#",
      bgColor: "#FDB742",
      buttonText: "Enable"
    }
  ];
  
  const backgroundColorOptions = [
    { value: "#FFFFFF", label: "White" },
    { value: "#F6FFEC", label: "Light Green" },
    { value: "#EDFEFF", label: "Light Blue" },
    { value: "#FFF5E5", label: "Peach" },
    { value: "#F9F9F9", label: "Light Grey" },
    { value: "#FFF0F5", label: "Lavender Blush" },
    { value: "#E6F7FF", label: "Pale Sky Blue" },
    { value: "#FFF8DC", label: "Cornsilk" },
    { value: "#FFFAF0", label: "Floral White" },
    { value: "#E8F5E9", label: "Mint Cream" },
  ];
  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "'Helvetica Neue', sans-serif", label: "Helvetica Neue" },
    {
      value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      label: "Segoe UI",
    },
    { value: "'Times New Roman', serif", label: "Times New Roman" },
    { value: "'Georgia', serif", label: "Georgia" },
    { value: "'Courier New', monospace", label: "Courier New" },
    { value: "'Lucida Console', Monaco, monospace", label: "Lucida Console" },
    { value: "'Roboto', sans-serif", label: "Roboto" },
    { value: "'Open Sans', sans-serif", label: "Open Sans" },
    { value: "'Poppins', sans-serif", label: "Poppins" },
    { value: "'Montserrat', sans-serif", label: "Montserrat" },
    { value: "'Lato', sans-serif", label: "Lato" },
  ];
  const fontColorOptions = [
    { value: "#000000", label: "Black" },
    { value: "#ffffff", label: "White" },
    { value: "#1a1a1a", label: "Dark Gray" },
    { value: "#808080", label: "Gray" },
    { value: "#ff0000", label: "Red" },
    { value: "#00af35", label: "Green" },
    { value: "#0000ff", label: "Blue" },
    { value: "#ffa500", label: "Orange" },
    { value: "#800080", label: "Purple" },
    { value: "#ffc0cb", label: "Pink" },
    { value: "#008080", label: "Teal" },
    { value: "#ff69b4", label: "Hot Pink" },
    { value: "#f5f5f5", label: "Light Gray" },
  ];
  const themeOptions = [
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" },
    { value: "modern", label: "Modern Green" },
    { value: "classic", label: "Classic Blue" },
    { value: "vibrant", label: "Vibrant Orange" },
    { value: "default", label: "default" },
  ];

  return (
    <Layout>
      <div className="container">
        <div className="form_section">
          <h6 className="card-title">Select Brand</h6>

          {/* ✅ Search and Add Button */}
          <div className="row">
            <div className="col p-3">
              <a className="search-input-wrapper" onClick={openModal}>
                <div className="ae-search-container">
                  <i className="bi bi-search"></i> Search and add a brand...
                </div>
              </a>
            </div>
          </div>
          {/* ✅ Brand Selection Modal */}
          {isModalOpen && (
            <div className="custom-modal active">
              <div className="modal-overlay" onClick={closeModal}></div>
              <div className="modal-container">
                <div className="modal-content form_section">
                  <h6>Select Brand</h6>

                  <SelectTable
                    id="brandSelection"
                    columns={[
                      { headname: "Logo", dbcol: "imageUrl", type: "img" },
                      { headname: "Brand", dbcol: "name" },
                      { headname: "Rating", dbcol: "price", type: "currency" },
                      { headname: "Category", dbcol: "category" },
                    ]}
                    data={formattedBrands}
                    selectedProducts={selectedBrands}
                    setSelectedProducts={setSelectedBrands}
                    onSelectionChange={handleSelectionChange}
                  />
                  <br />
                  <br />
                  <div className="btn-sack mt-3 d-flex justify-content-end">
                    <button className="a-btn-primary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ✅ Selected Brand Table */}
          {selectedBrands.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-bold">Selected Brands</h4>
              <Table
                id="selectedBrandsTable"
                data={selectedBrands}
                columns={[
                  { headname: "Logo", dbcol: "imageUrl", type: "img" },
                  { headname: "Brand", dbcol: "name" },
                  { headname: "Rating", dbcol: "price", type: "currency" },
                  { headname: "Category", dbcol: "category" },
                ]}
                filteredData={selectedBrands}
                setFilteredData={setSelectedBrands}
                quantities={quantities}
                paginated={false}
                showCheckbox={false}
              />
            </div>
          )}
          <label>
            To upload your logo and set your brand colours, go to the settings
            for this brand. To create more Tracking templates, add additional
            brands in your brand settings.
          </label>
        </div>
        <div className="form_section">
          <h6 className="card-title">Create a Custom Tracking Page</h6>
          <label>
            Replace the default carrier Tracking pages with your own branded
            Tracking page. Use your brand colors, logo, and other
            customizations. After publishing, the links in your Tracking emails
            will direct customers to your custom page.
          </label>
          <Row>
            <SelectComponent
              label="Background Colour"
              name="Background Colour"
              listStyle="col-md-6"
              options={backgroundColorOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Font"
              name="Font"
              listStyle="col-md-6"
              options={fontOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Font Colour"
              name="Font Colour"
              listStyle="col-md-6"
              options={fontColorOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
            <SelectComponent
              label="Theme"
              name="Theme"
              listStyle="col-md-6"
              options={themeOptions}
              isMulti={false}
              onChange={setSelectedSingle}
            />
          </Row>
          <Row>
            <Col md={6}>
              <CheckboxInput
                label="Use Page Header"
                onChange={handleAgreementChange}
              />
              <label>
                This will add your personalised Header at the top of the page
              </label>
            </Col>
            <Col md={6}>
              <CheckboxInput
                label="Use Page Footer"
                onChange={handleAgreementChange}
              />
              <label>
                This will add your personalised Footer at the bottom of the page
              </label>
            </Col>
          </Row>
          <InfoAlert
            message="You can set your header and footer in the"
            linkText="settings for this brand."
            linkHref="/brand-settings"
          />
          <Row>
            <div className="green-theme-card">
              <div className="green-header">Header</div>
              <div className="green-banner">Branding Banner</div>

              <div className="green-tracking">
                <h4>Tracking Details</h4>
                <div className="green-line"></div>
                <div className="green-line"></div>
              </div>

              <div className="green-social">
                <div className="green-card">
                  <div className="green-icon">
                    <i class="bi bi-instagram"></i>
                  </div>
                  <div className="green-label">Instagram Posts</div>
                </div>
                <div className="green-card">
                  <div className="green-icon">
                    <i class="bi bi-image"></i>
                  </div>
                  <div className="green-label">User-Generated Content</div>
                </div>
                <button className="green-share-btn">Share Own Content</button>
              </div>

              <div className="green-message">
                <p className="top-msg">
                  Your order has reached its destination city!
                </p>
                <p className="sub-msg">
                  Fun fact: Did you know that the average package travels over
                  1,000 miles before reaching your doorstep?
                </p>
              </div>

              <div className="green-referral">Referral Program</div>
              <div className="green-footer">Footer</div>
            </div>
            <div className="gray-theme-card">
              <div className="gray-header">Header</div>

              <div className="gray-tracking">
                <h4>Tracking Details</h4>
                <div className="gray-line"></div>
                <div className="gray-line"></div>
              </div>

              <div className="gray-message">
                <p>Your order has reached its destination city!</p>
                <p className="gray-sub-msg">
                  Fun fact: Did you know that the average package travels over
                  1,000 miles before reaching your doorstep?
                </p>
              </div>

              <div className="gray-referral">Referral Program</div>
              <div className="gray-footer">Footer</div>
            </div>
            <div className="gray-theme-card">
              <div className="gray-header">Header</div>

              <div className="gray-tracking">
                <h4>Tracking Details</h4>
                <div className="gray-line"></div>
                <div className="gray-line"></div>
              </div>

              <div className="gray-content-row">
                <div className="gray-card content-card">
                  <div className="icon">
                    <i class="bi bi-instagram"></i>
                  </div>
                  <div className="content-label">Instagram Posts</div>
                </div>

                <div className="gray-card content-card">
                  <div className="icon">
                    <i class="bi bi-image"></i>
                  </div>
                  <div className="content-label">User-Generated Content</div>
                </div>
              </div>

              <div className="gray-referral">Referral Program</div>
              <div className="gray-footer">Footer</div>
            </div>
          </Row>
          <Row>
            <CarrierCard
              carrierName="Blue Dart"
              logoUrl="https://s3-alpha-sig.figma.com/img/3d4e/afc9/499ef390aeefb917ee0f201ef18ca0ab?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haRqbFAx-Lhl~18In4ZFlC9y5-T-RpNpnyuyIDbeF-1bm4p9kYJ8A6wYBg5P7eUZAw6GTfqSMIUjV3T4l-lyEvsAlKfQe1cuqiYtwx7tjvK6nuPBxT4G6FFEcAoAT5f6lxwz9NnKmd6fiDUNsTIugsgUDDyTj721hN3Szph22rkieyw0E~y5iAQTteDHXU-dXF-~cz6tj4JILUi1LsrMGQbjPk6aW5pXfiavrYFYvCxbSRXrOOvWMNjutUXmDSymzIXeXxSYd6G5eob80pNK08urNOHnMW7tGhvxqV4gEZXT~~gmCaXVJ7W0LOsMI7weTAQ-0VjZavyJQgYgS8J2Xw__"
              features={["Feature 1", "Feature 1", "Feature 1"]}
              termsLink="#"
              buttonText="Add Contract"
              cornerBgColor="#FDB742"
            />
            <CarrierCard
              carrierName="Blue Dart"
              logoUrl="https://s3-alpha-sig.figma.com/img/3d4e/afc9/499ef390aeefb917ee0f201ef18ca0ab?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haRqbFAx-Lhl~18In4ZFlC9y5-T-RpNpnyuyIDbeF-1bm4p9kYJ8A6wYBg5P7eUZAw6GTfqSMIUjV3T4l-lyEvsAlKfQe1cuqiYtwx7tjvK6nuPBxT4G6FFEcAoAT5f6lxwz9NnKmd6fiDUNsTIugsgUDDyTj721hN3Szph22rkieyw0E~y5iAQTteDHXU-dXF-~cz6tj4JILUi1LsrMGQbjPk6aW5pXfiavrYFYvCxbSRXrOOvWMNjutUXmDSymzIXeXxSYd6G5eob80pNK08urNOHnMW7tGhvxqV4gEZXT~~gmCaXVJ7W0LOsMI7weTAQ-0VjZavyJQgYgS8J2Xw__"
              features={["Feature 1", "Feature 1", "Feature 1"]}
              termsLink="#"
              buttonText="Add Contract"
              cornerBgColor="#FDB742"
            />
            <CarrierCard
              carrierName="Blue Dart"
              logoUrl="https://s3-alpha-sig.figma.com/img/3d4e/afc9/499ef390aeefb917ee0f201ef18ca0ab?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haRqbFAx-Lhl~18In4ZFlC9y5-T-RpNpnyuyIDbeF-1bm4p9kYJ8A6wYBg5P7eUZAw6GTfqSMIUjV3T4l-lyEvsAlKfQe1cuqiYtwx7tjvK6nuPBxT4G6FFEcAoAT5f6lxwz9NnKmd6fiDUNsTIugsgUDDyTj721hN3Szph22rkieyw0E~y5iAQTteDHXU-dXF-~cz6tj4JILUi1LsrMGQbjPk6aW5pXfiavrYFYvCxbSRXrOOvWMNjutUXmDSymzIXeXxSYd6G5eob80pNK08urNOHnMW7tGhvxqV4gEZXT~~gmCaXVJ7W0LOsMI7weTAQ-0VjZavyJQgYgS8J2Xw__"
              features={["Feature 1", "Feature 1", "Feature 1"]}
              termsLink="#"
              buttonText="Add Contract"
              cornerBgColor="#FDB742"
            />
            <CarrierCard
              carrierName="Blue Dart"
              logoUrl="https://s3-alpha-sig.figma.com/img/3d4e/afc9/499ef390aeefb917ee0f201ef18ca0ab?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=haRqbFAx-Lhl~18In4ZFlC9y5-T-RpNpnyuyIDbeF-1bm4p9kYJ8A6wYBg5P7eUZAw6GTfqSMIUjV3T4l-lyEvsAlKfQe1cuqiYtwx7tjvK6nuPBxT4G6FFEcAoAT5f6lxwz9NnKmd6fiDUNsTIugsgUDDyTj721hN3Szph22rkieyw0E~y5iAQTteDHXU-dXF-~cz6tj4JILUi1LsrMGQbjPk6aW5pXfiavrYFYvCxbSRXrOOvWMNjutUXmDSymzIXeXxSYd6G5eob80pNK08urNOHnMW7tGhvxqV4gEZXT~~gmCaXVJ7W0LOsMI7weTAQ-0VjZavyJQgYgS8J2Xw__"
              features={["Feature 1", "Feature 1", "Feature 1"]}
              termsLink="#"
              buttonText="Add Contract"
              cornerBgColor="#FDB742"
            />
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default TrackingExperience;
