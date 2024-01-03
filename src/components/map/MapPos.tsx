import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData1 from "@/data/Poin_Pos.json";
import geojsonData2 from "@/data/Cakupan_Pos.json";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

export default function MapWaktuTanggap(props: any) {
  const { position } = props;
  const zoom = useDynamicZoom();
  const data: GeoJSON.GeoJsonObject = geojsonData1 as GeoJSON.GeoJsonObject;
  const data2: GeoJSON.GeoJsonObject = geojsonData2 as GeoJSON.GeoJsonObject;
  // @ts-expect-error: GeoJsonObject has no property features
  data.features = data.features.concat(data2.features);

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
          let posIdx = feature?.properties.Sektor[4];
          if(feature?.properties.Sektor[5]) {
            posIdx += feature?.properties.Sektor[5];
          }
          posIdx = parseInt(posIdx) - 1;
          const colors = [
            "#C7EDF6",
            "#EAF8DE",
            "#D4C4F5",
            "#F5E7C4",
            "#C6E1F6",
            "#C8C6F6",
            "#F9F8C6",
            "#F6C2F1",
            "#CAF7D3",
            "#F9C6CD",
          ];
          return {
            fillColor: colors[posIdx],
            fillOpacity: 0.65,
            color: "#23272A",
            weight: 2,
          };
        }}
        onEachFeature={(feature, layer) => {
          const sektor = feature.properties.Sektor;
          const pos = feature.properties.Pos;
          layer.bindTooltip(
            `<span style="font-weight:600">${sektor ?? pos}</span><br/>`
          );
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
