import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <h3 className="profile-name">{user.name}</h3>
      <p className="profile-profession">{user.profession}</p>
      
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">1,234</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat">
          <span className="stat-number">5,678</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;