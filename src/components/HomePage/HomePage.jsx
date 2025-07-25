import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-logo">
          <div className="logo-icon">
            <svg width="40" height="40" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="home-title">Welcome to <span className="brand">GreenLeaf</span></h1>
          <p className="home-subtitle">
            Connect, share, and engage with your community. Join events, share moments, and build meaningful connections.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="feature-title">Share & Connect</h3>
            <p className="feature-description">
              Post updates, photos, and connect with friends
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="feature-title">Join Events</h3>
            <p className="feature-description">
              Discover and RSVP to exciting local events
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="feature-title">Build Community</h3>
            <p className="feature-description">
              Like, comment, and engage with your network
            </p>
          </div>
        </div>

        <div className="home-actions">
          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>
          <Link to="/login" className="view-feed-btn">
            View Feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;