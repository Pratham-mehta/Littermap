// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
