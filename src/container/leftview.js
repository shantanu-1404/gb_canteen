import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LeftSidebar = ({ isVisible, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const activePage = location.pathname.split("/")[1];
  const sidebarRef = useRef(null); // ✅ Ref for detecting outside clicks
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Manage multiple dropdowns with an object
  const [openDropdowns, setOpenDropdowns] = useState({});
  const isMobile = windowWidth <= 1137;
  // Toggle dropdown state dynamically
  const handleDropdown = (dropdownName, path = null) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));

    if (path) {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handle click outside sidebar to close in mobile view
  useEffect(() => {
    if (!isMobile) return;
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false); // Close sidebar when clicking outside
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible, isMobile]);

  return (
    <>
      {isMobile && isVisible && (
        <div
          className="sidebar-overlay"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
      <div id="left" className={`left ${isVisible ? "show" : ""}`}></div>
      <div
        id="left"
        ref={sidebarRef}
        className={`left-container ${isVisible ? "show" : ""}`}
        style={{ width: "287px" }}
      >
        <div className="d-flex md-user align-items-center">
          <img
            className="img-thumbnail profile-pic"
            src="https://img.freepik.com/free-photo/one-beautiful-woman-smiling-looking-camera-exuding-confidence-generated-by-artificial-intelligence_188544-126053.jpg?t=st=1735450234~exp=1735453834~hmac=a300e3ba21a31cb8631eab23d0b36d09d351e20f240756dc296bd090ab1259b7&w=1380"
            alt="Profile"
          />

          <h6>Daisy</h6>
        </div>

        {/* Home Link */}
        <Link to="/gb_canteen" className="home-text">
          <div className="home-rectangle">
            <i className="bi bi-columns-gap home-icon"></i> Home
          </div>
        </Link>

        <div className="sec mt-3">
          <ul className="p-0">
            {/* Vendor Onboarding Dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${
                  openDropdowns["vendor"] ? "active" : ""
                }`}
                onClick={() => handleDropdown("vendor")}
              >
                <Link to="/vendoronboarding">
                  <i className="bi bi-shop shop-icon"></i> Vendor Onboarding
                </Link>
                <i
                  className={`bi ${
                    openDropdowns["vendor"]
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>
              <ul
                className={`submenu collapse ${
                  openDropdowns["vendor"] ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to="/add_new_restaurant">
                    <i className="bi bi-dash"></i> Add New Restaurant
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/restaurant/view">
                    <i className="bi bi-dash"></i> View Restaurants
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bi bi-dash"></i> Restaurant Settings
                  </Link>
                </li>
              </ul>
            </li>

            {/* Order Management Dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${openDropdowns["order"] ? "active" : ""}`}
                onClick={() => handleDropdown("order")}
              >
                <span>
                  <i className="bi bi-cart cart-icon"></i> Order Management
                </span>
                <i
                  className={`bi ${
                    openDropdowns["order"]
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>
              <ul
                className={`submenu collapse ${
                  openDropdowns["order"] ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to="/order/view">
                    <i className="bi bi-dash"></i> View Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bi bi-dash"></i> Manage Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bi bi-dash"></i> Order Settings
                  </Link>
                </li>
              </ul>
            </li>

            {/* Products Dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${
                  openDropdowns["product"] ? "active" : ""
                }`}
                onClick={() => handleDropdown("product")}
              >
                <span
                  onClick={() => handleDropdown("social-media", "/products")}
                >
                  <i className="bi bi-handbag"></i> Products
                </span>

                <i
                  className={`bi ${
                    openDropdowns["product"]
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>
              <ul
                className={`submenu collapse ${
                  openDropdowns["product"] ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to="/products/collections">
                    <i className="bi bi-dash"></i> Collections
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/inventory-management">
                    <i className="bi bi-dash"></i> Inventory
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/giftcards">
                    <i className="bi bi-dash"></i>Gift Cards
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/purchase_order">
                    <i className="bi bi-dash"></i>Purchase order
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/transfer">
                    <i className="bi bi-dash"></i>Transfers
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#">
                <i className="bi bi-people customer-icon"></i> Customer
                Management
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-bar-chart-line analytics-and-reporting-icon"></i>{" "}
                Analytics & Reporting
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-receipt"></i> Invoice
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-columns"></i> Integrations
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-percent"></i> Offers & Promotions
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-terminal-plus"></i> Loyalty & Referrals
              </Link>
            </li>

            {/* Social Media with Multi-Level Dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${
                  openDropdowns["social-media"] ? "active" : ""
                }`}
              >
                <span
                  onClick={() =>
                    handleDropdown("social-media", "/social-media")
                  }
                >
                  <i className="bi bi-camera-video-fill"></i> Social Media
                </span>
                <i
                  onClick={() => handleDropdown("social-media")}
                  className={`bi ${
                    openDropdowns["social-media"]
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>
              <ul
                className={`submenu collapse ${
                  openDropdowns["social-media"] ? "show" : ""
                }`}
              >
                {/* Sub-menu under Social Media */}
                <li className="nav-item">
                  <div
                    className={`nav-link ${
                      openDropdowns["reports"] ? "active" : ""
                    }`}
                    onClick={() => handleDropdown("reports")}
                  >
                    <span>
                      <i className="bi bi-dash"></i> Reporting & Analysis
                    </span>
                    <i
                      className={`bi ${
                        openDropdowns["reports"]
                          ? "bi-chevron-down"
                          : "bi-chevron-right"
                      }`}
                    ></i>
                  </div>
                  <ul
                    className={`submenu collapse ${
                      openDropdowns["reports"] ? "show" : ""
                    }`}
                  >
                    <li
                      className={`${openDropdowns["reports"] ? "active" : ""}`}
                    >
                      <Link
                        className="dropdown-item"
                        to="/social-media/reports"
                      >
                        <i className="bi bi-dash"></i> Report
                      </Link>
                    </li>
                    <li
                      className={`${openDropdowns["reports"] ? "active" : ""}`}
                    >
                      <Link
                        className="dropdown-item"
                        to="/social-media/analytics"
                      >
                        <i className="bi bi-dash"></i> Ad Spend Analysis
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`${openDropdowns["projects"] ? "active" : ""}`}>
                  <Link className="dropdown-item" to="/social-media/projects">
                    <i className="bi bi-dash"></i> Project Management
                  </Link>
                </li>
                <li className={`${openDropdowns["clients"] ? "active" : ""}`}>
                  <Link className="dropdown-item" to="/social-media/clients">
                    <i className="bi bi-dash"></i> Client Management
                  </Link>
                </li>
              </ul>
            </li>

            {/* Other Menu Items */}
            <li>
              <Link to="#">
                <i className="bi bi-percent"></i> Discount Generator
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-journal-plus"></i> Customer Service
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-chat-right-text"></i> Feedback & Reviews
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-person"></i> User Access
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-list-task"></i> Task Management
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-bar-chart"></i> Data Management
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-journal-text"></i> Policies Management
              </Link>
            </li>
            <li className={`${openDropdowns["blogs"] ? "active" : ""}`}>
              <Link to="/blogs">
                <i className="bi bi-card-text"></i> Blogs
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bi bi-mortarboard"></i> Careers
              </Link>
            </li>

            {/* Onlinestrore Dropdown */}
            <li className="nav-item">
              <div
                className={`nav-link ${
                  openDropdowns["onlinestore"] ? "active" : ""
                }`}
                onClick={() => handleDropdown("onlinestore")}
              >
                <Link to="/onlinestore">
                  <i className="bi bi-shop shop-icon"></i>Online Store
                </Link>
                <i
                  className={`bi ${
                    openDropdowns["onlinestore"]
                      ? "bi-chevron-down"
                      : "bi-chevron-right"
                  }`}
                ></i>
              </div>
              <ul
                className={`submenu collapse ${
                  openDropdowns["onlinestore"] ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to=" ">
                    <i className="bi bi-dash"></i> Preferences
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#">
                <i className="bi bi-gear"></i> Settings
              </Link>
            </li>
          </ul>
        </div>
        <p className="logout">
          <a href="#">
            Logout <i class="bi mx-1 bi-arrow-right"></i>
          </a>
        </p>
      </div>
    </>
  );
};

export default LeftSidebar;
