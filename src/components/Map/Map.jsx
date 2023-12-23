// MapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const location = { lat: 37.7749, lng: -122.4194 };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC3nMS-ORtw4HrAQA-6fNnQUrSf-dnytYk"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
