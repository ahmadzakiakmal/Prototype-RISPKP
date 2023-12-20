import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Login = (e: any) => {
    e.preventDefault();
    alert("Login");
  };

  return (
    <main className="flex min-h-screen bg-white">
      <section className="w-1/2 min-h-screen flex-shrink-0 bg-neutral-100 grid place-items-center">
        <form
          className="flex flex-col justify-center items-center max-w-[410px] min-w-[300px] h-full gap-7 w-1/2"
          onSubmit={(e) => Login(e)}
        >
          <h1 className="text-[24px] font-semibold">Login RISPKP</h1>

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
                setIsUsernameValid(e.target.value.length > 0);
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
                  setIsPasswordValid(e.target.value.length > 0);
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

          <button
            type="submit"
            className="bg-green-300 w-full py-3 text-white font-semibold rounded-[5px] mt-2"
          >
            Login
          </button>
        </form>
      </section>

      <section className="w-1/2 relative flex flex-col justify-center items-center">
        <div className="w-full h-full absolute top-0 bg-gradient-to-tr from-green-300/60 to-navy/60 backdrop-blur-[2px]" />
        <div className="w-full h-full bg-[url(/Landing.jpg)] bg-cover" />
        <div className="absolute flex flex-col justify-center items-center gap-10">
          <div className="flex gap-5">
            <div className="bg-white w-[100px] aspect-square rounded-full" />
            <div className="bg-white w-[100px] aspect-square rounded-full" />
            <div className="bg-white w-[100px] aspect-square rounded-full" />
          </div>
          <h1 className="max-w-[80%] text-center font-bold text-white text-[28px]">
            RENCANA INDUK SISTEM PROTEKSI KEBAKARAN DAN PENYELAMATAN (RISPKP)
            <br />
            KOTA YOGYAKARTA
          </h1>
        </div>
      </section>
    </main>
  );
}
