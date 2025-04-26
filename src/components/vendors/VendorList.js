import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorList.css';

// Mock data for vendors
const initialVendors = [
  { 
    id: 1, 
    name: 'Tech Supplies Inc', 
    phone: '(555) 123-4567', 
    email: 'contact@techsupplies.com', 
    address: '123 Tech Blvd, Silicon Valley, CA' 
  },
  { 
    id: 2, 
    name: 'Office Solutions', 
    phone: '(555) 987-6543', 
    email: 'info@officesolutions.com', 
    address: '456 Business Ave, Commerce City, NY' 
  },
  { 
    id: 3, 
    name: 'Global Manufacturing', 
    phone: '(555) 456-7890', 
    email: 'orders@globalmanufacturing.com', 
    address: '789 Industrial Park, Detroit, MI' 
  },
  { 
    id: 4, 
    name: 'Quick Logistics', 
    phone: '(555) 246-8135', 
    email: 'support@quicklogistics.com', 
    address: '321 Delivery Rd, Transport City, TX' 
  },
  { 
    id: 5, 
    name: 'Wholesale Distributors', 
    phone: '(555) 369-2580', 
    email: 'sales@wholesaledist.com', 
    address: '654 Bulk Lane, Warehouse District, IL' 
  }
];

const VendorList = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone.includes(searchTerm)
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to add new vendor form
  const handleAddNew = () => {
    navigate('/vendors/new');
  };

  // Navigate to edit vendor form
  const handleEdit = (id) => {
    navigate(`/vendors/edit/${id}`);
  };

  // Delete vendor
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(vendor => vendor.id !== id));
    }
  };

  return (
    <div className="vendor-container">
      <div className="vendor-header">
        <h2 className="vendor-title">Vendors</h2>
        <div className="vendor-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="add-button" onClick={handleAddNew}>
            <i className="fas fa-plus"></i> Add New Vendor
          </button>
        </div>
      </div>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length > 0 ? (
            filteredVendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.email}</td>
                <td>{vendor.address}</td>
                <td className="action-buttons">
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(vendor.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No vendors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;