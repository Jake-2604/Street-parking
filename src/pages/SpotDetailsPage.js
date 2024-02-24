import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Define a component that will re-center and re-zoom the map when the position changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent = () => {
  const defaultZoom = 17; // A higher zoom level for closer view
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  const handleZoomIn = () => {
    // Coordinates for New York City
    const newCenter = [17.3886, 78.5288];
    setMapCenter(newCenter);
    setZoomLevel(17); // Set zoom level for closer street view
  };

  return (
    <div>
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '400px', width: '100%' }}>
        <ChangeView center={mapCenter} zoom={zoomLevel} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Small circle marker at the map center */}
        <Circle
          center={mapCenter}
          radius={5} // Small radius for a precise location
          color={'red'} // Circle color
        />
      </MapContainer>
      <button onClick={handleZoomIn}>Zoom into Location</button>
    </div>
  );
};

export default MapComponent;
