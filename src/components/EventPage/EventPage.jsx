import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './EventPage.css';

const EventPage = ({ currentUser, onLogout }) => {
  const { eventId } = useParams();
  const [isAttending, setIsAttending] = useState(null);
  
  // Mock event data
  const event = {
    id: 1,
    title: 'Tech Meetup Downtown',
    date: 'Aug/28/2022',
    venue: 'Downtown Convention Center Ave',
    link: 'www.techmeetup.com/events',
    description: 'Join us for an exciting evening of tech talks, networking, and innovation. Meet like-minded developers, entrepreneurs, and tech enthusiasts.',
    attendees: 156,
    mapImage: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'
  };

  const handleAttendingClick = (attending) => {
    setIsAttending(attending);
  };

  return (
    <div className="event-page">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
      
      <div className="event-container">
        <div className="event-card">
          <div className="event-map">
            <img src={event.mapImage} alt="Event location" />
          </div>
          
          <div className="event-details">
            <div className="event-info">
              <div className="event-field">
                <span className="field-label">Date:</span>
                <span className="field-value">{event.date}</span>
              </div>
              
              <div className="event-field">
                <span className="field-label">Venue:</span>
                <span className="field-value">{event.venue}</span>
              </div>
              
              <div className="event-field">
                <span className="field-label">Link:</span>
                <span className="field-value field-link">{event.link}</span>
              </div>
            </div>
            
            <div className="event-actions">
              <button 
                className={`btn event-btn ${isAttending === true ? 'active' : ''}`}
                onClick={() => handleAttendingClick(true)}
              >
                Attending
              </button>
              
              <button 
                className={`btn event-btn ${isAttending === false ? 'active' : ''}`}
                onClick={() => handleAttendingClick(false)}
              >
                Not Attending
              </button>
            </div>
          </div>
        </div>
        
        <div className="event-sidebar">
          <div className="event-stats">
            <h3>Event Stats</h3>
            <div className="stat-item">
              <span className="stat-number">{event.attendees}</span>
              <span className="stat-label">People Attending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">People Interested</span>
            </div>
          </div>
          
          <div className="event-description">
            <h3>About Event</h3>
            <p>{event.description}</p>
          </div>
          
          <div className="event-organizer">
            <h3>Organizer</h3>
            <div className="organizer-info">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
                alt="Organizer" 
                className="organizer-avatar"
              />
              <div>
                <h4>Tech Community NYC</h4>
                <p>Event Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;