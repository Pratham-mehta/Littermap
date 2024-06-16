// src/pages/Dashboard.js
import React from 'react';
import Map from '../components/Map/Map';
import './Dashboard.css';
function Dashboard() {
  return (
    <div className='dashboard'> {/* Container div */}
      <h1 >Dashboard</h1>
      <h2>Track your litter cleanup progress here.</h2>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}> {/* Map div */}
        <Map />
      </div>
    </div>
  );
}

export default Dashboard;
