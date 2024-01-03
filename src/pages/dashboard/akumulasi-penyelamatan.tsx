import Layout from "@/components/Layout";
import Legend from "@/components/map/utilities/Legend";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function AkumulasiPenyelamatan() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapFrekuensiPenyelamatan"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Akumulasi Penyelamatan</h1>
        <section className="h-[80vh] max-h-[800px] relative">
          <Map position={[-7.801363, 110.364787]} zoom={14} />
          <Legend title="Akumulasi Penyelamatan" colorArr={["bg-[#FFBEBE]", "bg-[#FF7F7F]", "bg-[#E60000]"]} labelArr={["Rendah", "Sedang", "Tinggi"]} />
        </section>
      </main>
    </Layout>
  );
}
