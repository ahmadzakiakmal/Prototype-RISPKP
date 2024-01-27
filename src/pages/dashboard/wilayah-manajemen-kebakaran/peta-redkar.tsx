import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Redkar_Per_Kelurahan.json";

export default function PetaRedkarKelurahan() {
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
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Redkar per Kelurahan</h1>
        <Map
          geoJsonData={geoJsonData}
          geoJsonStyle={(feature) => {
            type colorMap = {
              [key: number]: string;
            }
            const jumlahRedkar:number = feature?.properties.Jum_Redkar;
            const colors: colorMap = {
              10: "#B8FCD4",
              11: "#FCB3F6",
              12: "#FCCAB6",
              13: "#B6DEFC",
              14: "#F9FCB6",
              15: "#C6BDFC",
              16: "#FCB8CE",
              17: "#FCF2D2",
              18: "#F7D4FC",
              20: "#D7FCEB",
              25: "#B3FCB6"
            };
            return {
              fillColor: colors[jumlahRedkar],
              fillOpacity: 0.7,
              color: "#233132",
              weight: 1,
            };
          }}
          geoJsonOnEachFeature={(feature, layer) => {
            const jumlahRedkar = feature?.properties.Jum_Redkar;
            const kelurahan = feature?.properties.DESA;
            layer.bindTooltip(
              `
              <p class="font-semibold font-poppins">${kelurahan}</p>
              <p class="font-poppins">Jumlah Redkar: <span class="font-semibold">${jumlahRedkar}</span></p>
              `
            );
          }}
        />
      </main>
    </Layout>
  );
}
