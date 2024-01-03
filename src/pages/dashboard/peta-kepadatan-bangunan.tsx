import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function KepadatanBangunanPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapKepadatanBangunan"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
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
          <section className="absolute text-[10px] md:text-[12px] shadow-md rounded-[5px] bottom-0 left-0 p-[8px] md:p-[15px] bg-white outline outline-1 m-5 !z-[10] flex flex-col gap-1">
            <h1 className="text-[12px] md:text-[14px] font-semibold">
              Kepadatan Bangunan
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-[#FAD155] w-[30px] md:w-[50px] aspect-[5/2] outline outline-1 outline-slate-500" />
              <p>Rendah</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#F2A72E] w-[30px] md:w-[50px] aspect-[5/2] outline outline-1 outline-slate-500" />
              <p>Sedang</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#AD5313] w-[30px] md:w-[50px] aspect-[5/2] outline outline-1 outline-slate-500" />
              <p>Tinggi</p>
            </div>
          </section>

          <Map position={[-7.801363, 110.364787]} zoom={14} />
        </section>
      </main>
    </Layout>
  );
}
