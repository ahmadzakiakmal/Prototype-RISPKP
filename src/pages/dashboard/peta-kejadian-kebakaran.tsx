import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function PetaKejadianKebakaranPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapFrekuensiKebakaran"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Kejadian Kebakaran</h1>
        <section className="h-[100vh] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} zoom={14} />

          <section className="absolute bottom-0 left-0 p-[15px] bg-white outline outline-1 m-5 !z-[10] flex flex-col gap-1">
            <h1 className="text-[14px] font-semibold">Kepadatan Penduduk</h1>
            <div className="text-[12px] flex items-center gap-3">
              <div className="bg-[#FFBEBE] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>Rendah</p>
            </div>
            <div className="text-[12px] flex items-center gap-3">
              <div className="bg-[#FF7F7F] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>Sedang</p>
            </div>
            <div className="text-[12px] flex items-center gap-3">
              <div className="bg-[#E60000] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>Tinggi</p>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
