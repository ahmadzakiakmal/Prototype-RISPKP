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
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Peta Waktu Tanggap
        </h1>
        <section className="h-[60vh] md:h-[80vh] min-h-[520px] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} zoom={14} />

          <section className="absolute text-[10px] md:text-[12px] shadow-md rounded-[5px] bottom-0 left-0 p-[8px] md:p-[15px] bg-white outline outline-1 m-5 !z-[10] flex flex-col gap-1">
            <h1 className="text-[12px] md:text-[14px] font-semibold">
              Waktu Tanggap
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-[#74C24E] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>5 Menit</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#AEDE4E] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>7.5 Menit</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FFFF4D] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>10 Menit</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FFA64D] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>12.5 Menit</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FF4D4D] w-[50px] h-[20px] outline outline-1 outline-slate-500" />
              <p>15 Menit</p>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
