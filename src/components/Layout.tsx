import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";
import useLastScrollDirection from "@/hooks/useLastScrollDirection";
import { useRouter } from "next/router";
import axios from "axios";

interface User {
  username: string;
  role: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const lastScrollDir = useLastScrollDirection();
  const [user, setUser] = useState<User>({
    username: "",
    role: "",
  });
  const router = useRouter();

  function isMenuActive(route: string): string {
    return router.pathname === route ? " font-semibold underline" : "";
  }

  useEffect(() => {
    if (window.innerWidth < 640) setIsMenuOpen(false);
  }, [router]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "users/data", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("User authentication failed!");
      });
  }, [router]);

  return (
    <main className="max-h-screen h-[200vh] bg-proto-100 flex font-poppins">
      <section
        className={
          "bg-green-400 fixed top-0 sm:relative flex-shrink-0 h-screen sm:h-full sm:min-h-[100vh] transition-[width] pb-10 sm:pb-0 !z-[2] " +
          (isMenuOpen ? "w-[230px] sm:w-[270px] overflow-y-auto" : "w-0")
        }
      >
        {/* open menu button */}
        <button
          className={
            "sticky bg-green-400 left-[100%] outline outline-1 outline-white transition duration-300 top-[100px] w-10 aspect-square grid place-items-center " +
            (isMenuOpen ? " rounded-l-[5px]" : "rounded-r-[5px]") +
            " " +
            (lastScrollDir === "up" ? "" : "-translate-y-[50%]")
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
            "pt-[120px] sm:mb-10 px-3 !overflow-x-hidden h-max " +
            (isMenuOpen ? "" : "!p-0")
          }
        >
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "sm:hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              ANALISIS RISIKO KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%]">
              <Link
                className={isMenuActive(
                  "/dashboard/metode-analisis-risiko-kebakaran"
                )}
                href="/dashboard/metode-analisis-risiko-kebakaran"
              >
                Metode Analisis Risiko Kebakaran
              </Link>
              <Link
                className={isMenuActive("/dashboard/peta-kepadatan-penduduk")}
                href="/dashboard/peta-kepadatan-penduduk"
              >
                Peta Kepadatan Penduduk
              </Link>
              <Link
                className={isMenuActive("/dashboard/peta-kepadatan-bangunan")}
                href="/dashboard/peta-kepadatan-bangunan"
              >
                Peta Kepadatan Bangunan
              </Link>
              <Link
                className={isMenuActive("/dashboard/peta-bahaya-spbu")}
                href="/dashboard/peta-bahaya-spbu"
              >
                Peta Bahaya SPBU
              </Link>
              <Link
                href="/dashboard/peta-bahaya-spbu-mini"
                className={isMenuActive("/dashboard/peta-bahaya-spbu-mini")}
              >
                Peta Bahaya SPBU Mini
              </Link>
              {/* //! Enable when GeoJSON is ready */}
              {/* <Link
                href="/dashboard/peta-jangkauan-pos"
                className={isMenuActive("/dashboard/peta-jangkauan-pos")}
              >
                Peta Jangkauan Pos
              </Link> */}
              <Link
                href="/dashboard/peta-kepadatan-komersial"
                className={isMenuActive("/dashboard/peta-kepadatan-komersial")}
              >
                Peta Kepadatan Komersial
              </Link>
              <Link
                href="/dashboard/peta-analisis-risiko-kebakaran"
                className={isMenuActive(
                  "/dashboard/peta-analisis-risiko-kebakaran"
                )}
              >
                Peta Analisis Risiko Kebakaran
              </Link>
            </ul>
          </section>
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "sm:hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              STATISTIK KEJADIAN KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <Link
                href="/dashboard/peta-kejadian-kebakaran"
                className={isMenuActive("/dashboard/peta-kejadian-kebakaran")}
              >
                Peta Kejadian Kebakaran
              </Link>
              <Link
                href="/dashboard/statistik-ketangguhan-kebakaran"
                className={isMenuActive(
                  "/dashboard/statistik-ketangguhan-kebakaran"
                )}
              >
                Statistik Ketangguhan Kebakaran
              </Link>
              {/* //! Enable when GeoJSON is ready */}
              {/* <Link
                href="/dashboard/peta-tanggap-kebakaran"
                className={isMenuActive("/dashboard/peta-tanggap-kebakaran")}
              >
                Peta Tanggap Kebakaran
              </Link> */}
              <Link
                href="/dashboard/akumulasi-penyelamatan"
                className={isMenuActive("/dashboard/akumulasi-penyelamatan")}
              >
                Akumulasi Penyelamatan
              </Link>
            </ul>
          </section>
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "sm:hidden")
            }
          >
            <h2 className="text-[14px] font-bold leading-[105%]">
              WILAYAH MANAJEMEN KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <Link
                href="/dashboard/peta-waktu-tanggap"
                className={isMenuActive("/dashboard/peta-waktu-tanggap")}
              >
                Peta Waktu Tanggap
              </Link>
              <Link
                href="/dashboard/peta-wmk"
                className={isMenuActive("/dashboard/peta-wmk")}
              >
                Peta WMK
              </Link>
              <Link
                href="/dashboard/peta-sektor"
                className={isMenuActive("/dashboard/peta-sektor")}
              >
                Peta Sektor
              </Link>
              <Link
                href="/dashboard/peta-pos"
                className={isMenuActive("/dashboard/peta-pos")}
              >
                Peta Pos
              </Link>
            </ul>
          </section>
          {user.role === "admin" && (
            <section
              className={
                "border-t-2 border-neutral-400 py-3 " +
                (isMenuOpen ? "" : "sm:hidden")
              }
            >
              <h2 className="text-[14px] font-bold leading-[105%]">
                ADMIN MENU
              </h2>
              <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
                <Link href="/admin/user-management">User Management</Link>
              </ul>
            </section>
          )}
        </div>
      </section>
      <section className="w-full px-[5%] sm:pl-7 sm:pr-5 md:pl-12 md:pr-10 pt-[140px] sm:pt-[120px] pb-20 relative z-[1] overflow-x-hidden">
        {user.username !== "" ? (
          children
        ) : (
          <div className="relative w-full h-full backdrop-blur-[8px] flex flex-col gap-5 justify-center items-center z-[1]">
            <div className="w-[100px] aspect-square border-b-[5px] border-t-[5px] border-neutral-400 rounded-full animate-spin" />
            <p className="animate-pulse text-[20px] font-semibold">
              Loading...
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
