// src/components/Map.tsx
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Legend from "./utilities/Legend";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

interface MapProps {
  geoJsonData: GeoJSON.GeoJsonObject;
  LegendProps: {
    title: string;
    colorArr: string[];
    labelArr: string[];
  };
  geoJsonStyle: (feature: any) => any;
  geoJsonOnEachFeature: (feature: any, layer: any) => any;
}

export default function Map(props: MapProps) {
  const zoom = useDynamicZoom();
  return (
    <section className="h-[80vh] max-h-[800px] relative">
      <MapContainer
        className="w-full h-full select-none relative z-[1]"
        center={[-7.801363, 110.364787]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DynamicZoom zoom={zoom} />
        <GeoJSON 
          data={props.geoJsonData}
          style={props.geoJsonStyle}
          onEachFeature={props.geoJsonOnEachFeature}
        />
      </MapContainer>
      <Legend
        title={props.LegendProps.title}
        colorArr={props.LegendProps.colorArr}
        labelArr={props.LegendProps.labelArr}
      />
    </section>
  );
}
