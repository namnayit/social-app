import { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    const userData = {
      id: 1,
      name: 'MH Shuvo',
      email: email,
      profession: 'Developer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    };
    onLogin(userData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <div className="logo-icon">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="login-title">Welcome to <span className="brand">GreenLeaf</span></h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Sign In</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn login-btn">
            Sign In
          </button>
          
          <div className="login-links">
            <a href="#" className="login-link">Don't have an account? Sign up</a>
            <a href="#" className="back-link">← Back to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;