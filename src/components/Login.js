import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please enter all fields');
      return;
    }

    // Check for admin credentials
    if ((email === 'admin' && password === 'admin') || 
        (email === 'demo@example.com' && password === 'password')) {
      // Store user info (in a real app, you'd store auth tokens)
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin/admin or demo@example.com/password');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login to Inventory System</h2>
        
        <div className="form-group">
          <label htmlFor="email">Username or Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            placeholder="Enter your username or email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="form-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;