import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <nav className="w-full p-5 bg-neutral-400 fixed top-0 z-[10] flex text-white items-center justify-between">
      <Link href="/dashboard" className="flex">
        <div className="w-[40px] aspect-square bg-white rounded-full shadow-[0_0_5px_#000]" />
        <div className="w-[40px] aspect-square bg-white rounded-full shadow-[0_0_5px_#000] ml-[-10px]" />
        <div className="w-[40px] aspect-square bg-white rounded-full shadow-[0_0_5px_#000] ml-[-10px]" />
        <h1 className="ml-[20px] text-[24px] font-bold">RISPKP</h1>
      </Link>

      <section className="relative">
        <div
          className="flex transition items-center gap-3 select-none hover:bg-neutral-100/10 cursor-pointer py-2 px-3 rounded-[5px]"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className="w-[35px] bg-white rounded-full aspect-square"></div>
          <h1>Username</h1>
        </div>

        <div
          className={
            "bg-neutral-400 px-3 absolute top-[calc(100%+30px)] rounded-[5px] right-0 w-full grid transition-[grid-template-rows,padding] " +
            (openProfile ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr] !py-0")
          }
          onMouseLeave={() => setOpenProfile(false)}
        >
          <div className="overflow-hidden">
            <button className="flex items-center gap-3 hover:bg-neutral-100/10 w-full py-1 px-2 rounded-[5px]">
              <TbLogout2 /> Logout
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
