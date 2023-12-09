// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props: any) {
  const { position, zoom } = props;

  return (
    <MapContainer className="w-full h-full select-none" center={position} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Titik 0 Yogyakarta
        </Popup>
      </Marker>
      <Marker position={[-7.7700939, 110.3778412]}>
        <Popup>
          GSP UGM
        </Popup>
      </Marker>
    </MapContainer>
  );
}
