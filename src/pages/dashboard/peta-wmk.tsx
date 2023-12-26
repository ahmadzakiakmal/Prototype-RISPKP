import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function PetaWMKPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapWMK"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full h-[800px]">
        <h1 className="text-2xl font-bold mb-5">Peta Wilayah Manajemen Kebakaran (WMK)</h1>
        <Map zoom={14} position={[-7.801363, 110.364787]} />
      </main>
    </Layout>
  );
}
