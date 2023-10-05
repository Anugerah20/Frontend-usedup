import React from "react";

const RegisterCard = () => {
  return (
    <>
      <div className="card card-register">
        <div className="mb-5">
          <p className="text-[30px] font-bold">REGISTER</p>
          <p className="text-[14px] text-btn-grey">
            Register untuk menjual, menambahkan ke favorit.
          </p>
        </div>
        <form>
          <div>
            <label htmlFor="Nama" className="text-[12px] font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Nama"
              required
            />
          </div>
          <div>
            <label htmlFor="Email" className="text-[12px] font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full h-[41px] border border-shadow mt-2"
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
              className="w-full h-[41px] border border-shadow my-2"
              id="Password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ConfirmPassword"
              className="text-[12px] font-semibold"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow my-2"
              id="ConfirmPassword"
              required
            />
          </div>
          <button className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            LOGIN
          </button>
        </form>
        <div className="text-center">
          <span className="font-semibold text-black">
            Sudah memiliki akun?{" "}
            <a href="#" className="font-semibold text-blue-link underline">
              Login disini
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterCard;
