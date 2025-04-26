import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Items.css';

const ItemForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Initial form state
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    unitPrice: '',
    costPrice: '',
    unitValue: '',
    unitType: 'piece' // Default unit type
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Unit type options
  const unitTypeOptions = [
    'piece', 
    'box', 
    'pack', 
    'kg', 
    'liter', 
    'meter', 
    'sheets',
    'dozen',
    'set'
  ];

  // If in edit mode, fetch item data
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch from API
      // For now, mock data
      const mockItem = {
        id: '1',
        itemName: 'Laptop',
        description: 'High-performance business laptop',
        unitPrice: 1299.99,
        costPrice: 899.99,
        unitValue: 1,
        unitType: 'piece'
      };
      
      setFormData(mockItem);
    }
  }, [isEditMode, id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    
    if (!formData.unitPrice) {
      newErrors.unitPrice = 'Unit price is required';
    } else if (isNaN(formData.unitPrice) || Number(formData.unitPrice) <= 0) {
      newErrors.unitPrice = 'Unit price must be a positive number';
    }
    
    if (!formData.costPrice) {
      newErrors.costPrice = 'Cost price is required';
    } else if (isNaN(formData.costPrice) || Number(formData.costPrice) <= 0) {
      newErrors.costPrice = 'Cost price must be a positive number';
    }
    
    if (!formData.unitValue) {
      newErrors.unitValue = 'Unit value is required';
    } else if (isNaN(formData.unitValue) || Number(formData.unitValue) <= 0) {
      newErrors.unitValue = 'Unit value must be a positive number';
    }
    
    if (!formData.unitType) {
      newErrors.unitType = 'Unit type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, send to API
      console.log('Submitting item data:', formData);
      
      // Navigate back to item list
      navigate('/items');
    }
  };

  return (
    <div className="item-form-container">
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
        <button 
          className="back-btn"
          onClick={() => navigate('/items')}
        >
          Back to List
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="itemName">Item Name*</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className={`form-control ${errors.itemName ? 'is-invalid' : ''}`}
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
          />
          {errors.itemName && <div className="error-message">{errors.itemName}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            rows="3"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price ($)*</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              className={`form-control ${errors.unitPrice ? 'is-invalid' : ''}`}
              value={formData.unitPrice}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.unitPrice && <div className="error-message">{errors.unitPrice}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="costPrice">Cost Price ($)*</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              className={`form-control ${errors.costPrice ? 'is-invalid' : ''}`}
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.costPrice && <div className="error-message">{errors.costPrice}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unitValue">Unit Value*</label>
            <input
              type="number"
              id="unitValue"
              name="unitValue"
              className={`form-control ${errors.unitValue ? 'is-invalid' : ''}`}
              value={formData.unitValue}
              onChange={handleChange}
              placeholder="Enter unit value"
              min="0"
              step="0.01"
            />
            {errors.unitValue && <div className="error-message">{errors.unitValue}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="unitType">Unit Type*</label>
            <select
              id="unitType"
              name="unitType"
              className={`form-control ${errors.unitType ? 'is-invalid' : ''}`}
              value={formData.unitType}
              onChange={handleChange}
            >
              {unitTypeOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            {errors.unitType && <div className="error-message">{errors.unitType}</div>}
          </div>
        </div>
        
        <div className="form-buttons">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/items')}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;