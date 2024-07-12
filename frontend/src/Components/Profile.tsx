import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import '../Styles/Profile.css';
import Sidebar from './Sidebar';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profile_picture: '',
    bio: '',
    location: ''
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = extractUserIdFromToken(token); // Extract user ID from token
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setTweets(data.tweets || []); // Initialize tweets as an empty array if not present
        setFormData({
          username: data.username,
          email: data.email,
          profile_picture: data.profile_picture,
          bio: data.bio,
          location: data.location
        });
      } else {
        console.error('Error fetching profile:', data.error);
      }
    };

    const fetchSuggestedUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch suggested users');
        }
        const data = await response.json();
        // Limit to only 3 users
        const limitedUsers = data.slice(0, 3);
        setSuggestedUsers(limitedUsers);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      }
    };

    fetchProfile();
    fetchSuggestedUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = extractUserIdFromToken(token);
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setProfile(data);
      setEditMode(false);
    } else {
      console.error('Error updating profile:', data.error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="main-profile">
        <nav className="sticky-profile1">
          <div className="nav-profile" onClick={handleBackClick}>
            <FaArrowLeft className="back-arrow" />
            Profile
          </div>
          <div className="nav-profile">
            {tweets.length} posts
          </div>
        </nav>
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.profile_picture ? (
              <img src={profile.profile_picture} alt="Profile" className="avatar-image" />
            ) : (
              <span className="avatar-placeholder">{profile.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <button className="edit-profile-btn" onClick={() => setEditMode(true)}>Edit profile</button>
          {!editMode ? (
            <>
              <h2>{profile.name}</h2>
              <p className="username">@{profile.username}</p>
              <p className="join-date"><FaCalendarAlt /> Joined {new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
              <div className="follow-stats">
                <span><strong>{profile.following_count}</strong> Following</span>
                <span><strong>{profile.followers_count}</strong> Followers</span>
              </div>
              <p className="bio"><b>About:</b> {profile.bio}</p>
              <p className="location"><b>Location:</b> {profile.location}</p>
            </>
          ) : (
            <form onSubmit={handleFormSubmit} className="edit-profile-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile_picture">Profile Picture URL</label>
                <input
                  type="text"
                  id="profile_picture"
                  name="profile_picture"
                  value={formData.profile_picture}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-profile-btn">Save</button>
              <button type="button" className="cancel-edit-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          )}
        </div>
        <div className="profile-tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Replies</button>
          <button className="tab">Highlights</button>
          <button className="tab">Media</button>
          <button className="tab">Likes</button>
        </div>
        <div className="profile-content">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <p>{tweet.body}</p>
              <span className="tweet-date">{new Date(tweet.timestamp).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-right">
        <div className="who-to-follow">
          <h3>Who to follow</h3>
          {suggestedUsers.map((user) => (
            <div key={user.id} className="suggested-user">
              <span>{user.username}</span>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;

// Implement this helper function to extract user ID from the token
function extractUserIdFromToken(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub; // Extract user ID from 'sub' field
}
