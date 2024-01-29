import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function AkumulasiPenyelamatan() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapDasar"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Peta Dasar Manajemen Kebakaran</h1>
        <section className="h-[80vh] max-h-[800px] relative">
          <Map />
        </section>
      </main>
    </Layout>
  );
}
