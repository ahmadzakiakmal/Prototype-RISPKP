import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-proto-100 flex font-poppins">
      <section className="bg-proto-300 flex-shrink-0">
        <div className="flex justify-center items-center gap-3 border-b border-white py-10 px-5 lg:!p-10">
          <div className="w-[30px] lg:w-[50px] aspect-square rounded-full bg-white" />
          <h1 className="text-[28px] font-bold hidden lg:block">Prototype</h1>
        </div>
        
        <div className="flex flex-col gap-5 py-10 px-5 ">
          <Link href="/" className="flex justify-start px-4 items-center gap-3 hover:bg-white/10 py-2 rounded-[8px] transition">
            <FaMapLocationDot className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium hidden lg:block">Map</span>
          </Link>
          <Link href="/data" className="flex justify-start px-4 items-center gap-3 hover:bg-white/10 py-2 rounded-[8px] transition">
            <IoStatsChart className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium hidden lg:block">Data</span>
          </Link>
          <Link href="#" className="flex justify-start px-4 items-center gap-3 hover:bg-white/10 py-2 rounded-[8px] transition">
            <IoMdSettings className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium hidden lg:block">Settings</span>
          </Link>
        </div>
      </section>
      <section className="w-full p-10">{children}</section>
    </main>
  );
}
