import { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
          <div className="post-user-info">
            <h4 className="post-username">{post.user.name}</h4>
            <span className="post-timestamp">{post.timestamp}</span>
          </div>
        </div>
      </div>
      
      <div className="post-content">
        {post.content && <p className="post-text">{post.content}</p>}
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>
      
      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">👍</span>
          <span>{likes} Likes</span>
        </button>
        
        <button className="action-btn comment-btn">
          <span className="action-icon">💬</span>
          <span>{comments} comments</span>
        </button>
        
        <button className="action-btn share-btn">
          <span className="action-icon">📤</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;