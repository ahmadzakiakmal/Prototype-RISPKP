import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <main className="font-poppins text-neutral-400">
      <ToastContainer position="bottom-right" />
      {router.pathname.includes("dashboard") ||
      router.pathname.includes("admin") ? (
          <Navbar />
        ) : null}
      <Component {...pageProps} />
    </main>
  );
}
