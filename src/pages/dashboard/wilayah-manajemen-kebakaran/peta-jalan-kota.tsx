import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Jalan_Kota.json";

export default function PetaJalanKota() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );
  const geoJsonData = data as GeoJSON.GeoJsonObject;

  return (
    <Layout>
      <main className="h-[80vh] max-h-[800px] relative">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Jalan Kota  </h1>
        <Map
          geoJsonData={geoJsonData}
          LegendProps={{
            title: "Jenis Jalan",
            colorArr: [
              "bg-[#FF0000]",
              "bg-[#FF8C00]",
              "bg-[#324344]",
              "bg-[#47A41A]",
              "bg-[#5C10BE]",
            ],
            labelArr: [
              "Jalan Arteri",
              "Jalan Kolektor",
              "Jalan Lokal",
              "Jalan Setapak",
              "Jalan Lain",
            ],
          }}
          geoJsonStyle={(feature) => {
            const remark = feature?.properties?.REMARK;
            return {
              color:
                remark === "Jalan Arteri"
                  ? "#FF0000"
                  : remark === "Jalan Kolektor"
                    ? "#FF8C00"
                    : remark === "Jalan Lokal"
                      ? "#324344"
                      : remark === "Jalan Setapak"
                        ? "#47A41A"
                        : "#5C10BE",
              weight: 3,
            };
          }}
          geoJsonOnEachFeature={(feature, layer) => {
            const remark = feature?.properties.REMARK;
            layer.bindTooltip(
              `<span class="font-semibold font-poppins">${remark}</span>`
            );
          }}
        />
      </main>
    </Layout>
  );
}
