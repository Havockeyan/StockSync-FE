import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    date: '',
    status: 'Draft',
    items: [],
    total: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/invoices');
  };

  return (
    <div className="invoice-form-container">
      <div className="form-header">
        <h2>Create New Invoice</h2>
        <button 
          className="back-button"
          onClick={() => navigate('/invoices')}
        >
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            className="form-control"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Invoice Date:</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            className="form-control"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="form-buttons">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/invoices')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
          >
            Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;