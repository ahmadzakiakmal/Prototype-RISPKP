import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function KepadatanBangunanPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanBangunan"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Peta Kepadatan Bangunan
        </h1>
        <section className="h-[60vh] md:h-[80vh] min-h-[520px] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} zoom={14} />
          <Legend
            title="Kepadatan Bangunan"
            colorArr={["bg-[#FAD155]", "bg-[#F2A72E]", "bg-[#AD5313]"]}
            labelArr={["Rendah", "Sedang", "Tinggi"]}
          />
        </section>
      </main>
    </Layout>
  );
}
