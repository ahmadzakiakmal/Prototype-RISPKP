import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function PetaWaktuTanggapPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapWaktuTanggap"), {
        ssr: false,
        loading: () => <Loading />,
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
          <Legend
            title="Waktu Tanggap"
            colorArr={[
              "bg-[#74C24E]",
              "bg-[#AEDE4E]",
              "bg-[#FFFF4D]",
              "bg-[#FFA64D]",
              "bg-[#FF4D4D]",
            ]}
            labelArr={[
              "5 Menit",
              "7.5 Menit",
              "10 Menit",
              "12.5 Menit",
              "15 Menit",
            ]}
          />
        </section>
      </main>
    </Layout>
  );
}
