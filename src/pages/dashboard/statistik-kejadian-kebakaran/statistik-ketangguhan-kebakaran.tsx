import Layout from "@/components/Layout";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";

export default function StatistikKetangguhanKebakaranPage() {
  const sectionClass:string = "bg-white rounded-[8px] shadow-lg p-5 h-fit";
  return (
    <Layout>
      <main className="w-full flex flex-col md:flex-row md:flex-wrap gap-10">
        <section className={sectionClass}>
          <h1 className="text-xl sm:text-2xl font-bold mb-5">
            Penyebab Kejadian Kebakaran
          </h1>
          <div className="w-full md:max-w-[400px]">
            <PieChart />
          </div>
        </section>
        <section className={sectionClass}>
          <h1 className="text-xl sm:text-2xl font-bold mb-5">
            Penyebab Kejadian Kebakaran
          </h1>
          <div className="w-full overflow-x-auto">
            <BarChart />
          </div>
        </section>
      </main>
    </Layout>
  );
}
