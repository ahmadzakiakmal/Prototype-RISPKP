import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData from "@/data/Kepadatan_Bangunan.json";
import { useEffect } from "react";

export default function MapKepadatanBangunan(props: any) {
  const { zoom, position } = props;
  const data: GeoJSON.GeoJsonObject = geojsonData as GeoJSON.GeoJsonObject;

  useEffect(() => {
    // @ts-expect-error: GeoJsonObject has no property features
    data.features.forEach((f) => {
      console.log(f.properties.gridcode);
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
              level == 1 ? "#FAD155" : level == 2 ? "#F2A72E" : "#AD5313",
            fillOpacity: 0.65,
            weight: 0
          };
        }}
        onEachFeature={(feature, layer) => {
          const kelurahan = feature.properties.Id;
          const level = feature.properties.gridcode;
          layer.bindTooltip(
            `<span style="font-weight:600">${kelurahan}</span><br/>
          <span>Kepadatan Penduduk: ${level === 3 ? "Tinggi" : level === 2 ? "Sedang" : "Rendah"}</span>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
