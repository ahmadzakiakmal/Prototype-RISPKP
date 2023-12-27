import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsondata from "@/data/Kepadatan_Komersial.json";
import { useEffect } from "react";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

export default function MapKepadatanKomersial(props: any) {
  const { position } = props;
  const zoom = useDynamicZoom();
  const data: GeoJSON.GeoJsonObject = geojsondata as GeoJSON.GeoJsonObject;

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <MapContainer
      className="w-full h-full select-none"
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
              level == 1 ? "#59A8CC" : level == 2 ? "#F6F682" : "#F2745F",
            fillOpacity: 0.65,
            weight: 0
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.Id;
          const level = feature.properties.gridcode;
          layer.bindTooltip(
            `<span style="font-weight:600">${kelurahan}</span><br/>
          <span>Kepadatan Penduduk: ${level === 1 ? "Rendah" : level === 2 ? "Sedang" : "Tinggi"}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
