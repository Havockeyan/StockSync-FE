import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ItemList from './ItemList';

// Mock navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ItemList Component', () => {
  test('renders item list with title', () => {
    render(
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    );
    
    // Check if the component renders the title
    expect(screen.getByText('Items')).toBeInTheDocument();
  });
  
  test('renders add item button', () => {
    render(
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    );
    
    // Check if the add button exists
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
  });
    
  test('displays items from mock data', () => {
    render(
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    );
    
    // Check if items from mock data appear
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Office Chair')).toBeInTheDocument();
  });
    
  test('filters items when searching', () => {
    render(
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    );
    
    // Type in search box
    const searchInput = screen.getByPlaceholderText('Search items...');
    fireEvent.change(searchInput, { target: { value: 'Desk' } });
    
    // After filtering, Laptop should not be visible but Desk Lamp should be
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
    expect(screen.getByText('Desk Lamp')).toBeInTheDocument();
  });
    
  test('shows no items message when filter has no results', () => {
    render(
      <BrowserRouter>
        <ItemList />
      </BrowserRouter>
    );
    
    // Type a search term that won't match any items
    const searchInput = screen.getByPlaceholderText('Search items...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentItem' } });
    
    // Check if the no items found message appears
    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });
});