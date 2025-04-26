import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username/email and password');
      return;
    }

    // Check for admin credentials or demo credentials
    if ((credentials.username === 'admin' && credentials.password === 'admin') ||
        (credentials.username === 'demo@example.com' && credentials.password === 'password')) {
      
      // Store login state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', credentials.username);
      
      console.log('Login successful');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin/admin or demo@example.com/password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Inventory Management System</h2>
        <h3>Login</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter admin or demo@example.com"
              value={credentials.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <button type="submit" className="auth-btn">Login</button>
          
          <div className="form-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;