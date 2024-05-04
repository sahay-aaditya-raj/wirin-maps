import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import config from '../config';

const GoogleMap = ({ google, apiKey }) => {
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  useEffect(() => {
    // Initialize map when google prop is available
    if (google) {
      const mapInstance = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 12.9289709, lng: 77.5045989 },
        zoom: 14
      });
      setMap(mapInstance);

      const directionsRendererInstance = new google.maps.DirectionsRenderer();
      setDirectionsRenderer(directionsRendererInstance);
      directionsRendererInstance.setMap(mapInstance);
    }
  }, [google]);

  const handleDirections = () => {
    if (!map || !sourceAddress || !destinationAddress) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: sourceAddress,
        destination: destinationAddress,
        travelMode: 'DRIVING'
      },
      (result, status) => {
        if (status === 'OK' && directionsRenderer) {
          directionsRenderer.setDirections(result);
        } else {
          console.log('Directions request failed with status:', status);
        }
      }
    );
  };

  return (
    <div>


      <div>
        <input
          type="text"
          placeholder="Enter source address"
          value={sourceAddress}
          onChange={(e) => setSourceAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <button onClick={handleDirections}>Show Directions</button>
      </div>
      <div id="map" style={{ width: '100%', height: '400px', marginBottom: '20px' }} />
    </div>
  );
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDqlgjgW4XiLsJM33jY8voBIjGUQswKd_I'
})(GoogleMap);

