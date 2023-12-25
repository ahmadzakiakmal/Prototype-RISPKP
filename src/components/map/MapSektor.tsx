import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData1 from "@/data/Poin_Sektor.json";
import geojsonData2 from "@/data/Cakupan_Sektor.json";
import { useEffect } from "react";

export default function MapWaktuTanggap(props: any) {
  const { zoom, position } = props;
  const data: GeoJSON.GeoJsonObject = geojsonData1 as GeoJSON.GeoJsonObject;
  const data2: GeoJSON.GeoJsonObject = geojsonData2 as GeoJSON.GeoJsonObject;
  // @ts-expect-error: GeoJsonObject has no property features
  data.features = data.features.concat(data2.features);

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
        style={() => {
          return {
            fillColor: "#C8FCEA",
            fillOpacity: 0.65,
            color: "#23272A",
            weight: 2,
          };
        }}
        onEachFeature={(feature, layer) => {
          const desa = feature.properties.DESA;
          const level = feature.properties.Jumlah;
          layer.bindTooltip(
            `<span style="font-weight:600">${desa}</span><br/>
          <span>Frekuensi: ${level}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
