import "./UserProfile.css";

const UserProfile = ({ user, posts, events }) => {
  // Calculate real stats from posts
  const totalPosts = posts.filter(
    (post) => post.user.name === user.name
  ).length;

  // Calculate real stats from events
  const totalEvents = events.filter(
    (event) => event.organizer === "@mithshuvoalways"
  ).length;

  // Calculate real stats from comments across all posts
  const totalComments = posts.reduce((total, post) => {
    return total + (post.comments ? post.comments.length : 0);
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
          <span className="stat-number">{totalEvents}</span>
          <span className="stat-label">Events</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalComments}</span>
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