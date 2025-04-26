import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CustomerForm.css';

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      // In a real app, this would fetch data from API
      // For now, we'll use mock data
      const mockCustomer = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        address: '123 Main St, Anytown, USA'
      };
      setFormData(mockCustomer);
    }
  }, [isEditMode, id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send data to an API
      console.log('Submitting customer data:', formData);
      
      // Navigate back to customer list
      navigate('/customers');
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h2>
        <button className="back-btn" onClick={() => navigate('/customers')}>
          Back to List
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-group">
          <label htmlFor="name">Customer Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete address"
            rows="4"
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        
        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Customer' : 'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;