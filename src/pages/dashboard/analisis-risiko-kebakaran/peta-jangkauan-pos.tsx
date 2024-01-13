import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Cakupan_Pos.json";

export default function JangkauanPosPage() {
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
    title: "Cakupan Pos",
    colorArr: ["bg-[#FAD155]", "bg-[#F2A72E]", "bg-[#AD5313]"],
    labelArr: ["Rendah", "Sedang", "Tinggi"],
  };

  return (
    <Layout>
      <main className="h-[80vh] max-h-[800px] relative">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Jangkauan Pos</h1>
        <Map
          geoJsonData={geoJsonData}
          LegendProps={LegendProps}
          geoJsonStyle={(feature) => {
            const level = feature?.properties.gridcode;
            return {
              fillColor:
                level == 3 ? "#FAD155" : level == 2 ? "#F2A72E" : "#000",
              fillOpacity: 0.65,
              color: "#23272A",
              weight: 2,
            };
          }}
          geoJsonOnEachFeature={(feature, layer) => {
            const sektor = feature.properties.Sektor;
            const level = feature.properties.Klas_ha;
            layer.bindTooltip(`<span class="font-semibold font-poppins">${sektor}</span><br/>
            <span>Kepadatan Penduduk: ${level}</span>`);
          }}
        />
      </main>
    </Layout>
  );
}
