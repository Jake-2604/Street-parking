import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a component that will re-center the map when the position changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London
  const zoomLevel = 13; // Default zoom level

  const handleZoomIn = () => {
    // Replace with the latitude and longitude you want to zoom into
    const newCenter = [40.7128, -74.0060]; // Example coordinates for New York City
    setMapCenter(newCenter);
  };

  return (
    <div>
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '400px', width: '100%' }}>
        <ChangeView center={mapCenter} zoom={zoomLevel} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <button onClick={handleZoomIn}>Zoom into Location</button>
    </div>
  );
};

export default MapComponent;
