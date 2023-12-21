import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Navbar from "./Navbar";
import Link from "next/link";
import useLastScrollDirection from "@/hooks/useLastScrollDirection";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const lastScrollDir = useLastScrollDirection();
  return (
    <main className="min-h-screen bg-proto-100 flex font-poppins">
      <Navbar />

      <section
        className={
          "bg-green-400 relative transition-[width] !z-[2] " +
          (isMenuOpen ? "w-[270px]" : "w-0")
        }
      >
        {/* open menu button */}
        <button
          className={"sticky bg-green-400 left-[100%] outline outline-1 outline-white transition duration-300 top-[100px] w-10 aspect-square grid place-items-center "
            + (isMenuOpen ? " rounded-l-[5px]" : "rounded-r-[5px]") + " "
            + (lastScrollDir === "up" ? "" : "-translate-y-[200%]")
          }
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <FaAngleDoubleRight
            className={
              "text-white text-[20px] transition " +
              (isMenuOpen ? "rotate-180" : "")
            }
          />
        </button>

        <div
          className={
            "pt-[120px] px-3 !overflow-x-hidden " + (isMenuOpen ? "" : "!p-0")
          }
        >
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              ANALISIS RISIKO KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <li>
                <Link href="#">Metode Analisis Risiko Kebakaran</Link>
              </li>
              <Link href="/dashboard/peta-kepadatan-penduduk">Peta Kepadatan Penduduk</Link>
              <Link href="/dashboard/peta-kepadatan-bangunan">Peta Kepadatan Bangunan</Link>
              <Link href="#">Peta Bahaya SPBU</Link>
              <Link href="#">Peta Bahaya SPBU Mini</Link>
              <Link href="#">Peta Jangkauan Pos</Link>
              <Link href="#">Peta Kepadatan Komersial</Link>
              <Link href="#">Peta Analisis Risiko Kebakaran</Link>
            </ul>
          </section>
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              STATISTIK KEJADIAN KEBAKARAN
            </h2>
          </section>
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              WILAYAH MANAJEMEN KEBAKARAN
            </h2>
          </section>
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              USER MANAGEMENT
            </h2>
          </section>
        </div>
      </section>
      <section className="w-full px-10 mt-[120px] pb-10 relative z-[1]">{children}</section>
    </main>
  );
}
