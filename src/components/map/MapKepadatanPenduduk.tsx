import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData from "@/data/Kepadatan_Penduduk.json";
import { useEffect } from "react";

export default function MapKepadatanPenduduk(props: any) {
  const { position, zoom } = props;
  const data: GeoJSON.GeoJsonObject = geojsonData as GeoJSON.GeoJsonObject;

  useEffect(() => {
    console.log(geojsonData.features);
    const counts:any = {
      "Sangat Rendah": 0,
      Rendah: 0,
      Sedang: 0,
      Tinggi: 0,
      "Sangat Tinggi": 0,
    };
    geojsonData.features.forEach((feature) => {
      const level:any = feature.properties.Klas_ha;
      counts[level] += 1;
    });
    console.log(counts);
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
          const level = feature?.properties.Klas_ha;
          return {
            fillColor:
              level === "Sangat Rendah"
                ? "#D8F2ED"
                : level === "Rendah"
                  ? "#8EB8B1"
                  : level === "Sedang"
                    ? "#4A7E78"
                    : level === "Tinggi"
                      ? "#0C4D46"
                      : "",
            fillOpacity: 0.65,
            color: "#23272A",
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.DESA;
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
