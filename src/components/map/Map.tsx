// src/components/Map.tsx
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { normalMarkerIcon, alertMarkerIcon } from "./MarkerIcon";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props: any) {
  const { position, zoom } = props;

  const multiPolygon = [
    [-7.7700939, 110.3778412],
    [-7.7653606, 110.3723441],
    [-7.801363, 110.364787],
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
      <Marker icon={normalMarkerIcon} position={position} >
        <Popup>Titik 0 Yogyakarta</Popup>
      </Marker>
      <Marker icon={alertMarkerIcon} position={[-7.7700939, 110.3778412]}>
        <Popup>GSP UGM</Popup>
      </Marker>
      <Marker icon={normalMarkerIcon} position={[-7.7653606, 110.3723441]}>
        <Popup>SGLC FT UGM</Popup>
      </Marker>
      {/* <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon}>
        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
      </Polygon> */}
    </MapContainer>
  );
}
