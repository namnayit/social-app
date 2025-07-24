import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import PostCard from '../PostCard/PostCard';
import UserProfile from '../UserProfile/UserProfile';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import './FeedPage.css';

const FeedPage = ({ currentUser, onLogout }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'John',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        initial: 'N'
      },
      content: 'Nothing',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      likes: 2,
      comments: 0,
      timestamp: '12d ago',
      hasLiked: false
    },
    {
      id: 2,
      user: {
        name: 'MH Shuvo',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-...',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      likes: 0,
      comments: 0,
      timestamp: '14d ago',
      hasLiked: false,
      showMore: false
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewPostImage(null);
    setImagePreview('');
  };

  const handleCreatePost = () => {
    if (newPost.trim() || newPostImage) {
      const post = {
        id: posts.length + 1,
        user: currentUser,
        content: newPost.trim(),
        image: imagePreview,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        hasLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewPostImage(null);
      setImagePreview('');
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
          <UserProfile user={currentUser} posts={posts} />
        </div>
        
        <div className="main-feed">
          <div className="create-post">
            <div className="create-post-header">
              <img src={currentUser.avatar} alt="Your avatar" className="user-avatar-small" />
              <div className="user-info">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-time">Just now</div>
              </div>
            </div>
            
            <textarea 
              placeholder="What's on your mind?" 
              className="post-input"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="preview-image" />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  ✕
                </button>
              </div>
            )}
            
            <div className="create-post-actions">
              <div className="post-options">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-input-hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="post-option">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Photo
                </label>
              </div>
              
              <button 
                className="btn post-btn"
                onClick={handleCreatePost}
                disabled={!newPost.trim() && !newPostImage}
              >
                Post
              </button>
            </div>
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
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;