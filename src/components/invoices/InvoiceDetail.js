import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Invoices.css';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the invoice data from an API
    // For now, we'll use mock data
    const mockInvoice = {
      id: id,
      invoiceNumber: `INV-${id.padStart(3, '0')}`,
      customer: {
        name: 'John Doe Enterprises',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        address: '123 Business Ave, Commerce City, NY 10001'
      },
      issueDate: '2023-05-15',
      dueDate: '2023-06-15',
      status: 'Paid',
      items: [
        { id: 1, description: 'Laptop Computer', quantity: 2, unitPrice: 1200.00, total: 2400.00 },
        { id: 2, description: 'Office Chair', quantity: 5, unitPrice: 250.00, total: 1250.00 },
        { id: 3, description: 'Wireless Mouse', quantity: 10, unitPrice: 25.00, total: 250.00 }
      ],
      subtotal: 3900.00,
      taxRate: 0.08,
      taxAmount: 312.00,
      total: 4212.00,
      notes: 'Thank you for your business!'
    };

    // Simulate API request
    setTimeout(() => {
      setInvoice(mockInvoice);
      setLoading(false);
    }, 500);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleDelete = () => {
    // In a real app, you would call an API to delete the invoice
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      alert(`Invoice ${invoice.invoiceNumber} has been deleted.`);
      navigate('/invoices');
    }
  };

  if (loading) {
    return <div className="invoice-detail-loading">Loading invoice...</div>;
  }

  if (!invoice) {
    return <div className="invoice-detail-error">Invoice not found</div>;
  }

  return (
    <div className="invoice-detail-container">
      <div className="invoice-detail-header">
        <div className="invoice-detail-title">
          <h2>Invoice {invoice.invoiceNumber}</h2>
          <span className={`invoice-status invoice-status-${invoice.status.toLowerCase()}`}>
            {invoice.status}
          </span>
        </div>
        <div className="invoice-detail-actions">
          <button onClick={handlePrint} className="invoice-action-btn print-btn">
            <i className="fas fa-print"></i> Print
          </button>
          <button onClick={handleEdit} className="invoice-action-btn edit-btn">
            <i className="fas fa-edit"></i> Edit
          </button>
          <button onClick={handleDelete} className="invoice-action-btn delete-btn">
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      <div className="invoice-detail-grid">
        <div className="invoice-company-info">
          <h3>Your Company Name</h3>
          <p>123 Company Street</p>
          <p>Business City, State 12345</p>
          <p>Phone: (555) 987-6543</p>
          <p>Email: contact@yourcompany.com</p>
        </div>

        <div className="invoice-customer-info">
          <h3>Bill To:</h3>
          <p><strong>{invoice.customer.name}</strong></p>
          <p>{invoice.customer.address}</p>
          <p>Phone: {invoice.customer.phone}</p>
          <p>Email: {invoice.customer.email}</p>
        </div>

        <div className="invoice-dates">
          <div className="invoice-date-item">
            <span>Invoice Number:</span>
            <strong>{invoice.invoiceNumber}</strong>
          </div>
          <div className="invoice-date-item">
            <span>Issue Date:</span>
            <strong>{invoice.issueDate}</strong>
          </div>
          <div className="invoice-date-item">
            <span>Due Date:</span>
            <strong>{invoice.dueDate}</strong>
          </div>
        </div>
      </div>

      <div className="invoice-items-section">
        <h3>Invoice Items</h3>
        <div className="invoice-items-table-container">
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
        </div>
      </div>

      <div className="invoice-summary">
        <div className="invoice-summary-row">
          <span>Subtotal:</span>
          <span>${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="invoice-summary-row">
          <span>Tax ({(invoice.taxRate * 100).toFixed(0)}%):</span>
          <span>${invoice.taxAmount.toFixed(2)}</span>
        </div>
        <div className="invoice-summary-row total">
          <span>Total:</span>
          <span>${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="invoice-notes">
        <h4>Notes</h4>
        <p>{invoice.notes}</p>
      </div>

      <div className="invoice-footer">
        <button onClick={() => navigate('/invoices')} className="back-to-list-btn">
          Back to Invoices
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;