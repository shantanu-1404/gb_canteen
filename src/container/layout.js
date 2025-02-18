import React, { useState, useEffect } from 'react';
import Header from './header';
import LeftView from './leftview';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



// Array of colors for the pins
const pinColors = [
  "#007aff",
  "#11AF22",
  "#ED231C",
  "#1e293b",
  "#6366f1",
  "#FF870F",
];

// SVG template for the pin
const pinSvgTemplate = `
<svg class="section-pin" width="65" height="19" viewBox="0 0 65 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="9.5" x2="65" y2="9.5" stroke="{color}" stroke-dasharray="3 3"/>
    <circle cx="9.5" cy="9.5" r="8" fill="white" stroke="{color}" stroke-width="3"/>
</svg>`;

// Function to get random color from array
function getRandomColor(excludeColor = null) {
  let availableColors = pinColors.filter((color) => color !== excludeColor);
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

// Function to create and attach pins
function attachPinsToFormSections() {
  let lastUsedColor = null;
  const formSections = document.querySelectorAll(".form_section");

  formSections.forEach((section) => {
    // Determine pin position based on parent column
    const isRightSide = section.closest(".col-md-5") !== null;
    const pinClass = isRightSide ? "pin-right" : "pin-left";

    // Get random color different from last used
    const color = getRandomColor(lastUsedColor);
    lastUsedColor = color;

    // Create pin SVG with the selected color
    const pinHtml = pinSvgTemplate.replace(/{color}/g, color);

    // Create wrapper div and add the SVG
    const pinWrapper = document.createElement("div");
    pinWrapper.className = pinClass;
    pinWrapper.innerHTML = pinHtml;

    // Add pin to section
    section.appendChild(pinWrapper);
  });
}

const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  // Step 1: Use useEffect to run the pin logic after component mounts
  useEffect(() => {
    attachPinsToFormSections(); // Run pin logic
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar */}
        <LeftView isVisible={isSidebarVisible} />

        {/* Right Main Container */}
        <div className="right-container col">
          {/* Header with the toggle function */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <Container style={{ marginTop: "110px" }} className="content">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;
