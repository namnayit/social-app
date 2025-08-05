import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import EventPage from "./components/EventPage/EventPage";
import FeedPage from "./components/FeedPage/FeedPage";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "What is Lorem Ipsum?",
      dateTime: "2025-07-15T21:38",
      venue: "ShafiFi",
      organizer: "@mithshuvoalways",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      address: "60 feet, Dhaka",
      image:
        "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop",
      attending: 2,
      notAttending: 0,
      eventUrl: "Event Website",
      latitude: "23.8103",
      longitude: "90.4125",
      createdAt: "2025-01-01T00:00:00.000Z"
    },
    {
      id: 2,
      title: "What is Lorem Ipsum?",
      dateTime: "2025-07-15T21:38",
      venue: "ShafiFi",
      organizer: "@mithshuvoalways",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      address: "60 feet, Dhaka",
      image:
        "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop",
      attending: 2,
      notAttending: 0,
      eventUrl: "Event Website",
      latitude: "23.8103",
      longitude: "90.4125",
      createdAt: "2025-01-01T00:00:00.000Z"
    },
  ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        initial: "N",
      },
      content:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
      image:
        "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 2,
      comments: 0,
      timestamp: "12d ago",
      hasLiked: false,
    },
    {
      id: 2,
      user: {
        name: "Krithi Perry",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      },
      content:
        "Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-...",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      likes: 0,
      comments: 0,
      timestamp: "14d ago",
      hasLiked: false,
      showMore: false,
    },
  ]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleCreateEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/feeds" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/feeds"
            element={
              isLoggedIn ? (
                <FeedPage 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  posts={posts}
                  setPosts={setPosts}
                  onUpdatePost={handleUpdatePost}
                  onDeletePost={handleDeletePost}
                  events={events}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/events"
            element={
              isLoggedIn ? (
                <EventPage
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  events={events}
                  onDeleteEvent={handleDeleteEvent}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <ProfilePage
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  posts={posts}
                  setPosts={setPosts}
                  onUpdatePost={handleUpdatePost}
                  onDeletePost={handleDeletePost}
                  events={events}
                  onCreateEvent={handleCreateEvent}
                  onDeleteEvent={handleDeleteEvent}
                  onUpdateProfile={handleUpdateProfile}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;