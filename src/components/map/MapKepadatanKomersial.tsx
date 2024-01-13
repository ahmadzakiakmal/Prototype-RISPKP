import React from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import "leaflet.heat";
import L from "leaflet";
import heatmapData from "@/data/Kepadatan_Komersial_Points.json";
import geojsonData from "@/data/Kepadatan_Komersial.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";

// eslint-disable-next-line 
const HeatmapLayer = () => {
  const map = useMap();

  const count = {
    1: 0,
    2: 0,
    3: 0,
  };

  React.useEffect(() => {
    // geojsonData.features.forEach((feature) => {
    //   console.log(feature.properties.gridcode);
    // });
    // Convert heatmap data to the format required by leaflet.heat
    const heatPoints = heatmapData.map((point) => [
      point.lat,
      point.lng,
      point.intensity,
    ]);

    heatPoints.forEach((p: number[]) => {
      // console.log(p[2]);
      if (p[2] == 1) {
        count[1] += 1;
      } else if (p[2] == 2) {
        count[2] += 1;
      } else {
        count[3] += 1;
      }
    });
    // console.log(count);

    // @ts-expect-error: leaflet-heat type definitions are incomplete
    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,
      // max: 3,
      blur: 15,
      gradient: {
        0.0: "blue",
        0.5: "yellow",
        1: "red",
      },
    }).addTo(map);

    // Cleanup on unmount
    return () => {
      heatLayer.remove();
    };
  }, [map]);

  return null;
};

const HeatmapComponent = () => {
  const data = geojsonData as GeoJSON.GeoJsonObject;
  const zoom = useDynamicZoom();
  return (
    <div className="w-full h-full select-none !z-[1] relative">
      <MapContainer
        center={[-7.801363, 110.364787]}
        zoom={14}
        className="w-full h-full select-none"
        scrollWheelZoom={false}
      >
        <DynamicZoom zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy OpenStreetMap contributors"
        />
        <GeoJSON
          data={data}
          onEachFeature={(feature, layer) => {
            layer.on("add", () => {
              // @ts-expect-error: Leaflet type definitions are incomplete
              if (layer._path) {
                // @ts-expect-error: Leaflet type definitions are incomplete
                L.DomUtil.addClass(layer._path, "blur-polygon");
              }
            });
            layer.bindTooltip(
              `<span class="font-semibold font-poppins">${feature.properties.gridcode === 3 ? "Tinggi" : feature.properties.gridcode === 2 ? "Sedang" : "Rendah"}</span><br/>`
            );
          }}
          style={(feature) => {
            const colors = ["#59A8CC", "#FFFF4D", "#FF4D4D"];
            return {
              fillColor: colors[feature?.properties.gridcode - 1],
              fillOpacity: 0.65,
              color: "#23272A",
              weight: 0,
              blur: 15,
            };
          }}
        />
        {/* <HeatmapLayer /> */}
      </MapContainer>
      <br />
      {/* <MapContainer
        center={[-7.801363, 110.364787]}
        zoom={14}
        className="w-full h-full select-none"
      >
        <GeoJSON data={data} onEachFeature={(feature, layer) => {
          layer.bindTooltip(
            `<span class="font-semibold font-poppins">${feature.properties.gridcode}</span><br/>`
          );
        }} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy OpenStreetMap contributors"
        />
      </MapContainer> */}
    </div>
  );
};

export default HeatmapComponent;
