import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import PostCard from "../PostCard/PostCard";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser, onLogout, posts, setPosts, onUpdatePost, onDeletePost }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [newPost, setNewPost] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
    setImagePreview("");
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
        timestamp: "Just now",
        hasLiked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setNewPostImage(null);
      setImagePreview("");
    }
  };

  // Filter posts to show only current user's posts
  const userPosts = posts.filter(post => post.user.name === currentUser.name);

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
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
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
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Event
          </button>
        </div>

        <div className="profile-content">
          <div className="create-post">
            <div className="create-post-header">
              <img
                src={currentUser.avatar}
                alt="Your avatar"
                className="user-avatar-small"
              />
              <div className="user-info">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-time">Just now</div>
              </div>
            </div>

            <textarea
              placeholder="What's happening in your green world?"
              className="post-input"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
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
                  id="image-upload-profile"
                />
                <label htmlFor="image-upload-profile" className="post-option">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
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

          {activeTab === "Posts" && (
            <div className="posts">
              {userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  onUpdatePost={onUpdatePost}
                  onDeletePost={onDeletePost}
                />
              ))}
            </div>
          )}

          {activeTab === "Events" && (
            <div className="posts">
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>
                  {`No events created yet. Click "New Event" to create your first event!`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;