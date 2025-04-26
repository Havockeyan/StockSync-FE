import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import VendorList from './components/vendors/VendorList';
import VendorForm from './components/vendors/VendorForm';
import MainLayout from './components/layout/MainLayout';
import './App.css';

// PrivateRoute wrapper component
const PrivateRoute = ({ children }) => {
  // Check if user is logged in (in a real app, this would validate the auth token)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render the protected component
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        } />
        
        {/* Customer routes */}
        <Route path="/customers" element={
          <PrivateRoute>
            <MainLayout>
              <CustomerList />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/customers/new" element={
          <PrivateRoute>
            <MainLayout>
              <CustomerForm />
            </MainLayout>
          </PrivateRoute>
        } />
        
        {/* Vendor routes */}
        <Route path="/vendors" element={
          <PrivateRoute>
            <MainLayout>
              <VendorList />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/vendors/new" element={
          <PrivateRoute>
            <MainLayout>
              <VendorForm />
            </MainLayout>
          </PrivateRoute>
        } />
        
        {/* Placeholder routes for future modules */}
        <Route path="/items" element={
          <PrivateRoute>
            <MainLayout>
              <div className="coming-soon">
                <h2>Items Module</h2>
                <p>This module is coming soon!</p>
              </div>
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/invoices" element={
          <PrivateRoute>
            <MainLayout>
              <div className="coming-soon">
                <h2>Invoices Module</h2>
                <p>This module is coming soon!</p>
              </div>
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/bills" element={
          <PrivateRoute>
            <MainLayout>
              <div className="coming-soon">
                <h2>Bills Module</h2>
                <p>This module is coming soon!</p>
              </div>
            </MainLayout>
          </PrivateRoute>
        } />
        
        {/* Redirect all other routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;