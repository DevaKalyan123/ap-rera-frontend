import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Verification({ appNo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/verify/${appNo}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, [appNo]);

  if (!data) return <div>Loading verification...</div>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📊 Verification</h3>

      <p>📍 Location: {data.location_valid ? "✅ Valid" : "❌ Invalid"}</p>
      <p>📅 Timeline Gap: {data.timeline_gap} days</p>

      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* Map */}
        <MapContainer
          center={[parseFloat(data.lat), parseFloat(data.lng)]}
          zoom={15}
          style={{ height: "300px", width: "50%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[parseFloat(data.lat), parseFloat(data.lng)]} />
        </MapContainer>

        {/* Images */}
        <div>
          {data.images.map((img, i) => (
            <div key={i}>
              <p>{img.date}</p>
              <img src={img.url} width="200" alt="site" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Verification;