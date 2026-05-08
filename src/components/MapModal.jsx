import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon issue
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapModal({ lat, lng, imgLat, imgLng }) {
  const projectPos = [Number(lat), Number(lng)];
  const imagePos =
    imgLat && imgLng ? [Number(imgLat), Number(imgLng)] : null;

  return (
    <MapContainer
      center={projectPos}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Project Marker */}
      <Marker position={projectPos}>
        
        <Popup>📍 Project Location</Popup>
      </Marker>

      {/* Image Marker */}
      {imagePos && (
        <Marker position={imagePos}>
          <Popup>📸 Image Location</Popup>
        </Marker>
      )}

      {/* Line */}
      {imagePos && (
        <Polyline positions={[projectPos, imagePos]} color="blue" />
      )}
    </MapContainer>
  );
}