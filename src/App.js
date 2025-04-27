import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/Dashboard';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import VendorList from './components/vendors/VendorList';
import VendorForm from './components/vendors/VendorForm';
import ItemList from './components/items/ItemList';
import ItemForm from './components/items/ItemForm';
import InvoiceList from './components/invoices/InvoiceList';
import InvoiceForm from './components/invoices/InvoiceForm';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><MainLayout><CustomerList /></MainLayout></PrivateRoute>} />
        <Route path="/customers/new" element={<PrivateRoute><MainLayout><CustomerForm /></MainLayout></PrivateRoute>} />
        <Route path="/vendors" element={<PrivateRoute><MainLayout><VendorList /></MainLayout></PrivateRoute>} />
        <Route path="/vendors/new" element={<PrivateRoute><MainLayout><VendorForm /></MainLayout></PrivateRoute>} />
        <Route path="/items" element={<PrivateRoute><MainLayout><ItemList /></MainLayout></PrivateRoute>} />
        <Route path="/items/new" element={<PrivateRoute><MainLayout><ItemForm /></MainLayout></PrivateRoute>} />
        <Route path="/invoices" element={<PrivateRoute><MainLayout><InvoiceList /></MainLayout></PrivateRoute>} />
        <Route path="/invoices/new" element={<PrivateRoute><MainLayout><InvoiceForm /></MainLayout></PrivateRoute>} />
        <Route path="/invoices/:id" element={<PrivateRoute><MainLayout><InvoiceForm /></MainLayout></PrivateRoute>} />
      </ Routes>
    </Router>
  );
}

export default App;