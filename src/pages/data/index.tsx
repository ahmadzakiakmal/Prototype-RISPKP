import Layout from "@/components/Layout";

export default function DataPage() {
  return (
    <Layout>
      <main className="text-proto-300 bg-blue-500/0 flex flex-col justify-start items-center h-full gap-8">
        <section
          className="
        bg-white p-5 w-full rounded-[10px] shadow-md"
        >
          <h1 className="text-3xl font-bold">Data</h1>
        </section>

        <section className="bg-white p-5 w-full rounded-[10px] shadow-md">
          <div className="p-5 outline outline-1 outline-proto-200 shadow-md w-fit rounded-[5px]">
            <h1 className="font-semibold">Kota Yogyakarta</h1>
            <hr />
            <h2>Riwayat Kasus Kebakaran</h2>
            <ul>
              <li>2023: N/A</li>
              <li>2022: N/A</li>
              <li>2021: N/A</li>
              <li>2020: N/A</li>
              <li>2019: N/A</li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
