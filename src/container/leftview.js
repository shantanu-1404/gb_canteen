import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Using React Router for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS if not already imported
import '../App.css'; // Custom CSS file if needed for additional styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap's JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 




const LeftSidebar = ({ isVisible }) => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1]; // Get the active page from the URL
  

  return (
    <>
    <div id="left" className={`left  ${isVisible ? 'show' : ''}`}></div>
    <div id="left" className={`left-container ${isVisible ? 'show' : ''}`} style={{ width: '287px' }}>
      {/* Home Rectangle with Icon and Text */}
      <Link to="/home" className="home-text">
        <div className="home-rectangle">
          <i className="bi bi-columns-gap home-icon"></i> Home
        </div>
      </Link>

      <div className="sec mt-3">
        <ul className="p-0">
          {/* Restaurant Onboarding Dropdown */}
          <li className="nav-item dropdown">
            <Link
              className={`nav-link dropdown-toggle ${activePage === 'restaurant' ? 'active' : ''}`}
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-shop shop-icon"></i> Vendor Onboarding
            </Link>
            <ul className="dropdown-menu submenu">
              <li><Link className="dropdown-item" to="/add_new_restaurant">Add New Restaurant</Link></li>
              <li><Link className="dropdown-item" to="/restaurant/view">View Restaurants</Link></li>
              <li><Link className="dropdown-item" to="#">Restaurant Settings</Link></li>
            </ul>
          </li>

          {/* Order Management Dropdown */}
          <li className="nav-item dropdown">
            <Link
              className={`nav-link dropdown-toggle ${activePage === 'order' ? 'active' : ''}`}
              to="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-cart cart-icon"></i> Order Management
            </Link>
            <ul className="dropdown-menu submenu">
              <li><Link className="dropdown-item" to="/order/view">View Orders</Link></li>
              <li><Link className="dropdown-item" to="#">Manage Orders</Link></li>
              <li><Link className="dropdown-item" to="#">Order Settings</Link></li>
            </ul>
          </li>

          {/* Other Menu Items */}
          <li><Link to="#"><i className="bi bi-people customer-icon"></i> Customer Management</Link></li>
          <li><Link to="#"><i className="bi bi-bar-chart-line analytics-and-reporting-icon"></i> Analytics & Reporting</Link></li>
          <li><Link to="#"><i className="bi bi-receipt"></i> Invoice</Link></li>
          <li><Link to="#"><i className="bi bi-columns"></i> Integrations</Link></li>
          <li><Link to="#"><i className="bi bi-percent"></i> Offers & Promotions</Link></li>
          <li><Link to="#"><i className="bi bi-terminal-plus"></i> Loyalty & Referrals</Link></li>
          <li><Link to="#"><i className="bi bi-camera-video-fill"></i> Social Media</Link></li>
          <li><Link to="#"><i className="bi bi-percent"></i> Discount Generator</Link></li>
          <li><Link to="#"><i className="bi bi-journal-plus"></i> Customer Service</Link></li>
          <li><Link to="#"><i className="bi bi-chat-right-text"></i> Feedback & Reviews</Link></li>
          <li><Link to="#"><i className="bi bi-person"></i> User Access</Link></li>
          <li><Link to="#"><i className="bi bi-list-task"></i> Task Management</Link></li>
          <li><Link to="#"><i className="bi bi-bar-chart"></i> Data Management</Link></li>
          <li><Link to="#"><i className="bi bi-journal-text"></i> Policies Management</Link></li>
          <li><Link to="#"><i className="bi bi-card-text"></i> Blogs</Link></li>
          <li><Link to="#"><i className="bi bi-mortarboard"></i> Careers</Link></li>
          <li className={`${activePage === 'online_store' ? 'active' : ''}`}>
            <Link to="/onlinestore"><i className="bi bi-shop shop-icon"></i> Online Store</Link>
          </li>
          <li><Link to="#"><i className="bi bi-gear"></i> Settings</Link></li>
        </ul>
      </div>
    </div>
    </>
    
    
  );
};

export default LeftSidebar;
