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
      name: 'Michel Jennifer',
      email: email,
      profession: 'Journalist',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    };
    onLogin(userData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-circle">
          <span className="logo-text">SK</span>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email or Phone number"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            Log in
          </button>
          
          <button type="button" className="btn btn-secondary forgot-btn">
            Forgot Password
          </button>
          
          <button type="button" className="btn btn-secondary create-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;