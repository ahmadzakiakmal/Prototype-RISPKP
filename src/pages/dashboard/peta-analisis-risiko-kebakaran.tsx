import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Risiko_Kebakaran.json";

export default function PetaAnalisisRisikoKebakaranPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );
  const geoJsonData = data as GeoJSON.GeoJsonObject;

  const LegendProps = {
    title: "Risiko Kebakaran",
    colorArr: ["bg-[#5EBA30]", "bg-[#FFFF30]", "bg-[#FF3030]"],
    labelArr: ["Rendah", "Sedang", "Tinggi"],
  };

  return(
    <Layout>
      <main className="h-[80vh] max-h-[800px] relative">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Analisis Risiko Kebakaran</h1>
        <Map
          geoJsonData={geoJsonData}
          LegendProps={LegendProps}
          geoJsonStyle={(feature) => {
            const level = feature?.properties.gridcode;
            return {
              fillColor:
                level == 1 ? "#5EBA30" : level == 2 ? "#FFFF30" : "#FF3030",
              fillOpacity: 0.65,
              color: "#23272A",
              weight: 0,
            };
          }}
          geoJsonOnEachFeature={(feature, layer) => {
            const level = feature.properties.gridcode === 1 ? "Rendah" : feature.properties.gridcode === 2 ? "Sedang" : "Tinggi";
            layer.bindTooltip(`<span style="font-weight:600">Tingkat Risiko: ${level}</span>`);
          }}
        />
      </main>
    </Layout>
  );
}