import React from "react";

const LoginCard = () => {
  return (
    <>
      <div className="card card-login">
        <div className="mb-5">
          <p className="text-[30px] font-bold">LOGIN</p>
          <p className="text-[14px] text-[#A4A4A4]">
            Ingin mencari sesuatu? banyak barang bagus loh!
          </p>
        </div>
        <form>
          <div>
            <label htmlFor="Email" className="text-[12px] font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full h-[41px] border border-[#ECECEC] mt-2"
              id="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="Password" className="text-[12px] font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-[#ECECEC] my-2"
              id="Password"
              required
            />
          </div>
          <div className="text-end">
            <a href="#" className="font-semibold text-[#00659E] underline">
              Lupa Password?
            </a>
          </div>
          <button className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            LOGIN
          </button>
        </form>
        <div className="text-center">
          <span className="font-semibold text-black">
            Belum punya akun?{" "}
            <a href="#" className="font-semibold text-[#00659E] underline">
              Register disini
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
