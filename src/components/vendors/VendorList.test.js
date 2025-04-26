import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import VendorList from './VendorList';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('VendorList Component', () => {
  test('renders vendor list with title', () => {
    render(
      <BrowserRouter>
        <VendorList />
      </BrowserRouter>
    );
    
    // Check if the component renders the title
    expect(screen.getByText('Vendors')).toBeInTheDocument();
  });
  
  test('renders add new vendor button', () => {
    render(
      <BrowserRouter>
        <VendorList />
      </BrowserRouter>
    );
    
    // Check if the add button exists
    expect(screen.getByText(/Add New Vendor/i)).toBeInTheDocument();
  });
    
  test('displays vendors from mock data', () => {
    render(
      <BrowserRouter>
        <VendorList />
      </BrowserRouter>
    );
    
    // Check if at least one vendor from mock data appears
    expect(screen.getByText('Tech Supplies Inc')).toBeInTheDocument();
    expect(screen.getByText('contact@techsupplies.com')).toBeInTheDocument();
  });
  
  test('filters vendors when searching', () => {
    render(
      <BrowserRouter>
        <VendorList />
      </BrowserRouter>
    );
    
    // Get the search input and type in it
    const searchInput = screen.getByPlaceholderText('Search vendors...');
    fireEvent.change(searchInput, { target: { value: 'Office' } });
    
    // After filtering, Tech Supplies should not be visible but Office Solutions should be
    expect(screen.queryByText('Tech Supplies Inc')).not.toBeInTheDocument();
    expect(screen.getByText('Office Solutions')).toBeInTheDocument();
  });
  
  test('shows no vendors message when filter has no results', () => {
    render(
      <BrowserRouter>
        <VendorList />
      </BrowserRouter>
    );
    
    // Get the search input and type a search term that won't match any vendors
    const searchInput = screen.getByPlaceholderText('Search vendors...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentVendor' } });
    
    // Check if the no vendors found message appears
    expect(screen.getByText(/No vendors found/i)).toBeInTheDocument();
  });
});