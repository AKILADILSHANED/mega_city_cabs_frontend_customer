"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignin = () => {
    router.push("/CustomerLogin");
  };

  const handleRegister = () => {
    router.push("/CustomerRegister");
  };

  return (
    <div>
      <div className="bg-orange-500 hover:bg-orange-600 h-[50px] flex flex-row items-center justify-center shadow-md rounded-lg">
        <div className="text-white text-3xl font-serif">
          Welcome to Mega City Cab Services
        </div>
        <label
          onClick={handleSignin}
          className=" ml-2 border text-white w-[100px] h-[30px] rounded-md flex items-center justify-center hover:bg-orange-200 hover:text-black hover:border-none">
          Sign in
        </label>

        <label
          onClick={handleRegister}
          className=" ml-2 border text-white w-[100px] h-[30px] rounded-md flex items-center justify-center hover:bg-orange-200 hover:text-black hover:border-none">
          Register
        </label>
      </div>

      <div className="flex flex-col items-center justify-center">
        <section className="border border-slate-200 rounded-lg h-[250px] w-[1340px] mt-5"></section>
        <section className="border border-slate-200 rounded-lg h-[250px] w-[1340px] mt-5"></section>
        <section className="border border-slate-200 rounded-lg h-[250px] w-[1340px] mt-5"></section>
      </div>

    </div>
  );
}
