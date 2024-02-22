// ScrollableTabsNav.js
import React, { useState } from 'react';
import './css/ScrollableTabsNav.css'

const ScrollableTabsNav = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="scrollable-tabs-nav">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${tab === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableTabsNav;
