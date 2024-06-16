// src/components/TestComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestComponent;
