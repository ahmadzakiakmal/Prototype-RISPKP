import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        ssr: false,
        loading: () => <p>Map Loading...</p>,
      }),
    []
  );
  return (
    <Layout>
      <main className="text-proto-300 bg-blue-500/0 flex flex-col justify-center items-center h-full gap-8">
        <div
          className="
        bg-white p-5 w-full rounded-[10px] shadow-md"
        >
          <h1 className="text-3xl font-bold">Prototype</h1>
        </div>
        <div className="bg-white p-5 w-full min-h-screen rounded-[10px] shadow-md">
          <Map position={[-7.801363, 110.364787]} zoom={13} />
        </div>
      </main>
    </Layout>
  );
}
