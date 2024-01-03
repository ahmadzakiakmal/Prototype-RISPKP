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
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Kepadatan Komersial</h1>
        <section className="h-[90vh] max-h-[900px] bg-red-500/10">
          <Map />
        </section>
      </main>
    </Layout>
  );
}