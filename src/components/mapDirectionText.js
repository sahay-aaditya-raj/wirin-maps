// DirectionsComponent.js
import React, { useState } from 'react';
import config from '../config'; // Import config.js

const TextDirectionsComponent = () => {
  const [directions, setDirections] = useState(null);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
  const fetchDirections = async () => {
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const apiKey = config.googleMapsApiKey; // Access API key from config
    const travelMode = 'driving';
    try {
      const response = await fetch(`${config.host}/api/directions?origin=${encodedOrigin}&destination=${encodedDestination}&mode=${travelMode}&apiKey=${apiKey}`);
      const data = await response.json();
      setDirections(data);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  return (
    <div>
        <input placeholder='Origin' value={origin} onChange={e => setOrigin(e.target.value)} />
        <input placeholder='Destination' value={destination} onChange={e => setDestination(e.target.value)} />
      <button onClick={fetchDirections}>Get Directions</button>
      {directions && (
        <pre>{JSON.stringify(directions, null, 2)}</pre>
      )}
    </div>
  );
};

export default TextDirectionsComponent;
