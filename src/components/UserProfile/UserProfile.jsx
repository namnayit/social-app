import "./UserProfile.css";

const UserProfile = ({ user, posts }) => {
  // Calculate real stats from posts
  const totalPosts = posts.filter(
    (post) => post.user.name === user.name
  ).length;

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
          <span className="stat-number">1</span>
          <span className="stat-label">Events</span>
        </div>
        <div className="stat">
          <span className="stat-number">1</span>
          <span className="stat-label">Comments</span>
        </div>
      </div>

      <button className="view-profile-btn">
        View Profile
      </button>
    </div>
  );
};

export default UserProfile;