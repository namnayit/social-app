import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import PostCard from "../PostCard/PostCard";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import UserProfile from "../UserProfile/UserProfile";
import "./FeedPage.css";

const FeedPage = ({ currentUser, onLogout, posts, setPosts, onUpdatePost, onDeletePost }) => {
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
              placeholder="What's on your mind?"
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
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="post-option">
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

          <div className="posts">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onUpdatePost={onUpdatePost}
                onDeletePost={onDeletePost}
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
