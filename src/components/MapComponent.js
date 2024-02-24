// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapComponent = ( data ) => {

    const latitude = data?.position.latitude
    const longitude = data?.position.longitude

console.log(data.position)
console.log(latitude,longitude)
  return (
    <MapContainer center={[latitude,longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data && <Marker position={[latitude,longitude]}>
        <Popup>A selected location</Popup>
      </Marker>}
    </MapContainer>
  );
};

export default MapComponent;
