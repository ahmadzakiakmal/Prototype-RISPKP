import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function JangkauanPosPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapJangkauanPos"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full h-[800px]">
        <Map position={[-7.801363, 110.364787]} zoom={14} />
      </main>
    </Layout>
  );
}
