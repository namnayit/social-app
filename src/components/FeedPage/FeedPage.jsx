import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import PostCard from '../PostCard/PostCard';
import UserProfile from '../UserProfile/UserProfile';
import './FeedPage.css';

const FeedPage = ({ currentUser, onLogout }) => {
  const [posts, setPosts] = useState([
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

  const [newPost, setNewPost] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim() || newPostImage.trim()) {
      const post = {
        id: posts.length + 1,
        user: currentUser,
        content: newPost.trim(),
        image: newPostImage.trim(),
        likes: 0,
        comments: 0,
        timestamp: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewPostImage('');
    }
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === postId ? updatedPost : post
    ));
  };

  return (
    <div className="feed-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
      
      <div className="feed-container">
        <div className="sidebar-left">
          <UserProfile user={currentUser} />
        </div>
        
        <div className="main-feed">
          <div className="create-post">
            <div className="create-post-input">
              <img src={currentUser.avatar} alt="Your avatar" className="avatar-small" />
              <input 
                type="text" 
                placeholder="What's on your mind?" 
                className="input post-input"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <div className="create-post-image">
              <input 
                type="url" 
                placeholder="Add image URL (optional)" 
                className="input image-input"
                value={newPostImage}
                onChange={(e) => setNewPostImage(e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary post-btn"
              onClick={handleCreatePost}
              disabled={!newPost.trim() && !newPostImage.trim()}
            >
              Post
            </button>
          </div>
          
          <div className="posts">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onUpdatePost={handleUpdatePost}
              />
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