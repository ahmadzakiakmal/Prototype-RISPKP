import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import geojsonData1 from "@/data/Poin_Pos.json";
import geojsonData2 from "@/data/Cakupan_Pos.json";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";
import dataPos from "@/data/DataPos.json";

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
          if (feature?.properties.Sektor[5]) {
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
          const sektor = feature.properties.Sektor; // ? area
          const pos = feature.properties.Pos; // ? point
          const posId = feature.properties.PosId; // ? point
          const data = dataPos[posId - 1];
          if (sektor) {
            layer.bindTooltip(
              `
              <div style="font-family: 'poppins'">
                <span style="font-weight:600">Area ${sektor}</span>
                <br/>
              </div>
              `
            );
          } else {
            const htmlKelurahan = data?.Kelurahan;
            const htmlFasilitas = data?.Fasilitas;
            layer.bindTooltip(
              `
              <div class="font-poppins flex text-[12px]" >
                <div class="" >
                  <h1 class="font-bold text-[14px]">${pos} (${data?.Pos})</h1>
                  <hr class="my-1 border-black/90" />
                  <div class="flex gap-[10px]">
                  <div>
                      <img class="w-[250px]" src="/jpgs/Pos${posId}.jpg" alt="${pos}" /> 
                      <h2 style="font-weight:600">Kelurahan:</h2>
                      <p class="w-[250px]">${htmlKelurahan.join("<br/>")}</p>
                    </div>
                    <div>
                      <h2 style="font-weight:600">Fasilitas:</h2>
                      <p class="w-[250px]">${htmlFasilitas?.join("<br />")}</p>
                    </div>
                  </div>
                </div>
              </div>
              `,
              {
                interactive: true,
                className: "map-tooltip",
              }
            );
          }
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
