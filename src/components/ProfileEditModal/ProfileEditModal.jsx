import { useState } from "react";
import "./ProfileEditModal.css";

const ProfileEditModal = ({ isOpen, onClose, currentUser, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    bio: currentUser?.bio || "",
    profession: currentUser?.profession || "",
    avatar: null
  });
  const [imagePreview, setImagePreview] = useState(currentUser?.avatar || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      bio: formData.bio,
      profession: formData.profession,
      avatar: imagePreview
    };
    
    onUpdateProfile(updatedUser);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: currentUser?.name || "",
      bio: currentUser?.bio || "",
      profession: currentUser?.profession || "",
      avatar: null
    });
    setImagePreview(currentUser?.avatar || "");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-content">
        <div className="profile-modal-header">
          <h2 className="profile-modal-title">Edit Profile</h2>
          <button className="profile-modal-close" onClick={handleClose}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="profile-modal-form" onSubmit={handleSubmit}>
          <div className="profile-image-section">
            <div className="profile-image-container">
              <img
                src={imagePreview}
                alt="Profile"
                className="profile-image-preview"
              />
              <label htmlFor="profileImage" className="profile-image-upload-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            <p className="profile-image-text">Click the camera icon to change your profile picture</p>
          </div>

          <div className="profile-form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              placeholder="Enter your profession"
              value={formData.profession}
              onChange={handleInputChange}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="profile-modal-actions">
            <button type="button" className="profile-btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="profile-btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;