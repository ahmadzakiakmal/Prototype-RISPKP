// src/components/Map.tsx
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Legend from "./utilities/Legend";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";
import dynamic from "next/dynamic";
import { Icon } from "leaflet";

interface MapProps {
  geoJsonData?: GeoJSON.GeoJsonObject;
  LegendProps?: {
    title: string;
    colorArr: string[];
    labelArr: string[];
  };
  geoJsonStyle?: (feature: any) => any;
  geoJsonOnEachFeature?: (feature: any, layer: any) => any;
  markers?: any;
}

function Map(props: MapProps) {
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
        {props.geoJsonData && (
          <GeoJSON
            data={props?.geoJsonData}
            style={props?.geoJsonStyle}
            onEachFeature={props.geoJsonOnEachFeature}
          />
        )}
        {props.markers &&
          props.markers.map((marker: any) => {
            return (
              <Marker
                position={marker.position}
                icon={
                  new Icon({
                    iconUrl: marker.iconUrl,
                    iconSize: marker.iconSize,
                    iconAnchor: marker.iconAnchor,
                  })
                }
                key={marker.key}
              >
                <Tooltip children={marker.children} offset={marker.popupAnchor} />
              </Marker>
            );
          })}
      </MapContainer>
      {props.LegendProps && (
        <Legend
          title={props.LegendProps.title}
          colorArr={props.LegendProps.colorArr}
          labelArr={props.LegendProps.labelArr}
        />
      )}
    </section>
  );
}

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
