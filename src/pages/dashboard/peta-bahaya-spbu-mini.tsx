import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function BahayaSPBUMiniPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapBahayaSPBUMini"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="w-full h-[800px]">
        <Map zoom={14} position={[-7.801363, 110.364787]} />
      </main>
    </Layout>
  );
}
