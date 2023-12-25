import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function MapKepadatanPendudukPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanPenduduk"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );

  return(
    <Layout>
      <main className="h-[800px] w-full">
        <h1 className="text-2xl font-bold mb-5">Peta Kepadatan Penduduk</h1>
        <Map position={[-7.801363, 110.364787]} zoom={14} />
      </main>
    </Layout>
  );
}