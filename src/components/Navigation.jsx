import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ currentUser, onLogout }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/feed" className="logo">SK</Link>
        
        <div className="nav-links">
          <Link to="/feed" className="nav-link">Feed</Link>
          <Link to="/event/1" className="nav-link">Events</Link>
        </div>
        
        <div className="nav-user">
          <img src={currentUser.avatar} alt="Profile" className="nav-avatar" />
          <span className="nav-username">{currentUser.name}</span>
          <button onClick={onLogout} className="btn btn-secondary logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;