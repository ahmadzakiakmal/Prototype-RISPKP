import Layout from "@/components/Layout";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function BahayaSPBUMiniPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapBahayaSPBUMini"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Sebaran SPBU Mini</h1>
        <section className="h-[60vh] md:h-[80vh] min-h-[520px] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} zoom={14} />
          <Legend colorArr={["bg-[#5EBA30]", "bg-[#FFFF30]", "bg-[#FF3030]"]} labelArr={["Rendah", "Sedang", "Tinggi"]} />
        </section>
      </main>
    </Layout>
  );
}
