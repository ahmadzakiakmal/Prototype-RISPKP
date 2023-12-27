import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function PetaWaktuTanggapPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapWaktuTanggap"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Waktu Tanggap</h1>
        <section className="h-[800px]">
          <Map position={[-7.801363, 110.364787]} zoom={14} />
        </section>
      </main>
    </Layout>
  );
}