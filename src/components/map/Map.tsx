// src/components/Map.tsx
import { Circle, MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MapMarker from "./utilities/MapMarker";

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
    },
  ];

  const ringroad = [
    [-7.7435586, 110.3441336],
    [-7.7536676,110.3812658],
    [-7.7597507,110.3882904],
    [-7.7584691,110.3994268],
    [-7.7659146, 110.4304312],
    [-7.7845781, 110.4285852],
    [-7.7836822, 110.4103641],
    [-7.8218642,110.4098009],
    [-7.837601478246318, 110.40618475337406],
    [-7.8362169, 110.389819],
    [-7.8341676, 110.3879389],
    [-7.8365604, 110.3761791],
    [-7.8332351, 110.3579558],
    [-7.8288014, 110.3565482],
    [-7.8218442, 110.3237569],
    [-7.8019574, 110.3241029],
    [-7.7997382, 110.3285112],
    [-7.7784811, 110.3305039],
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
      {locations.map((location, index) => (
        <MapMarker key={index} {...location} />
      ))}
      <Circle
        center={[-7.7700939, 110.3778412]}
        radius={300}
        color="rgba(255,0,0)"
      ></Circle>
      {/* //eslint-disable 
          @ts-ignore */}
      <Polygon positions={[...ringroad]} fillColor="#3388FF" fillOpacity={.1} />
    </MapContainer>
  );
}
