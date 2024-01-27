import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import data from "@/data/Titik_Sebaran_Hidran_Kering.json";

const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function SebaranHidranKering() {
  const markers:object[] = [];
  data.features.forEach((item: any) => {
    const marker = {
      position: [item.geometry.coordinates[1], item.geometry.coordinates[0]],
      iconUrl: "/pngs/HydrantDry.png",
      iconSize: [30,37.5],
      iconAnchor: [30, 37.5],
      popupAnchor: [0, -37.5/2.5*2],
      children: <div>
        <p className="font-semibold font-poppins text-wrap">{
          item.properties.kategori_h
        }</p>
        <p className="font-poppins text-wrap">
          Lokasi: <span className="font-semibold">{toPascalCase(item.properties.lokasi)}</span>
        </p>
        <p className="font-poppins text-wrap">
          Kondisi: <span className="font-semibold">{toPascalCase(item.properties.kondisi)}</span>
        </p>
      </div>,
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
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Titik Sebaran Hidran Kering</h1>
        <Map
          markers={markers}
        />
      </main>
    </Layout>
  );
}