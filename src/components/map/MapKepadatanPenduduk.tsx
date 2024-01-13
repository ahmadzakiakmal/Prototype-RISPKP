import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData from "@/data/Kepadatan_Penduduk.json";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

export default function MapKepadatanPenduduk(props: any) {
  const { position } = props;
  const zoom = useDynamicZoom();
  const data: GeoJSON.GeoJsonObject = geojsonData as GeoJSON.GeoJsonObject;

  return (
    <MapContainer
      className="w-full h-full select-none z-[1]"
      center={position}
      scrollWheelZoom={false}
      zoom={zoom}
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
            weight: 2
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.DESA;
          const level = feature.properties.Klas_ha;
          layer.bindTooltip(
            `
            <div class="font-poppins">
              <span class="font-semibold ">${kelurahan}</span><br/>
              <span>Kepadatan Penduduk: ${level}</span>
            </div>
            `
          );
        }}
      ></GeoJSON>
      <DynamicZoom zoom={zoom} />
    </MapContainer>
  );
}
