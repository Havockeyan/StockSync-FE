import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - would come from API in a real app
  const [customers, setCustomers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-123-4567', address: '123 Main St, Anytown, USA' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-987-6543', address: '456 Oak Ave, Somewhere, USA' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '555-456-7890', address: '789 Pine Rd, Nowhere, USA' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', phone: '555-789-0123', address: '321 Elm St, Anywhere, USA' }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate('/customers/new');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="customer-list-container">
      <div className="customer-list-header">
        <h2 className="customer-list-title">Customers</h2>
        <div className="customer-controls">
          <input
            type="text"
            placeholder="Search customers..."
            className="customer-search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="add-customer-btn" onClick={handleAddNew}>
            <i className="fas fa-plus"></i> Add Customer
          </button>
        </div>
      </div>

      {filteredCustomers.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <div className="customer-actions">
                    <button className="edit-btn" onClick={() => handleEdit(customer.id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(customer.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-customers">
          No customers found. Try a different search or add a new customer.
        </div>
      )}
    </div>
  );
};

export default CustomerList;