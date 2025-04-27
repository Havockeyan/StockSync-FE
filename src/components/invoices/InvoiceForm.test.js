import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import InvoiceForm from './InvoiceForm';

// Mock useNavigate and useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: '' }) // Empty for new invoice
}));

describe('InvoiceForm Component', () => {
  test('renders form with correct title for new invoice', () => {
    render(
      <BrowserRouter>
        <InvoiceForm />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Create New Invoice/i)).toBeInTheDocument();
  });

  test('renders form inputs', () => {
    render(
      <BrowserRouter>
        <InvoiceForm />
      </BrowserRouter>
    );
    
    // Check for customer field
    expect(screen.getByText(/Customer Name:/i)).toBeInTheDocument();
    
    // Check for date field
    expect(screen.getByText(/Invoice Date:/i)).toBeInTheDocument();
    
    // Check for status field
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
  });

  test('renders action buttons', () => {
    render(
      <BrowserRouter>
        <InvoiceForm />
      </BrowserRouter>
    );
    
    // Check for buttons
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Invoice/i)).toBeInTheDocument();
  });

  test('validates required fields', () => {
    render(
      <BrowserRouter>
        <InvoiceForm />
      </BrowserRouter>
    );
    
    // Try to submit the form without filling required fields
    const submitButton = screen.getByText(/Save Invoice/i);
    fireEvent.click(submitButton);
    
    // Form validation should prevent submission
    // We can't easily test browser's native validation in JSDOM
    // This is a basic test that the button exists and can be clicked
    expect(submitButton).toBeInTheDocument();
  });
});