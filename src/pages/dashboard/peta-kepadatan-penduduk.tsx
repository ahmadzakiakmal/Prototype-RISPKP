import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function MapKepadatanPendudukPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanPenduduk"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );

  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Peta Kepadatan Penduduk
        </h1>
        <section className="h-[60vh] md:h-[80vh] min-h-[520px] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} />
          <Legend
            title="Kepadatan Penduduk"
            colorArr={["bg-[#8EB8B1]", "bg-[#4A7E78]", "bg-[#0C4D46]"]}
            labelArr={["Rendah", "Sedang", "Tinggi"]}
          />
        </section>
      </main>
    </Layout>
  );
}
