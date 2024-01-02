import Layout from "@/components/Layout";
import PieChart from "@/components/charts/PieChart";

export default function StatistikKetangguhanKebakaranPage() {
  return (
    <Layout>
      <h1 className="text-xl sm:text-2xl font-bold mb-5">
        Akumulasi Penyelamatan
      </h1>
      <main className="w-[400px]">
        <PieChart />
      </main>
    </Layout>
  );
}
