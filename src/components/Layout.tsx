import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";
import useLastScrollDirection from "@/hooks/useLastScrollDirection";
import { useRouter } from "next/router";
import axios from "axios";
import usePostDistance from "@/hooks/usePostDistance";

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
  const closestPost = usePostDistance();

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
            "pt-[60px] sm:mb-10 px-3 !overflow-x-hidden h-max " +
            (isMenuOpen ? "" : "!p-0")
          }
        >
          <a
            href="https://wa.me/628112828113"
            target="null"
            rel="noreferrer noopener"
            className="block relative w-fit mb-3 rounded-[8px]"
          >
            <button className="bg-red-500 w-fit px-5 py-3 rounded-[8px] text-white font-bold relative z-[1] hover:translate-y-[1px] hover:bg-red-500/90 transition active:translate-y-[5px] active:shadow-[0_0_10px_rgb(255,255,255)]">
              Panic Button
            </button>
            <div className="absolute top-[5px] rounded-[8px] left-0 w-full h-full bg-red-800 z-0" />
          </a>
          <div className="text-[14px] mb-3">
            {isNaN(closestPost.distance) ||
            closestPost.post.Nama == "" ||
            isNaN(closestPost.post.Pos) ? (
                <h1>Gagal mendapatkan lokasi</h1>
              ) : (
                <>
                  <h1 className="font-semibold">Pos terdekat:</h1>
                  <p className="text-[16p]">
                    {closestPost.post.Nama} (Pos {closestPost.post.Pos}){" "}
                    <span className="hidden sm:inline">
                    - {closestPost.distance.toFixed(2)} km
                    </span>
                  </p>
                  <p className="sm:hidden">
                  Jarak {closestPost.distance.toFixed(2)} km
                  </p>
                </>
              )}
            {/* <h1 className="font-semibold">Jarak:</h1> */}
            {/* <p className="text-[16p]">{closestPost.distance.toFixed(2)} km <br/> Akurasi radius {closestPost.accuracy.toFixed(2)} meter</p> */}
          </div>

          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "sm:hidden")
            }
          >
            <h2 className="text-[16px] font-bold leading-[105%]">
              WILAYAH MANAJEMEN KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-waktu-tanggap"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-waktu-tanggap"
                )}
              >
                Peta Waktu Tanggap
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-wmk"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-wmk"
                )}
              >
                Peta WMK
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-sektor"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-sektor"
                )}
              >
                Peta Sektor
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-pos"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-pos"
                )}
              >
                Peta Pos
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-spbu"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-spbu"
                )}
              >
                Titik Sebaran SPBU
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-spbu-mini"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-spbu-mini"
                )}
              >
                Titik Sebaran SPBU Mini
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-hidran"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-hidran"
                )}
              >
                Titik Sebaran Hidran
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-hidran-kering"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/titik-sebaran-hidran-kering"
                )}
              >
                Titik Sebaran Hidran Kering
              </Link>
            </ul>
          </section>
          
          <section
            className={
              "border-t-2 border-neutral-400 py-3 " +
              (isMenuOpen ? "" : "sm:hidden")
            }
          >
            <h2 className="text-[16px] font-bold leading-[105%]">
              STATISTIK KEJADIAN KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <Link
                href="/dashboard/statistik-kejadian-kebakaran/peta-kejadian-kebakaran"
                className={isMenuActive(
                  "/dashboard/statistik-kejadian-kebakaran/peta-kejadian-kebakaran"
                )}
              >
                Peta Kejadian Kebakaran
              </Link>
              <Link
                href="/dashboard/statistik-kejadian-kebakaran/statistik-ketangguhan-kebakaran"
                className={isMenuActive(
                  "/dashboard/statistik-kejadian-kebakaran/statistik-ketangguhan-kebakaran"
                )}
              >
                Statistik Ketangguhan Kebakaran
              </Link>
              {/* //! Enable when GeoJSON is ready */}
              {/* <Link
                href="/dashboard/statistik-kejadian-kebakaran/peta-tanggap-kebakaran"
                className={isMenuActive("/dashboard/statistik-kejadian-kebakaran/peta-tanggap-kebakaran")}
              >
                Peta Tanggap Kebakaran
              </Link> */}
              <Link
                href="/dashboard/statistik-kejadian-kebakaran/akumulasi-penyelamatan"
                className={isMenuActive(
                  "/dashboard/statistik-kejadian-kebakaran/akumulasi-penyelamatan"
                )}
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
            <h2 className="text-[16px] font-bold leading-[105%]">
              ANALISIS RISIKO KEBAKARAN
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%]">
              <Link
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/metode-analisis-risiko-kebakaran"
                )}
                href="/dashboard/analisis-risiko-kebakaran/metode-analisis-risiko-kebakaran"
              >
                Metode Analisis Risiko Kebakaran
              </Link>
              <Link
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-kepadatan-penduduk"
                )}
                href="/dashboard/analisis-risiko-kebakaran/peta-kepadatan-penduduk"
              >
                Peta Kepadatan Penduduk
              </Link>
              <Link
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-kepadatan-bangunan"
                )}
                href="/dashboard/analisis-risiko-kebakaran/peta-kepadatan-bangunan"
              >
                Peta Kepadatan Bangunan
              </Link>
              <Link
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-bahaya-spbu"
                )}
                href="/dashboard/analisis-risiko-kebakaran/peta-bahaya-spbu"
              >
                Peta Bahaya SPBU
              </Link>
              <Link
                href="/dashboard/analisis-risiko-kebakaran/peta-bahaya-spbu-mini"
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-bahaya-spbu-mini"
                )}
              >
                Peta Bahaya SPBU Mini
              </Link>
              {/* //! Enable when GeoJSON is ready */}
              {/* <Link
                href="/dashboard/analisis-risiko-kebakaran/peta-jangkauan-pos"
                className={isMenuActive("/dashboard/analisis-risiko-kebakaran/peta-jangkauan-pos")}
              >
                Peta Jangkauan Pos
              </Link> */}
              <Link
                href="/dashboard/analisis-risiko-kebakaran/peta-kepadatan-komersial"
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-kepadatan-komersial"
                )}
              >
                Peta Kepadatan Komersial
              </Link>
              <Link
                href="/dashboard/analisis-risiko-kebakaran/peta-analisis-risiko-kebakaran"
                className={isMenuActive(
                  "/dashboard/analisis-risiko-kebakaran/peta-analisis-risiko-kebakaran"
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
            <h2 className="text-[16px] font-bold leading-[105%]">
              INFORMASI DAN PUBLIKASI
            </h2>
            <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
              <Link
                href="/dashboard/informasi-publikasi"
                className={isMenuActive("/dashboard/informasi-publikasi")}
              >
                Lihat Informasi
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
              <h2 className="text-[16px] font-bold leading-[105%]">
                ADMIN MENU
              </h2>
              <ul className="flex flex-col text-[15px] mt-2 gap-2 leading-[105%] list-disc">
                <Link
                  href="/dashboard/admin/user-management"
                  className={isMenuActive("/dashboard/admin/user-management")}
                >
                  User Management
                </Link>
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
