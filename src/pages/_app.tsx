import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <main className="font-poppins text-neutral-400">
      {router.pathname.includes("dashboard") ? <Navbar /> : null}
      <Component {...pageProps} />
    </main>
  );
}
