import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import PostCard from './PostCard';
import UserProfile from './UserProfile';
import './FeedPage.css';

const FeedPage = ({ currentUser, onLogout }) => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: 'David Chen',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'Check out this amazing view from my hiking trip!',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      likes: 200,
      comments: 3,
      timestamp: '1 sec ago'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'Great coffee and even better company at the new cafe downtown!',
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      likes: 156,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'Working on a new project. Excited to share it with everyone soon!',
      likes: 89,
      comments: 12,
      timestamp: '4 hours ago'
    }
  ]);

  return (
    <div className="feed-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
      
      <div className="feed-container">
        <div className="sidebar-left">
          <UserProfile user={currentUser} />
          
          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/event/1">Upcoming Events</Link></li>
              <li><a href="#groups">Groups</a></li>
              <li><a href="#friends">Friends</a></li>
              <li><a href="#messages">Messages</a></li>
            </ul>
          </div>
        </div>
        
        <div className="main-feed">
          <div className="create-post">
            <div className="create-post-input">
              <img src={currentUser.avatar} alt="Your avatar" className="avatar-small" />
              <input 
                type="text" 
                placeholder="What's on your mind?" 
                className="input post-input"
              />
            </div>
            <button className="btn btn-primary post-btn">Post</button>
          </div>
          
          <div className="posts">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        <div className="sidebar-right">
          <div className="trending">
            <h3>Trending</h3>
            <div className="trending-item">
              <span className="trend-tag">#ReactJS</span>
              <span className="trend-count">1.2K posts</span>
            </div>
            <div className="trending-item">
              <span className="trend-tag">#WebDevelopment</span>
              <span className="trend-count">856 posts</span>
            </div>
            <div className="trending-item">
              <span className="trend-tag">#Photography</span>
              <span className="trend-count">723 posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;