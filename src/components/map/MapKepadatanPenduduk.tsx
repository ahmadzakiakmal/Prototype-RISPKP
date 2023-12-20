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
      {/* <Polygon positions={areas[0]} color="blue" />
      <Polygon positions={areas[1]} color="blue" /> */}
      {/*areas.map((area: any, i: number) => (
          <Polygon
            key={i}
            positions={area.coordinates}
            color={
              area.level === "Sangat Rendah"
                ? "#D8F2ED"
                : area.level === "Rendah"
                  ? "#9FC4BE"
                  : area.level === "Sedang"
                    ? "#6B9993"
                    : area.level === "Tinggi"
                      ? "#3F736D"
                      : area.level === "Sangat Tinggi"
                        ? "#154F4A"
                        : ""
            }
            fill={true}
            fillOpacity={0.7}
          >
            <Tooltip>
              <span>{area.kecamatan}</span>
              <br />
              <span>Kepadatan: {area.level}</span>
            </Tooltip>
          </Polygon>
          ))*/}
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
                    ? "#6B9993"
                    : level === "Tinggi"
                      ? "#3F736D"
                      : level === "Sangat Tinggi"
                        ? "#154F4A"
                        : "",
            fillOpacity: 0.65,
            color: "#23272A",
          };
        }}
        onEachFeature={(feature, layer) => {
          const kecamatan = feature.properties.KECAMATAN;
          const level = feature.properties.Klas_ha;
          layer.bindTooltip(
            `<span style="font-weight:600">${kecamatan}</span><br/>
            <span>Kepadatan: ${level}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
