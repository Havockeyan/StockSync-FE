import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customers.css';

const CustomerForm = () => {
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s()+-]+$/.test(customer.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!customer.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        console.log('Customer data submitted:', customer);
        // Reset form status
        setIsSubmitting(false);
        
        // Show success message and redirect
        alert('Customer added successfully!');
        navigate('/customers');
      }, 1000);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add New Customer</h2>
        <button className="back-button" onClick={() => navigate('/customers')}>
          <i className="fas fa-arrow-left"></i> Back to Customers
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-group">
          <label htmlFor="name">
            Customer Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter customer name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter phone number"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="address">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            placeholder="Enter complete address"
            rows="3"
          ></textarea>
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={customer.notes}
            onChange={handleChange}
            placeholder="Enter any additional information (optional)"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/customers')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Save Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;