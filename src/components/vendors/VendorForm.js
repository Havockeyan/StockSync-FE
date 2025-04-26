import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Vendors.css';

const VendorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  // If in edit mode, load vendor data (mock implementation)
  React.useEffect(() => {
    if (isEditMode) {
      // This would normally fetch data from an API
      // Mock data for demonstration
      const mockVendor = {
        id: parseInt(id),
        name: 'Acme Supplies',
        phone: '(555) 987-6543',
        email: 'sales@acmesupplies.com',
        address: '456 Commerce Ave, Industry City, CA'
      };
      
      setFormData(mockVendor);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Phone format should be (XXX) XXX-XXXX';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would save to an API
      console.log('Saving vendor:', formData);
      
      // Redirect back to vendors list
      navigate('/vendors');
    }
  };

  const handleCancel = () => {
    navigate('/vendors');
  };

  return (
    <div className="vendor-form-container">
      <h2 className="form-title">
        {isEditMode ? 'Edit Vendor' : 'Add New Vendor'}
      </h2>
      
      <form onSubmit={handleSubmit} className="vendor-form">
        <div className="form-group">
          <label htmlFor="name">Vendor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter vendor name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="(XXX) XXX-XXXX"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            rows="3"
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
        
        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Vendor' : 'Add Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;