import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';

const InvoiceList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const invoices = [
    { id: '1', invoiceNumber: 'INV-001', customer: 'John Doe', date: '2023-05-15', total: 1250.99, status: 'Paid' },
    { id: '2', invoiceNumber: 'INV-002', customer: 'Jane Smith', date: '2023-05-20', total: 850.50, status: 'Pending' },
    { id: '3', invoiceNumber: 'INV-003', customer: 'Bob Johnson', date: '2023-05-25', total: 325.75, status: 'Overdue' }
  ];

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoice-list-container">
      <div className="invoice-list-header">
        <h2>Invoices</h2>
        <div className="invoice-controls">
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="invoice-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="add-invoice-btn"
            onClick={() => navigate('/invoices/new')}
          >
            <i className="fas fa-plus"></i> Add Invoice
          </button>
        </div>
      </div>
      
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.date}</td>
                <td>${invoice.total.toFixed(2)}</td>
                <td>
                  <span className={`status-${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="invoice-actions">
                  <button 
                    className="view-btn"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                  >
                    View
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => alert(`Delete invoice ${invoice.invoiceNumber}`)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-invoices">
                No invoices found. Try a different search or add a new invoice.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;