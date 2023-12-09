import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Map Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="text-black bg-blue-500/10 flex justify-center items-center h-full">
        <Map position={[-7.801363, 110.364787]} zoom={13} />
      </main>
    </Layout>
  );
}
