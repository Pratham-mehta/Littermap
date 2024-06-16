// src/pages/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Residential Litter Cleanup Map</h1>
      <p>Join us in making our community cleaner and greener.</p>
      <ul className="product-features">
        <li>Spot litter? Click and upload to the map.</li>
        <li>Track and verify community cleanups.</li>
        <li>Earn rewards for your contributions.</li>
        <li>Promote local cleanup efforts.</li>
        <li>Redeem rewards for community improvements.</li>
        <li>Build a sense of community and pride.</li>
      </ul>
    </div>
  );
}

export default Home;
