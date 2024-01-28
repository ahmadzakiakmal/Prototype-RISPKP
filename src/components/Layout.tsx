import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";
import useLastScrollDirection from "@/hooks/useLastScrollDirection";
import { useRouter } from "next/router";
import axios from "axios";
import usePostDistance from "@/hooks/usePostDistance";
import Image from "next/image";
import { PiCaretDownBold } from "react-icons/pi";
import { toast } from "react-toastify";

interface User {
  username: string;
  role: string;
}

type Weather = {
  jamCuaca: string;
  humidity: number;
  tempC: number;
  kodeCuaca: number;
  cuaca: string;
};

interface WeatherForecast {
  today: Weather[] | null;
  tomorrow: Weather[] | null;
}

type IconMapper = {
  [key: number]: string;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const lastScrollDir = useLastScrollDirection();
  const [user, setUser] = useState<User>({
    username: "",
    role: "",
  });
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>({
    today: null,
    tomorrow: null,
  });
  const [showWeatherToday, setShowWeatherToday] = useState<boolean>(true);
  const [openWeatherSection, setOpenWeatherSection] = useState<boolean>(true);
  const router = useRouter();
  const closestPost = usePostDistance();
  const kotaId = "501190";
  const baseUrl =
    "https://raw.githubusercontent.com/ahmadzaki2975/Weather-Web/df11260006f649aaec977d63814373212017a6fa/public/Weather%20Icons/";
  const iconMapper: IconMapper = {
    1: "Bright%20Sky.svg",
    2: "Bright%20Sky.svg",
    3: "Mostly%20Cloudy.svg",
    4: "Overcast.svg",
    5: "Haze.svg",
    10: "Smoke.svg",
    45: "Fog.svg",
    60: "Light%20Rain.svg",
    61: "Rain.svg",
    63: "Heavy%20Rain.svg",
    80: "Local%20Rain.svg",
    95: "Thunderstorm.svg",
    97: "Thunderstorm.svg",
  };

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

  useEffect(() => {
    axios
      .get("https://ibnux.github.io/BMKG-importer/cuaca/" + kotaId + ".json")
      .then((res) => {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const formattedDateToday = `${year}-${month < 10 && "0"}${
          month + 1
        }-${date}`;
        const formattedDateTomorrow = `${year}-${month < 10 && "0"}${
          month + 1
        }-${date + 1}`;
        // console.log(`${year}-${month < 10 && "0"}${month + 1}-${date}`);
        // console.log(res.data);
        const weatherToday: Weather[] = [];
        const weatherTomorrow: Weather[] = [];
        res.data.forEach((weather: Weather) => {
          if (weather.jamCuaca.slice(0, 10) === formattedDateToday) {
            weatherToday.push(weather);
          }
          if (weather.jamCuaca.slice(0, 10) === formattedDateTomorrow) {
            weatherTomorrow.push(weather);
          }
        });
        setWeatherForecast({
          today: weatherToday,
          tomorrow: weatherTomorrow,
        });
      })
      .catch(() => {
        toast.error("Gagal mengambil data cuaca");
      });
  }, []);

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
            <button
              onClick={() => {
                setOpenWeatherSection(!openWeatherSection);
              }}
              className="flex w-full justify-between items-center"
            >
              <h2 className="text-[16px] font-bold leading-[105%] cursor-pointer select-none">
                PREDIKSI CUACA
              </h2>
              <PiCaretDownBold
                className={`transition duration-200 ${
                  openWeatherSection ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ${
                openWeatherSection ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-y-hidden">
                <div className="flex gap-3 my-2">
                  <button
                    onClick={() => setShowWeatherToday(true)}
                    className={`text-[14px] font-semibold px-2 py-1 rounded-full ${
                      showWeatherToday ? "bg-green-200" : "bg-green-300"
                    }`}
                  >
                    Hari ini
                  </button>
                  <button
                    onClick={() => setShowWeatherToday(false)}
                    className={`text-[14px] font-semibold px-2 py-1 rounded-full ${
                      !showWeatherToday ? "bg-green-200" : "bg-green-300"
                    }`}
                  >
                    Besok
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {weatherForecast[
                    `${showWeatherToday ? "today" : "tomorrow"}`
                  ]?.map((weather) => {
                    return (
                      <div className="text-[14px] flex items-end gap-2">
                        <div>
                          <h1 className="font-medium">
                            {weather.jamCuaca.slice(11, 16)}
                          </h1>
                          <p className="font-bold">{weather.cuaca}</p>
                        </div>
                        <p className="font-semibold">{weather.tempC}&deg; C</p>
                        <Image
                          alt={weather.cuaca}
                          src={baseUrl + iconMapper[weather.kodeCuaca]}
                          width={30}
                          height={30}
                        />
                      </div>
                    );
                  })}
                  <p className="text-[12px] font-medium">
                    sumber:&nbsp;
                    <a
                      href="https://data.bmkg.go.id/prakiraan-cuaca/"
                      className="hover:underline"
                    >
                      Badan Meteorologi, Klimatologi, dan Geofisika
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

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
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-jalan-kota"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-jalan-kota"
                )}
              >
                Peta Jalan Kota
              </Link>
              <Link
                href="/dashboard/wilayah-manajemen-kebakaran/peta-redkar"
                className={isMenuActive(
                  "/dashboard/wilayah-manajemen-kebakaran/peta-redkar"
                )}
              >
                Peta Redkar per Kelurahan
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
