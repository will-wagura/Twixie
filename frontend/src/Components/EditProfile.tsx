import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/EditProfile.css';

const EditProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:5000/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profile = response.data;
      setUsername(profile.username);
      setBio(profile.bio);
      setProfilePicture(profile.profile_picture);
    };
    fetchProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`http://127.0.0.1:5000/api/profile/${userId}`, {
      username,
      bio,
      profile_picture: profilePicture,
      password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Profile updated successfully');
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
      </div>
      <div>
        <label>Profile Picture URL</label>
        <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
      </div>
      <div>
        <label>New Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
