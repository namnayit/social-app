import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [newPost, setNewPost] = useState("");

  // Sample user posts data
  const userPosts = [
    {
      id: 1,
      content: "Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 1,
      comments: 0,
      date: "July 10, 2025"
    },
    {
      id: 2,
      content: "SL Vs BAN 3rd ODI FREE Live Streaming Details: When And Where To Watch Sri Lanka vs Bangladesh Series Decider Match Live Telecast On TV, Mobile APPs Online Sri Lanka and Bangladesh will face off in the series-deciding 3rd ODI on July 8 in Pallekele. With the series level at 1-1, Sri Lanka aim for a fifth consecutive home win, while Bangladesh seek their first ODI series triumph in Sri Lanka. Scroll down for the complete live streaming details.",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 3,
      comments: 0,
      date: "July 10, 2025"
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Handle post creation logic here
      setNewPost("");
    }
  };

  return (
    <div className="profile-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="profile-avatar-large"
              />
              <div className="online-indicator"></div>
            </div>
            
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-name-large">MH Shuvo</h1>
                <button className="edit-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
              
              <div className="profile-username">@mithshuvoalways</div>
              <div className="profile-profession-large">Developer</div>
              
              <div className="profile-stats-large">
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span>Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1</span>
                  <span>Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span>Comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <div className="tabs-left">
            <button 
              className={`tab-btn ${activeTab === "Posts" ? "active" : ""}`}
              onClick={() => setActiveTab("Posts")}
            >
              Posts
            </button>
            <button 
              className={`tab-btn ${activeTab === "Events" ? "active" : ""}`}
              onClick={() => setActiveTab("Events")}
            >
              Events
            </button>
          </div>
          
          <button className="new-event-btn">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Event
          </button>
        </div>

        <div className="profile-content">
          <div className="create-post-profile">
            <div className="create-post-header-profile">
              <img
                src={currentUser.avatar}
                alt="Your avatar"
                className="create-post-avatar"
              />
              <input
                type="text"
                placeholder="What's happening in your green world?"
                className="create-post-input-profile"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            
            <div className="create-post-actions-profile">
              <button className="add-photo-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Add Photo
              </button>
              
              <button 
                className="post-btn-profile"
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
          </div>

          {activeTab === "Posts" && (
            <div className="user-posts">
              {userPosts.map((post) => (
                <div key={post.id} className="profile-post-card">
                  <div className="profile-post-content">
                    <p className="profile-post-text">{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="profile-post-image"
                      />
                    )}
                  </div>
                  
                  <div className="profile-post-actions">
                    <div className="profile-post-action">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </div>
                    
                    <div className="profile-post-action">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </div>
                    
                    <div className="profile-post-date">{post.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Events" && (
            <div className="user-posts">
              <div className="profile-post-card">
                <div className="profile-post-content">
                  <p className="profile-post-text">No events created yet. Click "New Event" to create your first event!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;