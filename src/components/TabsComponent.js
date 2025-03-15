import React, { useState } from "react";


const TabsComponent = ({ tabs }) => {
  // State to manage the currently active tab
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  // Handle tab click to change the active tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="section_card ">
      {/* Tab Navigation */}
      <ul className="nav nav-tabs d-flex justify-content-between " id="myTab" role="tablist">
        {tabs.map((tab) => (
          <li className="nav-item" role="presentation" key={tab.id}>
            <button
              className={`nav-link-tabs  ${activeTab === tab.id ? "active" : ""}`}
              id={`${tab.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${tab.id}-pane`}
              type="button"
              role="tab"
              aria-controls={`${tab.id}-pane`}
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="myTabContent">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade  ${
              activeTab === tab.id ? "show active" : ""
            }`}
            id={`${tab.id}-pane`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
            tabIndex="0"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
