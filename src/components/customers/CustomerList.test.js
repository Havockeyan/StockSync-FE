import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerList from './CustomerList';

// Mock navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('CustomerList Component', () => {
  test('renders customer list with title', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );
    
    // Check if the component renders the title
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });
  
  test('renders add customer button', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );
    
    // Check if the add button exists
    expect(screen.getByText(/Add Customer/i)).toBeInTheDocument();
  });
  
  test('displays customers from mock data', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );
    
    // Check if at least one customer from mock data appears
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
  
  test('filters customers when searching', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );
    
    // Type in the search field
    const searchInput = screen.getByPlaceholderText('Search customers...');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    
    // After filtering, John should not be visible but Jane should be
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
  test('shows no customers message when filter has no results', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );
    
    // Search for a non-existent customer
    const searchInput = screen.getByPlaceholderText('Search customers...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentCustomer' } });
    
    // Check if the no customers found message appears
    expect(screen.getByText(/No customers found/i)).toBeInTheDocument();
  });
});