// src/components/Map.tsx
import {
  Circle,
  MapContainer,
  Polygon,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MapMarker from "./MapMarker";

export default function Map(props: any) {
  const { position, zoom } = props;

  const locations = [
    {
      name: "Titik 0 Yogya",
      position: [-7.801363, 110.364787],
      status: "normal",
    },
    {
      name: "GSP UGM",
      position: [-7.7700939, 110.3778412],
      status: "alert",
    },
    {
      name: "SGLC FT UGM",
      position: [-7.7653606, 110.3723441],
      status: "normal",
    }
  ];

  return (
    <MapContainer
      className="w-full h-full select-none"
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        locations.map((location, index) => (
          <MapMarker key={index} {...location} />
        ))
      }
      <Circle center={[-7.7700939, 110.3778412]} radius={300} color="rgba(255,0,0)">
      </Circle>
      <Polygon positions={[locations[0].position, locations[1].position, locations[2].position]} />
    </MapContainer>
  );
}
