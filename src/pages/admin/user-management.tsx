import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserManagementPage() {
  interface User {
    _id: number;
    role: string;
    username: string;
  }

  const [users, setUsers] = useState([] as User[]);

  const getUsers = () => {
    const toastLoading = toast.loading("Mengambil data...");
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "users", {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
        toast.update(toastLoading, {
          render: "Berhasil",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        return;
      })
      .catch(() => {
        toast.update(toastLoading, {
          render: "Gagal",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">User Management</h1>
        <section className="w-full">
          <div className="flex flex-row items-center justify-between w-full border-t border-gray-300" />
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-gray-300"
            >
              <div className="flex flex-row items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="ml-3">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">
                    Role: {user.role}
                  </p>
                  <p className="text-sm text-gray-500">ID: {user._id}</p>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <button className="px-3 py-1 transition rounded-md bg-green-500 hover:bg-green-800 text-white">
                  Edit
                </button>
                <button className="px-3 py-1 transition rounded-md bg-red-500 hover:bg-red-800 text-white ml-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
