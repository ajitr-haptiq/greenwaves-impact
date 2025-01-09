import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ recyclingCenters }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">Nearby Recycling Centers:</h3>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {recyclingCenters.map((center, index) => (
          <Marker key={index} position={[center.latitude, center.longitude]}>
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.address}
              <br />
              <a href={`tel:${center.contact}`}>Call: {center.contact}</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
