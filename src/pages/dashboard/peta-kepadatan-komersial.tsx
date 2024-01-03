import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function KepadatanKomersialPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanKomersial"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );

  return(
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Kepadatan Komersial</h1>
        <section className="h-[60vh] md:h-[80vh] min-h-[520px] max-h-[800px] relative">
          <Map />
          <Legend colorArr={["bg-[#59A8CC]", "bg-[#FFFF4D]", "bg-[#FF4D4D]"]} labelArr={["Rendah", "Sedang", "Tinggi"]} />
        </section>
      </main>
    </Layout>
  );
}