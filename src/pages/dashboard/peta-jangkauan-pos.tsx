import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function JangkauanPosPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapJangkauanPos"), {
        ssr: false,
        loading: () => <Loading />,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full">
        <section className="h-[80vh] max-h-[800px]">
          <Map position={[-7.801363, 110.364787]} zoom={14} />
        </section>
      </main>
    </Layout>
  );
}
