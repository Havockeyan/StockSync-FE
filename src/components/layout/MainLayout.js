import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  // Function to check if a menu item is active
  const isActive = (path) => {
    if (path === '/dashboard' && currentPath === '/dashboard') {
      return true;
    }
    // For other paths, check if the current path starts with the menu path
    return path !== '/dashboard' && currentPath.startsWith(path);
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Inventory App</h2>
        </div>
        
        <nav className="sidebar-menu">
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}>
              <Link to="/dashboard">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            
            <li className={isActive('/items') ? 'active' : ''}>
              <Link to="/items">
                <i className="fas fa-boxes"></i>
                <span>Items</span>
              </Link>
            </li>
            
            <li className={isActive('/customers') ? 'active' : ''}>
              <Link to="/customers">
                <i className="fas fa-users"></i>
                <span>Customers</span>
              </Link>
            </li>
            
            <li className={isActive('/vendors') ? 'active' : ''}>
              <Link to="/vendors">
                <i className="fas fa-building"></i>
                <span>Vendors</span>
              </Link>
            </li>
            
            <li className={isActive('/invoices') ? 'active' : ''}>
              <Link to="/invoices">
                <i className="fas fa-file-invoice"></i>
                <span>Invoices</span>
              </Link>
            </li>
            
            <li className={isActive('/bills') ? 'active' : ''}>
              <Link to="/bills">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Bills</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;