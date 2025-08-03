import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./EventPage.css";

const EventPage = ({ currentUser, onLogout, events, onDeleteEvent }) => {
  const [eventRsvps, setEventRsvps] = useState({});

  const handleRsvp = (eventId, response) => {
    setEventRsvps((prev) => ({
      ...prev,
      [eventId]: response,
    }));
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(eventId);
    }
  };

  const formatEventDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ' at ' + date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="event-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

      <div className="event-container">
        <div className="page-header">
          <h1 className="page-title">Upcoming Events</h1>
          <p className="page-subtitle">Discover and join community events</p>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              {currentUser && currentUser.name === "MH Shuvo" && (
                <button 
                  className="delete-event-btn-absolute"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />

              <div className="event-content">
                <span className="event-badge">Event</span>

                <h3 className="event-title">{event.title}</h3>

                <div className="event-meta">
                  <div className="event-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatEventDate(event.dateTime)}
                  </div>
                  <div className="event-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.address}
                  </div>
                </div>

                <div className="event-organizer">by {event.organizer}</div>

                <div className="event-rsvp">
                  <div className="rsvp-label">RSVP</div>
                  <div className="rsvp-buttons">
                    <button
                      className={`rsvp-btn ${
                        eventRsvps[event.id] === "attending" ? "attending" : ""
                      }`}
                      onClick={() => handleRsvp(event.id, "attending")}
                    >
                      ✓ Attending
                    </button>
                    <button
                      className={`rsvp-btn ${
                        eventRsvps[event.id] === "not-attending"
                          ? "not-attending"
                          : ""
                      }`}
                      onClick={() => handleRsvp(event.id, "not-attending")}
                    >
                      Not Attending
                    </button>
                  </div>
                  {eventRsvps[event.id] === "attending" && (
                    <div className="rsvp-message">
                      Great! We'll send you event updates.
                    </div>
                  )}
                </div>

                <div className="event-stats">
                  <div className="stat-group">
                    <div className="stat-number">{event.attending}</div>
                    <div className="stat-label">Attending</div>
                  </div>
                  <div className="stat-group">
                    <div className="stat-number">{event.notAttending}</div>
                    <div className="stat-label">Not Attending</div>
                  </div>
                </div>

                <div className="event-description">
                  <div className="description-title">Description</div>
                  <div className="description-text">{event.description}</div>
                </div>

                <div className="event-location">
                  <div className="location-title">Location</div>
                  <div className="location-text">{event.address}</div>
                  <img
                    src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                    alt="Event location map"
                    className="event-map"
                  />
                  {event.eventUrl && (
                    <div className="event-website">
                      <a href={event.eventUrl} className="website-link" target="_blank" rel="noopener noreferrer">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Event Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
