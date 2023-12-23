import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsondata from "@/data/Kepadatan_Komersial.json";
import { useEffect } from "react";

export default function MapKepadatanKomersial(props: any) {
  const { zoom, position } = props;
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
              level == 3 ? "#FAD155" : level == 2 ? "#F2A72E" : "#AD5313",
            fillOpacity: 0.65,
            color: "#23272A",
            weight: 2
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.Id;
          const level = feature.properties.Klas_ha;
          layer.bindTooltip(
            `<span style="font-weight:600">${kelurahan}</span><br/>
          <span>Kepadatan Penduduk: ${level}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
