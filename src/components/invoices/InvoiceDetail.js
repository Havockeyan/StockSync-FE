import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';

const InvoiceDetail = () => {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const invoice = {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    date: '2023-12-01',
    dueDate: '2023-12-15',
    status: 'pending',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Business Ave, Suite 100, Business City, 12345'
    },
    items: [
      {
        id: 1,
        description: 'Product A',
        quantity: 2,
        unitPrice: 100.00,
        total: 200.00
      },
      {
        id: 2,
        description: 'Product B',
        quantity: 1,
        unitPrice: 150.00,
        total: 150.00
      }
    ],
    subtotal: 350.00,
    tax: 35.00,
    total: 385.00
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate(`/invoices/${invoice.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      // Delete logic here
      navigate('/invoices');
    }
  };

  return (
    <div className="invoice-detail-container">
      <div className="invoice-header">
        <div>
          <h2 className="invoice-title">Invoice #{invoice.invoiceNumber}</h2>
          <p>Date: {invoice.date}</p>
          <p>Due Date: {invoice.dueDate}</p>
        </div>
        <div>
          <span className={`invoice-status status-${invoice.status}`}>
            {invoice.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="customer-info">
        <h3>Customer Information</h3>
        <p>{invoice.customer.name}</p>
        <p>{invoice.customer.email}</p>
        <p>{invoice.customer.address}</p>
      </div>

      <table className="invoice-items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-totals">
        <div className="total-row">
          <span className="total-label">Subtotal:</span>
          <span className="total-value">${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span className="total-label">Tax (10%):</span>
          <span className="total-value">${invoice.tax.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span className="total-label grand-total">Total:</span>
          <span className="total-value grand-total">${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="invoice-actions">
        <button className="action-button print-button" onClick={handlePrint}>
          Print Invoice
        </button>
        <button className="action-button edit-button" onClick={handleEdit}>
          Edit Invoice
        </button>
        <button className="action-button delete-button" onClick={handleDelete}>
          Delete Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;