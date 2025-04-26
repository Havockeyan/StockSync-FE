import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customers.css';

// Mock data for customers
const initialCustomers = [
  { 
    id: 1, 
    name: 'John Doe', 
    phone: '(555) 123-4567', 
    email: 'john.doe@example.com', 
    address: '123 Main St, Springfield, IL' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    phone: '(555) 987-6543', 
    email: 'jane.smith@example.com', 
    address: '456 Oak Ave, Riverdale, NY' 
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    phone: '(555) 456-7890', 
    email: 'robert.j@example.com', 
    address: '789 Pine Blvd, Liberty, TX' 
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    phone: '(555) 246-8135', 
    email: 'sarah.w@example.com', 
    address: '321 Cedar Ln, Westview, CA' 
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    phone: '(555) 369-2580', 
    email: 'michael.b@example.com', 
    address: '654 Elm Rd, Eastwood, FL' 
  }
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to add new customer form
  const handleAddNew = () => {
    navigate('/customers/new');
  };

  // Navigate to edit customer form
  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  // Delete customer
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-header">
        <h2 className="customer-title">Customers</h2>
        <button className="add-button" onClick={handleAddNew}>
          <i className="fas fa-plus"></i> Add New Customer
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table className="customer-table">
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
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td className="action-buttons">
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(customer.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;