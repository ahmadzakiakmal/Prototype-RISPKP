import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/wilayah-manajemen-kebakaran/peta-waktu-tanggap");
  }, []);
  return(
    <Layout>
      <h1 className="mt-20"></h1>
    </Layout>
  );
}