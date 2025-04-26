import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ItemForm from './ItemForm';

// Mock navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: undefined })
}));

describe('ItemForm Component', () => {
  test('renders form with correct title', () => {
    render(
      <BrowserRouter>
        <ItemForm />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
  });
  
  test('renders all input fields', () => {
    render(
      <BrowserRouter>
        <ItemForm />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unit Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cost Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unit Value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unit Type/i)).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });
  
  test('displays validation errors for empty fields', () => {
    render(
      <BrowserRouter>
        <ItemForm />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByText('Add Item');
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/Item name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Unit price is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Cost price is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Unit value is required/i)).toBeInTheDocument();
  });
  
  test('allows form submission when all required fields are filled', () => {
    render(
      <BrowserRouter>
        <ItemForm />
      </BrowserRouter>
    );
    
    // Fill in the required fields
    fireEvent.change(screen.getByLabelText(/Item Name/i), { 
      target: { value: 'Test Item' } 
    });
    
    fireEvent.change(screen.getByLabelText(/Unit Price/i), { 
      target: { value: '10.99' } 
    });
    
    fireEvent.change(screen.getByLabelText(/Cost Price/i), { 
      target: { value: '8.99' } 
    });
    
    fireEvent.change(screen.getByLabelText(/Unit Value/i), { 
      target: { value: '1' } 
    });
    
    // No validation errors should appear on submit
    const submitButton = screen.getByText('Add Item');
    fireEvent.click(submitButton);
    
    expect(screen.queryByText(/Item name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Unit price is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cost price is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Unit value is required/i)).not.toBeInTheDocument();
  });
});