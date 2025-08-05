import { useState } from "react";
import "./EventModal.css";

const EventModal = ({ isOpen, onClose, onCreateEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    venue: "",
    address: "",
    eventUrl: "",
    latitude: "",
    longitude: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.dateTime &&
      formData.venue &&
      formData.address
    ) {
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        dateTime: formData.dateTime,
        venue: formData.venue,
        address: formData.address,
        eventUrl: formData.eventUrl,
        latitude: formData.latitude,
        longitude: formData.longitude,
        image:
          imagePreview ||
          "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop",
        attending: 0,
        notAttending: 0,
        organizer: "@mhshuvoalways",
        createdAt: new Date().toISOString(),
      };

      onCreateEvent(newEvent);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      dateTime: "",
      venue: "",
      address: "",
      eventUrl: "",
      latitude: "",
      longitude: "",
      image: null,
    });
    setImagePreview("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Create New Event</h2>
          <button className="modal-close" onClick={handleClose}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your event"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateTime">Date & Time *</label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="venue">Venue *</label>
              <input
                type="text"
                id="venue"
                name="venue"
                placeholder="Event venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Full address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="eventUrl">Event URL</label>
            <input
              type="url"
              id="eventUrl"
              name="eventUrl"
              placeholder="https://..."
              value={formData.eventUrl}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Location Coordinates</label>
            <button
              type="button"
              className="location-btn"
              onClick={handleUseCurrentLocation}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Use Current Location
            </button>
            <div className="coordinates-row">
              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Image</label>
            <div className="image-upload-area">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Event preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label htmlFor="eventImage" className="upload-label">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Click to upload event image</span>
                  <small>Max 5MB</small>
                </label>
              )}
              <input
                type="file"
                id="eventImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
