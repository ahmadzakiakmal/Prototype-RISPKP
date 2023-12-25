import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function KepadatanKomersialPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanKomersial"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );

  return(
    <Layout>
      <main className="w-full h-[800px]">
        <h1 className="text-2xl font-bold mb-5">Peta Kepadatan Komersial</h1>
        <Map position={[-7.801363, 110.364787]} zoom={14} />
      </main>
    </Layout>
  );
}