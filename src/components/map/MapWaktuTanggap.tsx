import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData from "@/data/Waktu_Tanggap.json";
import { useEffect } from "react";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

export default function MapWaktuTanggap(props: any) {
  const { position } = props;
  const zoom = useDynamicZoom();
  const data: GeoJSON.GeoJsonObject = geojsonData as GeoJSON.GeoJsonObject;

  useEffect(() => {
    // @ts-expect-error: GeoJsonObject has no property features
    data.features.forEach((f) => {
      console.log(f.properties);
    });
  }, []);

  return (
    <MapContainer
      className="w-full h-full select-none z-[1]"
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <DynamicZoom zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        // eslint-disable-next-line
        data={data}
        style={(feature) => {
          const level = feature?.properties.gridcode;
          return {
            fillColor:
              level == 1
                ? "#74C24E"
                : level == 2
                  ? "#AEDE4E"
                  : level == 3
                    ? "#FFFF4D"
                    : level == 4
                      ? "#FFA64D"
                      : "#FF4D4D",
            fillOpacity: 0.65,
            color: "#23272A",
            weight: 0,
          };
        }}
        onEachFeature={(feature, layer) => {
          const level = feature.properties.gridcode;
          layer.bindTooltip(
            `<span style="font-weight:600">${
              level === 1
                ? "5 Menit"
                : level === 2
                  ? "7.5 Menit"
                  : level === 3
                    ? "10 Menit"
                    : level === 4
                      ? "12.5 Menit"
                      : "15 Menit"
            }</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
