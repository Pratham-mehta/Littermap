// src/components/Profile/Profile.js
import React from 'react';
import './Profile.css';
import defaultUser from '../components/Profile/defaultUser';

function Profile({ user =   defaultUser }) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePhoto || '/images/default-profile.jpg'} alt="Profile" className="profile-photo"/>
        <div className="profile-details">
          <h2 className="profile-name">{user.name}</h2>
          <div className="profile-location">
            <img src="/images/location-pin.png" alt="Location" className="location-pin"/>
            <span>{user.location}</span>
          </div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{user.picturesSubmitted}</span>
          <span className="stat-label">Pictures Submitted</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.upvotes}</span>
          <span className="stat-label">Upvotes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.downvotes}</span>
          <span className="stat-label">Downvotes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.rewards}</span>
          <span className="stat-label">Rewards</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.points}</span>
          <span className="stat-label">Points</span>
        </div>
      </div>
      <button className="reward-button">Get Rewards</button>
    </div>
  );
}

export default Profile;
