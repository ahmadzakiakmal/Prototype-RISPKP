import Layout from "@/components/Layout";
import ReportIcon from "@/../public/pngs/ReportIcon.png";
import ManagerIcon from "@/../public/pngs/ManagerIcon.png";
import ProcedureIcon from "@/../public/pngs/ProcedureIcon.png";
import Image from "next/image";

export default function InformasiDanPublikasi() {
  return (
    <Layout>
      <main>
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Dokumen Utama
        </h1>
        <section className="max-w-[1500px]">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
            <MainDocument
              title="Laporan Kinerja Damkarmat Kota Yogyakarta Tahun 2022"
              image={ReportIcon}
              path="/pdfs/laporan-kinerja-damkarmat-kota-yogyakarta-tahun-2022.pdf"
            />
            <MainDocument
              title="Penanggung jawab Program dan Kegiatan Dinas Damkarmat Kota Yogyakarta Tahun 2023"
              image={ManagerIcon}
              path="/pdfs/penanggung-jawab-program-dan-kegiatan-dinas-damkarmat-kota-yogyakarta-tahun-2023.pdf"
            />
            <MainDocument
              title="Standar Operasional Prosedur Dinas Damkarmat Kota Yogyakarta"
              image={ProcedureIcon}
              path="/pdfs/standar-operasional-prosedur-dinas-damkarmat-kota-yogyakarta.pdf"
            />
          </section>
          {/* // ? Credits */}
          <div className="text-slate-400 w-full text-center mt-5 px-10 text-[14px]">
            <a target="_blank" href="https://icons8.com/icon/13532/ratings">
              Ratings Icon
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://icons8.com/icon/114317/admin-settings-male"
            >
              Admin Icon
            </a>
            , and{" "}
            <a target="_blank" href="https://icons8.com/icon/103983/brief">
              Brief Icon
            </a>{" "}
            by{" "}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </div>
        </section>

        <h1 className="text-xl sm:text-2xl font-bold mb-5 mt-10">
          Dokumen Lainnya
        </h1>
        <section>
          <ul className="list-disc ml-5">
            <Document
              path="anggaran-program-dan-kegiatan-dinas-damkarmat-kota-yogyakarta-tahun-2023.pdf"
              title="Anggaran Program dan Kegiatan Dinas Damkarmat Kota Yogyakarta Tahun 2023"
            />
            <Document
              path="laporan-aset-dinas-damkarmat-kota-yogyakarta-tahun-2022.pdf"
              title="Laporan Aset Dinas Damkarmat Kota Yogyakarta Tahun 2022"
            />
            <Document
              path="laporan-harta-kekayaanpenyelenggara-negara-dinas-damkarmat-kota-yogyakarta-yahun-2022.pdf"
              title="Laporan Harta Kekayaan Penyelenggara Negara Dinas Damkarmat Kota Yogyakarta Tahun 2022"
            />
            <Document
              path="laporan-inventarisasi-dinas-damkarmat-kota-yogyakarta-tahun-2022.pdf"
              title="Laporan Inventarisasi Dinas Damkarmat Kota Yogyakarta Tahun 2022"
            />
            <Document
              path="laporan-kinerja-damkarmat-kota-yogyakarta-tahun-2022.pdf"
              title="Laporan Kinerja Damkarmat Kota Yogyakarta Tahun 2022"
            />
            <Document
              path="penanggung-jawab-program-dan-kegiatan-dinas-damkarmat-kota-yogyakarta-tahun-2023.pdf"
              title="Penanggung Jawab Program dan Kegiatan Dinas Damkarmat Kota Yogyakarta Tahun 2023"
            />
            <Document
              path="pengadaan-barang-dan-jasa-dinas-damkarmat-kota-yogyakarta-tahun-2023.pdf"
              title="Pengadaan Barang dan Jasa Dinas Damkarmat Kota Yogyakarta Tahun 2023"
            />
            <Document
              path="program-dan-kegiatan-dinas-damkarmat-kota-yogyakarta-tahun-2023.pdf"
              title="Program dan Kegiatan Dinas Damkarmat Kota Yogyakarta Tahun 2023"
            />
            <Document
              path="standar-operasional-prosedur-dinas-damkarmat-kota-yogyakarta.pdf"
              title="Standar Operasional Prosedur Dinas Damkarmat Kota Yogyakarta"
            />
            <Document
              path="target-dan-capaian-kegiatan-apbd-dinas-damkarmat-kota-yogyakarta-triwulan-1-tahun-2023.pdf"
              title="Target dan Capaian Kegiatan APBD Dinas Damkarmat Kota Yogyakarta Triwulan 1 Tahun 2023"
            />
          </ul>
        </section>
      </main>
    </Layout>
  );
}

interface MainDocumentProps {
  title: string;
  image: any;
  path: string;
}
function MainDocument(props: MainDocumentProps) {
  return (
    <a 
      href={props.path} 
      className="flex justify-start items-center gap-5 bg-white p-3 xl:p-5 rounded-[10px] shadow-[0_4px_5px_rgba(0,0,0,.3)] max-w-[620px] lg:max-w-none min-h-[100px] hover:shadow-[0_4px_8px_rgba(0,0,0,.5)] active:shadow-[0_4px_10px_rgba(0,0,0,.7)] transition"
      target="null"
      rel="noopener noreferrer"
    >
      <Image
        src={props.image}
        alt="ReportIcon"
        className="w-[50px] lg:w-[60px]"
      />
      <h2 className="font-bold text-[14px] md:text-[16px]">{props.title}</h2>
    </a>
  );
}

interface DocumentProps {
  title: string;
  path: string;
}
function Document(props:DocumentProps) {
  return(
    <li>
      <a href={props.path} className="hover:underline active:text-black">
        <h2>{props.title}</h2>
      </a>
    </li>
  );
}