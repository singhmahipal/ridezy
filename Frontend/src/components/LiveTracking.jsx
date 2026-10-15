import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
}

export default function LiveTracking() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        setError("");
      },
      () => {
        setError("Unable to get location. Please allow location access.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 15000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        {error || "Getting your location..."}
      </div>
    );
  }

  return (
    <MapContainer center={position} zoom={16} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Your current location</Popup>
      </Marker>

      <RecenterMap position={position} />
    </MapContainer>
  );
}
