import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import MainLayout from './components/layout/MainLayout';
import './App.css';

const App = () => {
  // Protected route component
  const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes with MainLayout */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/customers" 
            element={
              <PrivateRoute>
                <MainLayout>
                  <CustomerList />
                </MainLayout>
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/customers/new" 
            element={
              <PrivateRoute>
                <MainLayout>
                  <CustomerForm />
                </MainLayout>
              </PrivateRoute>
            } 
          />
          
          {/* Future modules can be added here */}
          <Route path="/items" element={<PrivateRoute><MainLayout><div>Items Module (Coming Soon)</div></MainLayout></PrivateRoute>} />
          <Route path="/vendors" element={<PrivateRoute><MainLayout><div>Vendors Module (Coming Soon)</div></MainLayout></PrivateRoute>} />
          <Route path="/invoices" element={<PrivateRoute><MainLayout><div>Invoices Module (Coming Soon)</div></MainLayout></PrivateRoute>} />
          <Route path="/bills" element={<PrivateRoute><MainLayout><div>Bills Module (Coming Soon)</div></MainLayout></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;