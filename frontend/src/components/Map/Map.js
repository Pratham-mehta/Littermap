// src/components/Map/Map.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGhhbW1laHRhMTk5OSIsImEiOiJjbHhnNWRxOXEwdmIxMmlvaHk2Z2M4M3hmIn0.3eaDOKmuW3mOfLpZ-ZFLQA';

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const markerHeight = 50;
  const markerRadius = 10;
  const linearOffset = 25;
  const popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log('Initializing map');
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10', // Light style with white background
      center: [-74.0060, 40.7128], // Initial center at NYC
      zoom:12 // Initial zoom level
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.on('load', () => {
      console.log('Map loaded');

      // Fetch GeoJSON data from your API endpoint
      axios.get('http://localhost:5000/geojson-markers')
        .then(response => {
          console.log('Fetched GeoJSON:', response.data);

          // Add the GeoJSON source to the map
          map.current.addSource('markers', {
            type: 'geojson',
            data: response.data
          });

          // Add heatmap layer
          map.current.addLayer({
            'id': 'markers-heat',
            'type': 'heatmap',
            'source': 'markers',
            'maxzoom': 15,
            'paint': {              
              // Increase the heatmap weight based on the number of votes
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'votes'],
                10, 0,
                20, 0.1,
                27, 0.5,
                32, 1
              ],
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                18,
                5
              ],
            // Fine-grained heatmap color control with 20 density thresholds
 'heatmap-color': [
  'interpolate',
  ['linear'],
  ['heatmap-density'],
  0.00, 'rgba(255,255,255,0)',       // Transparent
  0.02, 'rgba(245,245,245,0.2)',     // Very light grey
  0.04, 'rgba(235,235,235,0.3)',     // Light grey
  0.06, 'rgba(225,225,225,0.4)',     // Light grey
  0.08, 'rgba(215,215,215,0.5)',     // Light grey
  0.10, 'rgba(205,205,205,0.5)',     // Light grey
  0.12, 'rgba(195,195,195,0.6)',     // Grey
  0.14, 'rgba(185,185,185,0.6)',     // Grey
  0.16, 'rgba(175,175,175,0.6)',     // Grey
  0.18, 'rgba(165,165,165,0.7)',     // Grey
  0.20, 'rgba(155,155,155,0.7)',     // Dark grey
  0.22, 'rgba(145,145,145,0.7)',     // Dark grey
  0.24, 'rgba(135,135,135,0.8)',     // Darker grey
  0.26, 'rgba(125,125,125,0.8)',     // Darker grey
  0.28, 'rgba(115,115,115,0.8)',     // Very dark grey
  0.30, 'rgba(105,105,105,0.8)',     // Very dark grey
  0.32, 'rgba(95,95,95,0.8)',        // Almost black
  0.34, 'rgba(85,85,85,0.8)',        // Almost black
  0.36, 'rgba(75,75,75,0.8)',        // Almost black
  0.38, 'rgba(65,65,65,0.8)',        // Almost black
  0.40, 'rgba(55,55,55,0.8)',        // Almost black
  0.42, 'rgba(255,235,150,0.8)',     // Very light yellow
  0.44, 'rgba(255,225,130,0.8)',     // Light yellow
  0.46, 'rgba(255,215,110,0.8)',     // Light yellow
  0.48, 'rgba(255,205,90,0.8)',      // Yellow
  0.50, 'rgba(255,195,70,0.8)',      // Yellow
  0.52, 'rgba(255,185,50,0.8)',      // Yellow
  0.54, 'rgba(255,175,30,0.8)',      // Yellow
  0.56, 'rgba(255,165,10,0.9)',      // Orange-yellow
  0.58, 'rgba(255,155,50,0.9)',       // Orange-yellow
  0.60, 'rgba(255,145,40,0.9)',       // Orange
  0.62, 'rgba(255,135,30,0.9)',       // Orange
  0.64, 'rgba(255,125,10,0.9)',       // Orange
  0.66, 'rgba(255,115,0,0.9)',       // Orange
  0.68, 'rgba(255,105,0,0.9)',       // Orange-red
  0.70, 'rgba(255,95,0,0.9)',        // Orange-red
  0.72, 'rgba(255,85,0,0.9)',        // Orange-red
  0.74, 'rgba(255,75,0,0.9)',        // Orange-red
  0.76, 'rgba(255,65,0,0.9)',        // Red
  0.78, 'rgba(255,55,0,0.9)',        // Red
  0.80, 'rgba(255,45,0,0.9)',        // Red
  0.82, 'rgba(255,35,0,1)',          // Crimson
  0.84, 'rgba(245,30,0,1)',          // Crimson
  0.86, 'rgba(235,25,0,1)',          // Crimson
  0.88, 'rgba(225,20,0,1)',          // Firebrick
  0.98, 'rgba(215,15,0,1)',          // Firebrick
  0.982, 'rgba(205,10,0,1)',          // Firebrick
  0.984, 'rgba(195,5,0,1)',           // Dark red
  0.985, 'rgba(185,0,0,1)',           // Dark red
  0.987, 'rgba(175,0,0,1)',           // Dark red
  0.990, 'rgba(255,75,0,0.9)',        // Orange-red
  0.993, 'rgba(255,65,0,0.9)',        // Red
  0.995, 'rgba(255,55,0,0.9)',        // Red
  0.997, 'rgba(255,45,0,0.9)',        // Red
  1.00, 'rgba(165,0,0,1)'            // Maroon
]
,
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                5,
                20,
                60
              ],
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                1,
                18,
                0
              ]
            }
          });

          // Add circle layer for individual points at higher zoom levels
          map.current.addLayer({
            'id': 'markers-point',
            'type': 'circle',
            'source': 'markers',
            'minzoom': 14,
            'paint': {
              'circle-radius': 6,
              'circle-color': 'red',
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1
            }
          });

          // Add popups
          map.current.on('click', 'markers-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            const image_path = e.features[0].properties.image;
            const votes = e.features[0].properties.votes;

            // Ensure the popup appears over the feature being clicked on
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup({
                // offset: popupOffsets,
                offset: [20, 40],
                anchor: 'top',
                className: 'my-class',
                closeOnMove: true
              })
              .setLngLat(coordinates)
              .setHTML(`
                <div class="centered-popup">
                  <p>${description}</p>
                  <img src="http://localhost:5000${image_path}" alt="Image" "/>
        
                  <div class="vote-count" style="font-weight: bold; border: 1px solid black; background-color: lightblue; color: darkblue border-radius: 10px">
                  Current Votes: <span id="vote-count">${votes}</span>
                  </div>
                  <div class="popup-buttons">
                    <button class="upvote-btn" onclick="document.getElementById('vote-count').textContent = parseInt(document.getElementById('vote-count').textContent) + 1">+1</button>
                    <button class="downvote-btn" onclick="document.getElementById('vote-count').textContent = parseInt(document.getElementById('vote-count').textContent) - 1">-1</button>
                  </div>
                </div>`)
              .setMaxWidth("300px")
              .addTo(map.current);

            
            function handleUpvote() {
             
            }
          });

          // Change cursor to pointer when hovering over the points
          map.current.on('mouseenter', 'markers-point', () => {
            map.current.getCanvas().style.cursor = 'pointer';
          });

          // Change cursor back to default when not hovering
          map.current.on('mouseleave', 'markers-point', () => {
            map.current.getCanvas().style.cursor = '';
          });

          // Adjust the map to fit all markers
          const bounds = new mapboxgl.LngLatBounds();
          response.data.features.forEach(feature => {
            bounds.extend(feature.geometry.coordinates);
          });
          map.current.fitBounds(bounds, {
            padding: 50,
            maxZoom: 15
          });
        })
        .catch(error => {
          console.error('Error fetching GeoJSON markers:', error);
        });
    });
  }, []);

  return <div ref={mapContainer} className="map-container" />;
}

export default Map;
