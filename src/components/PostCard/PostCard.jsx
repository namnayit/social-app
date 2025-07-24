import { useState } from "react";
import "./PostCard.css";

const PostCard = ({ post, onUpdatePost }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(post.hasLiked || false);
  const [showMore, setShowMore] = useState(post.showMore || false);

  const handleLike = () => {
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    const newHasLiked = !hasLiked;
    
    setLikes(newLikes);
    setHasLiked(newHasLiked);

    const updatedPost = {
      ...post,
      likes: newLikes,
      hasLiked: newHasLiked,
    };
    onUpdatePost(post.id, updatedPost);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const shouldTruncate = post.content && post.content.length > 150;
  const displayContent = shouldTruncate && !showMore 
    ? post.content.substring(0, 150) + '...' 
    : post.content;

  return (
    <div className="post-card">
      <div className="post-header">
        {post.user.initial ? (
          <div className="post-avatar-circle">
            {post.user.initial}
          </div>
        ) : (
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="post-avatar"
          />
        )}
        <div className="post-user-info">
          <h4 className="post-username">{post.user.name}</h4>
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
      </div>

      <div className="post-content">
        {post.content && (
          <div>
            <p className="post-text">{displayContent}</p>
            {shouldTruncate && (
              <button className="see-more-btn" onClick={toggleShowMore}>
                {showMore ? 'See less' : 'See more'}
              </button>
            )}
          </div>
        )}
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>

      <div className="post-actions">
        <div className="action-group">
          <button
            className={`action-btn ${hasLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <svg width="20" height="20" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likes}
          </button>

          <button className="action-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comments}
          </button>
        </div>

        <button className="share-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostCard;