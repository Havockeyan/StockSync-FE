import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Items.css';

const ItemList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for items
  const [items, setItems] = useState([
    {
      id: '1',
      itemName: 'Laptop',
      description: 'High-performance business laptop',
      unitPrice: 1299.99,
      costPrice: 899.99,
      unitValue: 1,
      unitType: 'piece'
    },
    {
      id: '2',
      itemName: 'Office Chair',
      description: 'Ergonomic office chair with lumbar support',
      unitPrice: 249.99,
      costPrice: 149.99,
      unitValue: 1,
      unitType: 'piece'
    },
    {
      id: '3',
      itemName: 'Printer Paper',
      description: 'A4 printer paper, 80gsm',
      unitPrice: 5.99,
      costPrice: 3.50,
      unitValue: 500,
      unitType: 'sheets'
    },
    {
      id: '4',
      itemName: 'Ballpoint Pens',
      description: 'Blue ballpoint pens, medium point',
      unitPrice: 12.99,
      costPrice: 7.50,
      unitValue: 12,
      unitType: 'pack'
    },
    {
      id: '5',
      itemName: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness',
      unitPrice: 34.99,
      costPrice: 21.50,
      unitValue: 1,
      unitType: 'piece'
    }
  ]);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit item
  const handleEdit = (id) => {
    navigate(`/items/edit/${id}`);
  };

  // Handle delete item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="item-list-container">
      <div className="item-list-header">
        <h2 className="item-list-title">Items</h2>
        <div className="item-controls">
          <input
            type="text"
            className="item-search"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="add-item-btn"
            onClick={() => navigate('/items/new')}
          >
            <i className="fas fa-plus"></i> Add Item
          </button>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <table className="item-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Cost Price</th>
              <th>Unit Value</th>
              <th>Unit Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.costPrice.toFixed(2)}</td>
                <td>{item.unitValue}</td>
                <td>{item.unitType}</td>
                <td>
                  <div className="item-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-items">
          No items found. Try a different search or add a new item.
        </div>
      )}
    </div>
  );
};

export default ItemList;