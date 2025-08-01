import { Link } from "react-router-dom";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  return (
    <div className="upcoming-events">
      <div className="events-header">
        <h3 className="events-title">Upcoming Events</h3>
      </div>

      <div className="event-item">
        <h4 className="event-title">Movie SHOW</h4>
        <div className="event-details">
          <div className="event-detail">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Nov 18, 10:19 PM
          </div>
          <div className="event-detail">
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
            North Central Avenue
          </div>
        </div>
        <div className="event-attendees">0 attending</div>
      </div>
      <Link to="/events">
        <button className="view-all-btn">View All Events</button>
      </Link>
    </div>
  );
};

export default UpcomingEvents;
