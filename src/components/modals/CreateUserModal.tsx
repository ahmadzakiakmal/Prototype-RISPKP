import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

interface ModalProps {
  setIsOpen: (value: boolean) => void;
}

export default function CreateUserModal(props: ModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const createUser = (e: any) => {
    e.preventDefault();
    if(!isUsernameValid) 
      return toast.error("Username harus lebih dari 4 karakter");
    if(!isPasswordValid)
      return toast.error("Password harus lebih dari 8 karakter");

    const toastLoading = toast.loading("Sedang membuat user...");
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "users",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toast.update(toastLoading, {
          render: "Berhasil membuat user!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastLoading, {
          render: err.response.data ?? "Gagal membuat user!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  return (
    <main className="fixed top-0 left-0 w-full h-full bg-slate-800/60 backdrop-blur-[8px] z-[999] flex justify-center items-center">
      <div
        className="absolute w-full h-full"
        onClick={() => props.setIsOpen(false)}
      />
      <section className="p-10 relative bg-white shadow-lg rounded-[8px] w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] z-[10]">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Buat User Baru</h1>
        <form
          onSubmit={(e) => {
            createUser(e);
          }}
          className="flex flex-col gap-5"
        >
          <label className="flex flex-col w-full">
            <span className="text-neutral-400/80 text-[14px]">Username</span>
            <input
              type="text"
              className={
                "w-full py-1 px-2 bg-transparent transition border-b-2 border-green-300/80 focus:border-green-200 !outline-none " +
                (isUsernameValid ? "" : "!border-red-500")
              }
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUsernameValid(e.target.value.length >= 4);
              }}
            />
          </label>

          <label className="flex flex-col w-full">
            <span className="text-neutral-400/80 text-[14px]">Password</span>
            <div className="flex relative">
              <input
                type={showPassword ? "text" : "password"}
                className={
                  "w-full py-1 px-2 bg-transparent transition border-b-2 border-green-300/80 focus:border-green-200 !outline-none " +
                  (isPasswordValid ? "" : "!border-red-500")
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordValid(e.target.value.length >= 8);
                }}
              />
              <button
                type="button"
                className="absolute right-[10px] top-[5px] text-green-400 text-[20px]"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                <FaEye />
              </button>
            </div>
          </label>
          <button className="bg-green-300 w-full py-3 text-white font-semibold rounded-[5px] mt-2">
            Buat
          </button>
        </form>
      </section>
    </main>
  );
}
