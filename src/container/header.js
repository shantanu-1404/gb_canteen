// src/header.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';



const Header = ({ toggleSidebar })  => {

  return (
        <div className="col">
          {/* Main Header */}
          <div className="headview d-flex justify-content-between align-items-center p-5">
            <div>
              <i className="bi bi-brightness-low-fill brightness-icon"></i>
              <a
                className="hamburger-icon"
                onClick={toggleSidebar}
                aria-label="Toggle hamburger"
              >
                <i className="bi bi-list"></i>
              </a>
            </div>

            <div className="search-container d-flex">
              <div className="search-icon">
                <i className="bi bi-search"></i>
              </div>
              <input type="text" className="search-input" placeholder="Search..." />
            </div>

            <div className="d-flex">
              <div className="notification-icon d-flex">
                <i className="bi bi-bell"></i>
              </div>
              <div className="down-icon d-flex">
                <i className="bi bi-chevron-down"></i>
              </div>
              <div className="daisy-text">Daisy</div>
              <img
                className="img-thumbnail profile-pic"
                src="https://img.freepik.com/free-photo/one-beautiful-woman-smiling-looking-camera-exuding-confidence-generated-by-artificial-intelligence_188544-126053.jpg?t=st=1735450234~exp=1735453834~hmac=a300e3ba21a31cb8631eab23d0b36d09d351e20f240756dc296bd090ab1259b7&w=1380"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      
   
  );
};

export default Header;

