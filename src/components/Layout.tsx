import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-proto-200 flex font-poppins">
      <section className="w-[330px] bg-proto-300 //py-10 flex-shrink-0">
        <div className="flex justify-center items-center gap-3 border-b border-white py-8">
          <div className="w-[50px] aspect-square rounded-full bg-white" />
          <h1 className="text-[28px] font-bold">Prototype</h1>
        </div>
        
        <div className="flex flex-col gap-8 py-10 px-5 ">
          <Link href="/dashboard" className="flex justify-center items-center gap-3">
            <FaMapLocationDot className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium">Map</span>
          </Link>
          <Link href="/dashboard" className="flex justify-center items-center gap-3">
            <IoStatsChart className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium">Data</span>
          </Link>
          <Link href="/dashboard" className="flex justify-center items-center gap-3">
            <IoMdSettings className="text-[30px] flex-shrink-0" /> 
            <span className="text-[18px] font-medium">Settings</span>
          </Link>
        </div>
      </section>
      <section className="w-full p-10">{children}</section>
    </main>
  );
}
