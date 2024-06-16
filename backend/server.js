// backend/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'littermap'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/markers', (req, res) => {
  connection.query('SELECT * FROM markers', (error, results) => {
    if (error) {
      console.error('Error fetching markers:', error);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

app.get('/geojson-markers', (req, res) => {
  connection.query('SELECT latitude, longitude, description, image_path, votes FROM markers', (error, results) => {
    if (error) {
      console.error('Error fetching markers:', error);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      // Convert results to GeoJSON
      const geojson = {
        type: 'FeatureCollection',
        features: results.map(row => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [row.longitude, row.latitude]
          },
          properties: {
            description: row.description,
            image: `${row.image_path}`,
            votes: row.votes
          }
        }))
      };
      res.json(geojson);
    }
  });
});

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
  console.log('Test endpoint was called');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
