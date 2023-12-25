import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData from "@/data/Bahaya_SPBU.json";
import { useEffect } from "react";

export default function MapBahayaSPBU(props: any) {
  const { zoom, position } = props;
  const data: GeoJSON.GeoJsonObject = geojsonData as GeoJSON.GeoJsonObject;

  useEffect(() => {
    // @ts-expect-error: GeoJsonObject has no property features
    data.features.forEach((f) => {
      console.log(f.properties);
    });
  }, []);

  return (
    <MapContainer
      className="w-full h-full select-none"
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
    >
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
              level == 3 ? "#5EBA30" : level == 2 ? "#FFFF30" : "#FF3030",
            fillOpacity: 0.65,
            weight: 0
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.Id;
          const level = feature.properties.gridcode;
          layer.bindTooltip(
            `<span style="font-weight:600">${kelurahan}</span><br/>
          <span>Kepadatan Penduduk: ${level === 1 ? "Tinggi" : level === 2 ? "Sedang" : "Rendah"}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
