import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h2 className="page-title">Dashboard</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-inner">
            <h3>Total Items</h3>
            <i className="fas fa-box"></i>
          </div>
          <h1>254</h1>
        </div>
        <div className="stat-card">
          <div className="stat-card-inner">
            <h3>Customers</h3>
            <i className="fas fa-users"></i>
          </div>
          <h1>120</h1>
        </div>
        <div className="stat-card">
          <div className="stat-card-inner">
            <h3>Vendors</h3>
            <i className="fas fa-truck"></i>
          </div>
          <h1>32</h1>
        </div>
        <div className="stat-card">
          <div className="stat-card-inner">
            <h3>Pending Bills</h3>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <h1>15</h1>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon received">
              <i className="fas fa-arrow-down"></i>
            </div>
            <div className="activity-details">
              <h4>Stock Received</h4>
              <p>Laptop HP Elitebook - 25 units</p>
              <small>Today, 09:15 AM</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon shipped">
              <i className="fas fa-arrow-up"></i>
            </div>
            <div className="activity-details">
              <h4>Stock Shipped</h4>
              <p>Dell Monitor P2419H - 10 units</p>
              <small>Today, 08:30 AM</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon updated">
              <i className="fas fa-edit"></i>
            </div>
            <div className="activity-details">
              <h4>Item Updated</h4>
              <p>Wireless Keyboard K380 - Price updated</p>
              <small>Yesterday, 03:45 PM</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon alert">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="activity-details">
              <h4>Low Stock Alert</h4>
              <p>USB-C Dongles - 5 units remaining</p>
              <small>Yesterday, 01:30 PM</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;