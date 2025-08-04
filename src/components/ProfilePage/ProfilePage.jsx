import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import PostCard from "../PostCard/PostCard";
import EventModal from "../EventModal/EventModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import "./ProfilePage.css";

const ProfilePage = ({ currentUser, onLogout, posts, setPosts, onUpdatePost, onDeletePost, events, onCreateEvent, onDeleteEvent }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [newPost, setNewPost] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [user, setUser] = useState(currentUser);

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
  
  // Filter events to show only current user's events
  const userEvents = events.filter(event => event.organizer === "@mithshuvoalways");

  // Calculate dynamic stats
  const totalUserPosts = userPosts.length;
  const totalUserEvents = userEvents.length;
  const totalUserComments = posts.reduce((total, post) => {
    return total + (post.comments ? post.comments.length : 0);
  }, 0);

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(eventId);
    }
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    // You can also update the global user state here if needed
  };

  return (
    <div className="profile-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img
                src={user.avatar}
                alt={user.name}
                className="profile-avatar-large"
              />
              <div className="online-indicator"></div>
              <button 
                className="profile-edit-camera-btn"
                onClick={() => setShowProfileEditModal(true)}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-name-large">{user.name}</h1>
                <button className="edit-btn" onClick={() => setShowProfileEditModal(true)}>
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
              <div className="profile-profession-large">{user.profession}</div>
              {user.bio && (
                <div className="profile-bio">{user.bio}</div>
              )}

              <div className="profile-stats-large">
                <div className="stat-item">
                  <span className="stat-number">{totalUserPosts}</span>
                  <span>Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{totalUserEvents}</span>
                  <span>Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{totalUserComments}</span>
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
          <button className="new-event-btn" onClick={() => setShowEventModal(true)}>
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
                src={user.avatar}
                alt="Your avatar"
                className="user-avatar-small"
              />
              <div className="user-info">
                <div className="user-name">{user.name}</div>
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
                  currentUser={user}
                  onUpdatePost={onUpdatePost}
                  onDeletePost={onDeletePost}
                />
              ))}
            </div>
          )}

          {activeTab === "Events" && (
            <div className="posts">
              {userEvents.length > 0 ? (
                userEvents.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      <button 
                        className="delete-event-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <img src={event.image} alt={event.title} className="event-image" />
                    <div className="event-content">
                      <div className="event-meta">
                        <div className="event-meta-item">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.dateTime).toLocaleDateString()} at {new Date(event.dateTime).toLocaleTimeString()}
                        </div>
                        <div className="event-meta-item">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue}
                        </div>
                      </div>
                      <p className="event-description">{event.description}</p>
                      <div className="event-stats">
                        <span>{event.attending} attending</span>
                        <span>{event.notAttending} not attending</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                  <p style={{ color: '#6b7280', fontSize: '16px' }}>
                    {`No events created yet. Click "New Event" to create your first event!`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <EventModal 
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          onCreateEvent={onCreateEvent}
        />
        
        <ProfileEditModal 
          isOpen={showProfileEditModal}
          onClose={() => setShowProfileEditModal(false)}
          currentUser={user}
          onUpdateProfile={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default ProfilePage;