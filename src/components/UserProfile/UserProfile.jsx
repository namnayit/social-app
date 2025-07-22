import "./UserProfile.css";

const UserProfile = ({ user, posts }) => {
  // Calculate real stats from posts
  const totalPosts = posts.filter(
    (post) => post.user.name === user.name
  ).length;
  const totalComments = posts.reduce((sum, post) => {
    return sum + (post.totalComments || 0);
  }, 0);

  return (
    <div className="user-profile">
      <div className="profile-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <h3 className="profile-name">{user.name}</h3>
      <p className="profile-profession">{user.profession}</p>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{totalPosts}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalComments}</span>
          <span className="stat-label">Comments</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
