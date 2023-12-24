import Layout from "@/components/Layout";

export default function MetodeAnalisisPage() {
  return (
    <Layout>
      <main>
        <h1 className="text-2xl font-bold">Metode Analisis Risiko Kebakaran</h1>
        <table className="w-full outline mt-5">
          <tbody>
            <tr className="">
              <th className="border-r-2 border-neutral-400">Kelas</th>
              <th className="border-r-2 border-neutral-400">Variabel</th>
              <th className="border-r-2 border-neutral-400">Bobot</th>
              <th className="border-r-2 border-neutral-400">Klasifikasi</th>
              <th>Keterangan</th>
            </tr>
            <RowItem
              kelas="Bahaya"
              kelasRowSpan={21}
              variabel="Sebaran SPBU"
              variabelRowSpan={3}
              bobot="50%"
              bobotRowSpan={21}
              klasifikasi="0.05 km"
              keterangan="Tinggi"
            />
            <RowItem
              klasifikasi="1.2 km"
              keterangan="Sedang"
            />
            <RowItem
              klasifikasi="> 1.2 km"
              keterangan="Rendah"
            />
            <RowItem
              variabel="Sebaran SPBU Mini"
              variabelRowSpan={3}
              klasifikasi="0.05 km"
              keterangan="Tinggi"
            />
            <RowItem klasifikasi="1.2 km" keterangan="Sedang" />
            <RowItem klasifikasi="> 1.2 km" keterangan="Rendah" />
          </tbody>
        </table>
      </main>
    </Layout>
  );
}

function RowItem(props: any) {
  const {
    kelas,
    variabel,
    bobot,
    klasifikasi,
    keterangan,
    kelasRowSpan,
    variabelRowSpan,
    bobotRowSpan,
  } = props;
  return (
    <tr className="border-t-2 border-neutral-400">
      {kelas && (
        <td
          className="text-center py-2 border-r-2 border-neutral-400"
          rowSpan={kelasRowSpan}
        >
          {kelas}
        </td>
      )}
      {variabel && (
        <td
          className="text-center py-2 border-r-2 border-neutral-400"
          rowSpan={variabelRowSpan}
        >
          {variabel}
        </td>
      )}
      {bobot && (
        <td
          className="text-center py-2 border-r-2 border-neutral-400"
          rowSpan={bobotRowSpan}
        >
          {bobot}
        </td>
      )}
      {klasifikasi && (
        <td className="text-center py-2 border-r-2 border-neutral-400">
          {klasifikasi}
        </td>
      )}
      {keterangan && <td className="text-center py-2">{keterangan}</td>}
    </tr>
  );
}
