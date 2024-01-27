import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Titik_Sebaran_SPBU_Mini.json";

export default function SebaranSpbuMini() {
  const markers:object[] = [];
  data.features.forEach((item: any) => {
    const marker = {
      position: [item.geometry.coordinates[1], item.geometry.coordinates[0]],
      iconUrl: "/pngs/MiniGasStation.png",
      iconSize: [30,37.5],
      iconAnchor: [30, 37.5],
      popupAnchor: [0, -37.5/2.5*2],
      children: <p className="font-semibold font-poppins text-wrap">{item.properties.Name}</p>,
      key: item.properties.Name
    };
    markers.push(marker);
  });
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );

  return (
    <Layout>
      <main className="h-[80vh] max-h-[800px] relative">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Titik Sebaran SPBU Mini</h1>
        <Map
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
          markers={markers}
        />
      </main>
    </Layout>
  );
}