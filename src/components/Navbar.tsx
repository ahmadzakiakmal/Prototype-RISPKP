import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import Image from "next/image";
import UGM from "../../public/logos/ugm.png";
import Damkar from "../../public/logos/damkar.png";
import Pemkot from "../../public/logos/pemkot.png";
import useLastScrollDirection from "@/hooks/useLastScrollDirection";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const lastScrollDir = useLastScrollDirection();
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setOpenProfile(false);
  }, [lastScrollDir]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "users/data", {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          toast.error("Anda belum login!");
          router.push("/");
        }
      });
  }, [router]);

  return (
    <nav
      className={
        "w-full p-5 bg-neutral-400 fixed top-0 transition duration-300 z-[10] flex text-white items-center justify-between "
        // + (lastScrollDir === "up" ? "" : "//-translate-y-[100%]")
      }
    >
      <Link 
        //! Change to "/dashboard" if dashboard is ready
        href="/dashboard/wilayah-manajemen-kebakaran/peta-waktu-tanggap"  
        className="flex items-center">
        <div className="hidden sm:flex gap-1 items-start">
          <Image src={Pemkot} alt="Pemkot" className="w-[30px]" />
          <Image src={Damkar} alt="Damkar" className="w-[40px]" />
          <Image src={UGM} alt="UGM" className="w-[40px]" />
        </div>
        <h1 className="sm:ml-[20px] text-[24px] font-bold">e-RISPKP</h1>
      </Link>

      <section className="relative">
        <div
          className="flex transition items-center gap-3 select-none hover:bg-neutral-100/10 cursor-pointer py-2 px-3 rounded-[5px]"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className="w-[35px] bg-white rounded-full aspect-square"></div>
          <h1 className="hidden sm:block">
            {username ? (
              <p className="min-w-[70px]">{username}</p>
            ) : (
              <div className="w-[100px] h-[24px] rounded-[8px] bg-slate-300 animate-pulse" />
            )}
          </h1>
        </div>

        <div
          className={
            "bg-neutral-400 px-3 absolute top-[calc(100%+30px)] rounded-[5px] right-0 w-max grid transition-[grid-template-rows,padding] " +
            (openProfile
              ? "grid-rows-[1fr] py-2 md:py-3"
              : "grid-rows-[0fr] !py-0")
          }
          onMouseLeave={() => setOpenProfile(false)}
        >
          <div className="overflow-hidden w-max">
            <button
              onClick={() => {
                const toastLoading = toast.loading("Loading...");
                axios
                  .post(
                    process.env.NEXT_PUBLIC_API_URL + "users/logout",
                    {},
                    { withCredentials: true }
                  )
                  .then(() => {
                    Cookies.remove("token", { path: "/" });
                    if(Cookies.get("token")) {
                      toast.update(toastLoading, {
                        render: "Gagal logout!",
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                      });
                    } else {
                      toast.update(toastLoading, {
                        render: "Berhasil logout!",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000,
                      });
                      setOpenProfile(false);
                      router.push("/");
                    }
                  })
                  .catch(() => {
                    toast.update(toastLoading, {
                      render: "Gagal logout!",
                      type: "error",
                      isLoading: false,
                      autoClose: 2000,
                    });
                  })
                  .finally(() => {
                    setOpenProfile(false);
                  });
                setOpenProfile(false);
              }}
              className="flex items-center gap-3 hover:bg-neutral-100/10 w-max py-1 px-2 rounded-[5px]"
            >
              <TbLogout2 /> Logout
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
