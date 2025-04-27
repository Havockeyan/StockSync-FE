import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import InvoiceList from './InvoiceList';

// Mock navigate function since we can't use useNavigate in tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('InvoiceList Component', () => {
  test('renders invoice list with title', () => {
    render(
      <BrowserRouter>
        <InvoiceList />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Invoices')).toBeInTheDocument();
  });

  test('renders add invoice button', () => {
    render(
      <BrowserRouter>
        <InvoiceList />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Add Invoice/i)).toBeInTheDocument();
  });

  test('displays invoices from mock data', () => {
    render(
      <BrowserRouter>
        <InvoiceList />
      </BrowserRouter>
    );
    
    // Check if at least one invoice from mock data appears
    expect(screen.getByText('INV-001')).toBeInTheDocument();
  });

  test('filters invoices when searching', () => {
    render(
      <BrowserRouter>
        <InvoiceList />
      </BrowserRouter>
    );
    
    // Enter search term
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'INV-001' } });
    
    // After filtering, INV-001 should be visible but INV-002 should not
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.queryByText('INV-002')).not.toBeInTheDocument();
  });

  test('shows no invoices message when filter has no results', () => {
    render(
      <BrowserRouter>
        <InvoiceList />
      </BrowserRouter>
    );
    
    // Enter search term that won't match any invoices
    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentInvoice' } });
    
    // Check if the no invoices found message appears
    expect(screen.getByText(/No invoices found/i)).toBeInTheDocument();
  });
});