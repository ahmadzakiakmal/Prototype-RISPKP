import Layout from "@/components/Layout";
import { BsFire } from "react-icons/bs";
import { useMemo } from "react";
import dynamic from "next/dynamic";

function RegionCard({ name }: { name: string }) {
  return (
    <div className="p-5 outline outline-1 outline-proto-200 shadow-md w-full rounded-[5px]">
      <h1 className="font-bold">{name}</h1>
      <hr className="my-1" />
      <h2 className="font-semibold">Level Risiko:</h2>
      <span className="text-green-600 font-bold text-[20px] flex items-center gap-2 mb-2">
        N/A <BsFire />
      </span>
      <h2 className="font-semibold">Riwayat Kasus Kebakaran</h2>
      <ul>
        <li>2023: N/A</li>
        <li>2022: N/A</li>
        <li>2021: N/A</li>
        <li>2020: N/A</li>
        <li>2019: N/A</li>
      </ul>
    </div>
  );
}

export default function DataPage() {
  const LineChart = useMemo(
    () =>
      dynamic(() => import("@/components/charts/LineChart"), {
        ssr: false,
        loading: () => <p>Chart Loading...</p>,
      }),
    []
  );

  return (
    <Layout>
      <main className="text-proto-300 bg-blue-500/0 flex flex-col justify-start items-center h-full gap-8">
        <section
          className="
        bg-white p-5 w-full rounded-[10px] shadow-md"
        >
          <h1 className="text-3xl font-bold">Data</h1>
        </section>

        <section className="bg-white p-5 w-full rounded-[10px] shadow-md grid grid-cols-1 min-[425px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <RegionCard name="Kota Yogyakarta" />
          <RegionCard name="Kabupaten Sleman" />
          <RegionCard name="Kabupatan Bantul" />
          <RegionCard name="Kabupaten Gunung Kidul" />
          <RegionCard name="Kabupaten Kulon Progo" />
        </section>

        <section className="bg-white p-5 w-full overflow-x-auto rounded-[10px] shadow-md grid grid-cols-1 min-[425px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-10">
          <LineChart />
        </section>
      </main>
    </Layout>
  );
}
