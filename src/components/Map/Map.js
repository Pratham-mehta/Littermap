// src/components/Map/Map.js
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGhhbW1laHRhMTk5OSIsImEiOiJjbHhnNWRxOXEwdmIxMmlvaHk2Z2M4M3hmIn0.3eaDOKmuW3mOfLpZ-ZFLQA';

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    });
  });

  return <div ref={mapContainer} className="map-container" />;
}

export default Map;
