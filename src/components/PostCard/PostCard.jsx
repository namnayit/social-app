import { useState } from "react";
import "./PostCard.css";

const PostCard = ({ post, onUpdatePost }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.existingComments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);

    const updatedPost = {
      ...post,
      likes: isLiked ? likes - 1 : likes + 1,
      totalComments: (post.existingComments?.length || 0) + comments.length,
    };
    onUpdatePost(post.id, updatedPost);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Michel Jennifer",
        text: newComment.trim(),
        timestamp: "Just now",
      };
      setComments([...comments, comment]);
      setNewComment("");

      const updatedPost = {
        ...post,
        totalComments:
          (post.existingComments?.length || 0) + comments.length + 1,
        existingComments: post.existingComments || [],
      };
      onUpdatePost(post.id, updatedPost);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="post-avatar"
          />
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
          className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => {
            handleLike();
            toggleComments();
          }}
        >
          <span className="action-icon">👍</span>
          <span>{likes} Likes</span>
        </button>

        <button
          className={`action-btn comment-btn ${showComments ? "active" : ""}`}
          onClick={toggleComments}
        >
          <span className="action-icon">💬</span>
          <span>
            {(post.existingComments?.length || 0) + comments.length} comments
          </span>
        </button>

        <button className="action-btn share-btn">
          <span className="action-icon">📤</span>
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              className="input comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button
              className="btn btn-primary comment-btn-submit"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </div>

          <div className="comments-list">
            {post.existingComments?.map((comment) => (
              <div key={`existing-${comment.id}`} className="comment-item">
                <div className="comment-user">{comment.user}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-timestamp">{comment.timestamp}</div>
              </div>
            ))}
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-user">{comment.user}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-timestamp">{comment.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
