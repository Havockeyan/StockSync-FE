import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth components
import Login from './components/Login';
import Signup from './components/Signup';

// Layout
import MainLayout from './components/layout/MainLayout';

// Modules
import Dashboard from './components/Dashboard';

// Customer module
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';

// Vendor module
import VendorList from './components/vendors/VendorList';
import VendorForm from './components/vendors/VendorForm';

// Item module
import ItemList from './components/items/ItemList';
import ItemForm from './components/items/ItemForm';

// Auth guard for protected routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
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
          
          <Route path="/customers/edit/:id" element={
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
          
          <Route path="/vendors/edit/:id" element={
            <PrivateRoute>
              <MainLayout>
                <VendorForm />
              </MainLayout>
            </PrivateRoute>
          } />
          
          {/* Item routes */}
          <Route path="/items" element={
            <PrivateRoute>
              <MainLayout>
                <ItemList />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/items/new" element={
            <PrivateRoute>
              <MainLayout>
                <ItemForm />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/items/edit/:id" element={
            <PrivateRoute>
              <MainLayout>
                <ItemForm />
              </MainLayout>
            </PrivateRoute>
          } />
          
          {/* Placeholder routes for other modules */}
          <Route path="/invoices" element={
            <PrivateRoute>
              <MainLayout>
                <div className="coming-soon">
                  <h2>Invoices Module</h2>
                  <p>Coming soon...</p>
                </div>
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/bills" element={
            <PrivateRoute>
              <MainLayout>
                <div className="coming-soon">
                  <h2>Bills Module</h2>
                  <p>Coming soon...</p>
                </div>
              </MainLayout>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;